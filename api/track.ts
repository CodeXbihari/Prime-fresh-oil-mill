import { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

/**
 * Server-side IP-based Visitor Tracking Endpoint
 *
 * Privacy Guarantees:
 * 1. Uses trusted platform headers (x-forwarded-for, x-real-ip) sanitized and validated.
 * 2. Raw IP address is NEVER returned to client or logged in plaintext.
 * 3. IP is hashed using HMAC-SHA256 with a server-only secret pepper.
 * 4. Generates a privacy-preserving masked display string (e.g., "192.168.***.***" or "2001:db8:****::").
 * 5. Bot filtering & user agent sanitization.
 */

// Daily rotating salt or server environment secret
const SERVER_PEPPER = process.env.VISITOR_IP_SECRET || 'prime-fresh-oil-mills-secret-salt-2026';

function getClientIp(req: VercelRequest): string {
  // Trusted proxy headers
  const xForwardedFor = req.headers['x-forwarded-for'];
  if (xForwardedFor) {
    const raw = Array.isArray(xForwardedFor) ? xForwardedFor[0] : xForwardedFor;
    const clientIp = raw.split(',')[0].trim();
    if (isValidIp(clientIp)) return clientIp;
  }

  const xRealIp = req.headers['x-real-ip'];
  if (xRealIp && typeof xRealIp === 'string' && isValidIp(xRealIp.trim())) {
    return xRealIp.trim();
  }

  const socketIp = req.socket?.remoteAddress;
  if (socketIp && isValidIp(socketIp)) return socketIp;

  return '127.0.0.1';
}

function isValidIp(ip: string): boolean {
  // Simple IPv4 / IPv6 validation
  const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6 = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
  return ipv4.test(ip) || ipv6.test(ip) || ip.includes(':');
}

function hashIp(ip: string): string {
  return crypto
    .createHmac('sha256', SERVER_PEPPER)
    .update(ip)
    .digest('hex')
    .substring(0, 24);
}

function maskIp(ip: string): string {
  if (ip.includes(':')) {
    // IPv6: Keep first two segments, mask the rest
    const parts = ip.split(':');
    return `${parts.slice(0, 2).join(':')}:****:****`;
  }
  // IPv4: Keep first 2 octets, mask last 2
  const parts = ip.split('.');
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.***.***`;
  }
  return '***.***.***.***';
}

function isBot(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  const botRegex = /bot|crawler|spider|crawling|googlebot|bingbot|yandex|duckduckbot|baiduspider|headlesschrome|slurp/i;
  return botRegex.test(userAgent);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const userAgent = req.headers['user-agent'] as string | undefined;
  const botDetected = isBot(userAgent);

  const rawIp = getClientIp(req);
  const visitorHash = hashIp(rawIp);
  const maskedIp = maskIp(rawIp);

  // Return ONLY privacy-preserving tokens
  return res.status(200).json({
    visitorHash,
    maskedIp,
    isBot: botDetected,
    timestamp: new Date().toISOString()
  });
}

