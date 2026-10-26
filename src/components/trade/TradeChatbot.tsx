import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ShoppingBag,
  CheckCircle2,
  RotateCcw,
  Minimize2,
  Maximize2,
  ChevronRight,
  Flame
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestedActions?: {
    label: string;
    actionType: 'navigate' | 'query' | 'add_to_cart';
    payload: string;
  }[];
  matchedProducts?: Product[];
}

const INITIAL_GREETING: ChatMessage = {
  id: 'msg-welcome',
  sender: 'bot',
  text: "Namaste! 🙏 Welcome to **Prime Fresh Oil Mills**.\n\nI am **SarsonSaathi**, your 24/7 AI Wholesale & Logistics Assistant. Whether you are a new distributor, mandi stockist, or food processor, I can help you with:\n\n• Placing bulk orders & understanding MOQs\n• Requesting official proforma quotations\n• Checking live wholesale commodity prices\n• Distributor onboarding & GSTIN registration\n• All-India freight & logistics details\n\nHow can I help your business today?",
  timestamp: 'Just now',
  suggestedActions: [
    { label: '📦 How to place an order?', actionType: 'query', payload: 'How do I place a bulk order?' },
    { label: '💰 Wholesale Prices & MOQs', actionType: 'query', payload: 'What are your wholesale prices and MOQs?' },
    { label: '📋 Request a Quotation', actionType: 'query', payload: 'How does the quotation process work?' },
    { label: '🏢 Become a Distributor', actionType: 'query', payload: 'How do I register as a distributor?' },
    { label: '🚚 Freight & Delivery terms', actionType: 'query', payload: 'What are your delivery and freight terms?' }
  ]
};

export const TradeChatbot: React.FC = () => {
  const { products, cart, addToCart, cartCount, cartTotalEstimate, user } = useApp();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasUnreadNotice, setHasUnreadNotice] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = sessionStorage.getItem('pfm_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [INITIAL_GREETING];
      }
    }
    return [INITIAL_GREETING];
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    sessionStorage.setItem('pfm_chat_history', JSON.stringify(messages));
    if (isOpen && !isMinimized) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      setIsOpen(true);
      setIsMinimized(false);
      setHasUnreadNotice(false);
      const customEvent = e as CustomEvent<{ query?: string }>;
      if (customEvent.detail?.query) {
        handleSendMessage(customEvent.detail.query);
      }
    };
    window.addEventListener('open-trade-chatbot', handleOpenEvent);
    return () => window.removeEventListener('open-trade-chatbot', handleOpenEvent);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setHasUnreadNotice(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleResetChat = () => {
    setMessages([INITIAL_GREETING]);
    sessionStorage.removeItem('pfm_chat_history');
  };

  const handleAddToCartFromBot = (product: Product, quantity?: number) => {
    const qty = quantity || product.moq;
    addToCart(product, qty);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 3000);

    // Bot confirmation message
    const botReply: ChatMessage = {
      id: `msg-cart-added-${Date.now()}`,
      sender: 'bot',
      text: `✅ Added **${qty} ${product.unitLabel}** of **${product.name}** to your Bulk Cart!\n\nYour cart now has **${cartCount + 1} item(s)** worth approximately **₹${(cartTotalEstimate + (product.indicativePrice * qty * (1 + product.gstRate))).toLocaleString('en-IN')}**.\n\nWould you like to review your cart or request an official proforma quotation?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        { label: '🛒 View Bulk Cart', actionType: 'navigate', payload: '/cart' },
        { label: '📋 Request Official Quote', actionType: 'navigate', payload: '/quotation-request' },
        { label: '📦 Browse More Products', actionType: 'navigate', payload: '/products' }
      ]
    };
    setMessages(prev => [...prev, botReply]);
  };

  const generateBotResponse = (userText: string): ChatMessage => {
    const lower = userText.toLowerCase().trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. ORDERING / HOW TO ORDER / NEW CUSTOMER GUIDE
    if (
      lower.includes('how to order') ||
      lower.includes('place order') ||
      lower.includes('order process') ||
      lower.includes('order kaise') ||
      lower.includes('new here') ||
      lower.includes('how do i') ||
      lower.includes('new customer') ||
      lower.includes('buying process') ||
      lower.includes('steps to order')
    ) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `Here is the simple **5-step process to place a wholesale order** with Prime Fresh Oil Mills:\n\n` +
          `1️⃣ **Explore Catalog & MOQs**: Browse our wholesale agro commodities (Yellow/Black Mustard Seeds, Mustard Cake Khali, Sesame, Peanuts) and note each product's Minimum Order Quantity (MOQ).\n\n` +
          `2️⃣ **Add to Bulk Cart**: Select your desired packaging format and enter order quantities that meet or exceed the MOQ.\n\n` +
          `3️⃣ **Submit Quotation Request**: Provide your delivery address, destination mandi/city, pincode, and preferred logistics method (Ex-Mill pickup or Door Delivery).\n\n` +
          `4️⃣ **Receive Official Proforma Quote**: Our commercial works desk issues a formal signed quotation within 2 to 4 business hours, including exact GST and competitive freight.\n\n` +
          `5️⃣ **Confirm & Track Dispatch**: Once you accept the quotation, your batch is scheduled at our expeller mills and dispatched with live Lorry Receipt (LR) tracking.`,
        timestamp,
        suggestedActions: [
          { label: '📦 Explore Catalog', actionType: 'navigate', payload: '/products' },
          { label: '📋 Request Quotation Now', actionType: 'navigate', payload: '/quotation-request' },
          { label: '🏢 Register as Distributor', actionType: 'navigate', payload: '/portal/register' }
        ]
      };
    }

    // 2. PRODUCT SEARCH & MATCHING
    const matchingProducts = products.filter(p => {
      const pName = p.name.toLowerCase();
      const pGrade = p.grade.toLowerCase();
      const pDesc = p.description.toLowerCase();
      return (
        (lower.includes('yellow') && pName.includes('yellow')) ||
        (lower.includes('black') && (pName.includes('black') || pName.includes('kali'))) ||
        (lower.includes('sarson') && (pName.includes('mustard') || pDesc.includes('sarson'))) ||
        (lower.includes('mustard seed') && pName.includes('mustard seeds')) ||
        (lower.includes('cake') && (pName.includes('cake') || pGrade.includes('cake'))) ||
        (lower.includes('khali') && (pName.includes('cake') || pDesc.includes('khali'))) ||
        (lower.includes('groundnut') && pName.includes('groundnut')) ||
        (lower.includes('peanut') && (pName.includes('groundnut') || pDesc.includes('peanut'))) ||
        (lower.includes('mungfali') && (pName.includes('groundnut') || pDesc.includes('mungfali'))) ||
        (lower.includes('sesame') && (pName.includes('sesame') || pGrade.includes('sesame'))) ||
        (lower.includes('til') && (pName.includes('sesame') || pDesc.includes('til'))) ||
        (lower.includes('kalonji') && (pName.includes('kalonji') || pDesc.includes('kalonji'))) ||
        (lower.includes('nigella') && (pName.includes('kalonji') || pDesc.includes('nigella')))
      );
    });

    if (matchingProducts.length > 0) {
      const topMatch = matchingProducts[0];
      return {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `I found **${matchingProducts.length} matching product(s)** for your query!\n\n` +
          `Here is our **${topMatch.name}**:\n` +
          `• **Packaging**: ${topMatch.packaging}\n` +
          `• **Ex-Mill Wholesale Rate**: ₹${topMatch.indicativePrice.toLocaleString('en-IN')} / ${topMatch.unitLabel.replace(/s$/, '')} (Excl. GST)\n` +
          `• **Minimum Order Quantity (MOQ)**: ${topMatch.moq} ${topMatch.unitLabel}\n` +
          `• **Stock Status**: ${topMatch.stockStatus} (${topMatch.availableStock} ${topMatch.unitLabel} ready in godown)\n\n` +
          `You can add this directly to your bulk cart below or view full technical specifications:`,
        timestamp,
        matchedProducts: matchingProducts.slice(0, 2),
        suggestedActions: [
          { label: `🛒 Add MOQ (${topMatch.moq} units) to Cart`, actionType: 'add_to_cart', payload: topMatch.id },
          { label: '📋 Request Custom Quote', actionType: 'navigate', payload: `/quotation-request?productId=${topMatch.id}&qty=${topMatch.moq}` },
          { label: '🔍 View All Products', actionType: 'navigate', payload: '/products' }
        ]
      };
    }

    // 3. WHOLESALE PRICING, RATES, MOQS
    if (
      lower.includes('price') ||
      lower.includes('rate') ||
      lower.includes('cost') ||
      lower.includes('moq') ||
      lower.includes('minimum order') ||
      lower.includes('discount') ||
      lower.includes('rate list') ||
      lower.includes('bhav')
    ) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `Here is our current **Wholesale Indicative Base Rate & MOQ Summary** (Ex-Mill Rajasthan):\n\n` +
          `• **Prime Fresh Yellow Mustard Oil (1L x 16 Bottles)**: ₹2,320/carton (₹145/L) | MOQ: 50 Cartons\n` +
          `• **Prime Fresh Yellow Mustard Oil (15L Tin)**: ₹2,180/tin | MOQ: 40 Tins\n` +
          `• **Prime Yellow Mustard Seeds (50 Kg Bag)**: ₹3,450/bag | MOQ: 30 Bags\n` +
          `• **Prime Black Mustard Seeds / Kali Sarson (50 Kg Bag)**: ₹3,200/bag | MOQ: 30 Bags\n` +
          `• **Mustard Oil Cake Flakes / Khali (50 Kg Bag)**: ₹1,450/bag | MOQ: 40 Bags\n` +
          `• **Mustard Oil Cake Chunks / Dalli (50 Kg Bag)**: ₹1,420/bag | MOQ: 40 Bags\n` +
          `• **Raw Shelled Groundnuts / Mungfali (40 Kg Bag)**: ₹3,600/bag | MOQ: 25 Bags\n` +
          `• **Sortex Kalonji Seeds (25 Kg Bag)**: ₹4,250/bag | MOQ: 20 Bags\n` +
          `• **Natural White Sesame / Til (25 Kg Bag)**: ₹4,800/bag | MOQ: 20 Bags\n\n` +
          `💡 *Volume tier discounts (₹50 - ₹120/bag reduction) are automatically applied for full truckload (FTL) orders of 100+ bags.*`,
        timestamp,
        suggestedActions: [
          { label: '📦 Browse Full Catalog', actionType: 'navigate', payload: '/products' },
          { label: '📋 Calculate Quotation', actionType: 'navigate', payload: '/quotation-request' }
        ]
      };
    }

    // 4. QUOTATION SYSTEM
    if (
      lower.includes('quote') ||
      lower.includes('quotation') ||
      lower.includes('proforma') ||
      lower.includes('rfq') ||
      lower.includes('estimate')
    ) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `**How the Prime Fresh Quotation System Works:**\n\n` +
          `Unlike retail shopping, wholesale commodities depend on daily mandi seed indices, transit insurance, and distance-based freight.\n\n` +
          `1. Submit your desired items and delivery city via our **Quotation Request Form**.\n` +
          `2. Our mill managers immediately calculate exact freight via trusted transporters (VRL, TCI, Safechem) and apply your commercial tier discounts.\n` +
          `3. You receive an official **Proforma Quotation** under your account within 2-4 hours.\n` +
          `4. You can review, accept, or modify the quotation directly from the portal!`,
        timestamp,
        suggestedActions: [
          { label: '📋 Open Quotation Request Form', actionType: 'navigate', payload: '/quotation-request' },
          { label: '📑 View My Quotations', actionType: 'navigate', payload: '/portal/my-orders' }
        ]
      };
    }

    // 5. DISTRIBUTOR REGISTRATION & KYC
    if (
      lower.includes('distributor') ||
      lower.includes('dealer') ||
      lower.includes('dealership') ||
      lower.includes('agency') ||
      lower.includes('register') ||
      lower.includes('signup') ||
      lower.includes('sign up') ||
      lower.includes('kyc') ||
      lower.includes('gst')
    ) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `**Become an Authorized Prime Fresh Wholesale Distributor!**\n\n` +
          `Registered distributors receive premium trade benefits:\n` +
          `✅ **Tier-1 / Tier-2 Factory Gate Pricing**\n` +
          `✅ **Commercial Credit Limits (up to ₹15 - ₹25 Lakhs)** for eligible verified buyers\n` +
          `✅ **Priority Tanker & Dispatch Scheduling**\n` +
          `✅ **Dedicated Regional Account Manager**\n\n` +
          `📝 **Requirements**: Company Name, Contact Person, Delivery Godown Address, Phone Number, and GSTIN (optional at registration, verified for credit).`,
        timestamp,
        suggestedActions: [
          { label: '🏢 Register as Distributor Now', actionType: 'navigate', payload: '/portal/register' },
          { label: '🔐 Distributor Login', actionType: 'navigate', payload: '/portal/login' }
        ]
      };
    }

    // 6. LOGISTICS, FREIGHT, DISPATCH & TANKERS
    if (
      lower.includes('delivery') ||
      lower.includes('dispatch') ||
      lower.includes('transport') ||
      lower.includes('freight') ||
      lower.includes('tanker') ||
      lower.includes('truck') ||
      lower.includes('lorry') ||
      lower.includes('lr') ||
      lower.includes('tracking') ||
      lower.includes('location') ||
      lower.includes('rajasthan') ||
      lower.includes('where do you')
    ) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `**Logistics & Delivery Capabilities:**\n\n` +
          `• **Mill Origin**: Primary crushing plants located in Alwar & Jaipur, Rajasthan.\n` +
          `• **Delivery Modes**:\n` +
          `  - **Ex-Mill Pickup**: Your transporter picks up directly from our mill weighbridge.\n` +
          `  - **Door Delivery (FOR)**: We coordinate with national logistics partners (VRL Logistics, ARC, TCI Freight) directly to your godown.\n` +
          `• **Bulk Tankers**: Available in 20 MT to 30 MT SS/MS tankers for edible oil bulk processors.\n` +
          `• **Documentation**: Every shipment includes an electronic E-Way Bill, computerized weighbridge slip, Agmark Certificate of Analysis (CoA), and Lorry Receipt (LR) bilty.`,
        timestamp,
        suggestedActions: [
          { label: '📋 Request Freight Estimate', actionType: 'navigate', payload: '/quotation-request' },
          { label: '📦 Check My Active Shipments', actionType: 'navigate', payload: '/portal/my-orders' }
        ]
      };
    }

    // 7. QUALITY, AGMARK, TESTING & CERTIFICATIONS
    if (
      lower.includes('quality') ||
      lower.includes('agmark') ||
      lower.includes('fssai') ||
      lower.includes('purity') ||
      lower.includes('lab') ||
      lower.includes('test') ||
      lower.includes('pungency') ||
      lower.includes('acid value')
    ) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `**Prime Fresh Quality Assurance & Standards:**\n\n` +
          `• **Agmark Grade-1 Standard**: Certified pure edible oil & seed grains.\n` +
          `• **FSSAI Compliant Facility**: Strict food hygiene, state-of-the-art de-stoners, and color sortex machines.\n` +
          `• **Pungency Index**: High natural Allyl Isothiocyanate (> 0.35%) delivering authentic pungent bite (*teekhapan*).\n` +
          `• **Zero Adulteration**: Strictly 100% free from Argemone oil, mineral oils, or synthetic pungency agents.\n` +
          `• **Moisture & Acidity**: Free Fatty Acids (FFA) guaranteed < 0.8% - 1.2% with optimal storage dryness.`,
        timestamp,
        suggestedActions: [
          { label: '📦 View Product Specifications', actionType: 'navigate', payload: '/products' },
          { label: '📋 Request Sample Batch Quote', actionType: 'navigate', payload: '/quotation-request' }
        ]
      };
    }

    // 8. CART & CURRENT ORDER CHECK
    if (
      lower.includes('cart') ||
      lower.includes('my order') ||
      lower.includes('status') ||
      lower.includes('checkout')
    ) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: cart.length > 0
          ? `You currently have **${cartCount} SKU(s)** in your Bulk Order Cart!\n\n` +
            `• **Estimated Ex-Mill Subtotal**: ₹${cart.reduce((s, i) => s + (i.product.indicativePrice * i.quantity), 0).toLocaleString('en-IN')}\n` +
            `• **Total Est. Value (inc. GST)**: ₹${cartTotalEstimate.toLocaleString('en-IN')}\n\n` +
            `You can review your quantities or convert this cart into an official Proforma Quotation request right now:`
          : `Your Bulk Order Cart is currently empty. Would you like me to recommend our top-selling commodities (Yellow Mustard Seeds, Kali Sarson, Mustard Cake Flakes)?`,
        timestamp,
        suggestedActions: cart.length > 0
          ? [
              { label: '🛒 Open Bulk Cart', actionType: 'navigate', payload: '/cart' },
              { label: '📋 Request Quotation from Cart', actionType: 'navigate', payload: '/quotation-request' }
            ]
          : [
              { label: '📦 Browse Wholesale Products', actionType: 'navigate', payload: '/products' },
              { label: '💰 Check Price List', actionType: 'query', payload: 'What are your wholesale prices?' }
            ]
      };
    }

    // 9. HINDI / HINGLISH GREETINGS & CASUAL
    if (
      lower.includes('namaste') ||
      lower.includes('hello') ||
      lower.includes('hi') ||
      lower.includes('hey') ||
      lower.includes('kya haal') ||
      lower.includes('ram ram') ||
      lower.includes('pranam')
    ) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `Namaste! 🙏 Welcome to Prime Fresh Oil Mills.\n\n` +
          `Aapka Prime Fresh Oil Mills me swagat hai. Main aapki wholesale order, mandi bhav (rates), aur delivery related sabhi jaankari me madad kar sakta hu.\n\n` +
          `Aap kya dekhna chahte hain?`,
        timestamp,
        suggestedActions: [
          { label: '📦 How to place order', actionType: 'query', payload: 'How do I place a bulk order?' },
          { label: '💰 Rates & MOQs', actionType: 'query', payload: 'What are your wholesale prices?' },
          { label: '📋 Quotation Request', actionType: 'navigate', payload: '/quotation-request' }
        ]
      };
    }

    // 10. CONTACT / SALES DESK
    if (
      lower.includes('contact') ||
      lower.includes('phone') ||
      lower.includes('call') ||
      lower.includes('email') ||
      lower.includes('number') ||
      lower.includes('support') ||
      lower.includes('sales desk')
    ) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `**Prime Fresh Oil Mills Commercial & Works Desk:**\n\n` +
          `📞 **Toll-Free Wholesale Inquiry**: 1800-266-9811\n` +
          `📱 **WhatsApp Mandi Desk**: +91 98290 44551\n` +
          `✉️ **Commercial Sales**: trade@primefreshoil.com\n` +
          `🏭 **Works & Expeller Plant**: RIICO Industrial Area, Phase-II, Matsya Industrial Area, Alwar, Rajasthan - 301030\n\n` +
          `Operating Hours: Monday – Saturday (8:00 AM – 7:30 PM IST).`,
        timestamp,
        suggestedActions: [
          { label: '📋 Submit Written Quotation', actionType: 'navigate', payload: '/quotation-request' },
          { label: '🏢 Distributor Onboarding', actionType: 'navigate', payload: '/portal/register' }
        ]
      };
    }

    // 11. GENERAL SMART FALLBACK
    return {
      id: `msg-${Date.now()}`,
      sender: 'bot',
      text: `Thank you for your inquiry!\n\n` +
        `At **Prime Fresh Oil Mills**, we specialize in primary cold-pressing and bulk wholesale distribution of Rajasthan mustard seeds, pure mustard oil, cattle feed cake (khali), sesame seeds, and peanuts.\n\n` +
        `Here are the most helpful shortcuts for our platform:`,
      timestamp,
      suggestedActions: [
        { label: '📦 Browse Wholesale Catalog', actionType: 'navigate', payload: '/products' },
        { label: '📋 Request Official Quotation', actionType: 'navigate', payload: '/quotation-request' },
        { label: '💰 Check Live Rates & MOQs', actionType: 'query', payload: 'What are your wholesale prices?' },
        { label: '🏢 Register as Distributor', actionType: 'navigate', payload: '/portal/register' },
        { label: '📞 Contact Mill Sales Desk', actionType: 'query', payload: 'What is your contact phone number?' }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const response = generateBotResponse(text);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (action: { label: string; actionType: 'navigate' | 'query' | 'add_to_cart'; payload: string }) => {
    if (action.actionType === 'navigate') {
      navigate(action.payload);
      // Optional: on small mobile screens, minimize chat on navigation
      if (window.innerWidth < 640) {
        setIsMinimized(true);
      }
    } else if (action.actionType === 'query') {
      handleSendMessage(action.payload);
    } else if (action.actionType === 'add_to_cart') {
      const prod = products.find(p => p.id === action.payload);
      if (prod) {
        handleAddToCartFromBot(prod, prod.moq);
      }
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
          {/* Welcome Tooltip Bubble for New Customers */}
          {hasUnreadNotice && (
            <div className="mb-2 max-w-xs bg-forest-950 text-cream-50 p-3 sm:p-3.5 rounded-2xl shadow-2xl border border-mustard-500/50 flex items-start gap-2.5 animate-bounce [animation-duration:3s]">
              <Sparkles className="w-5 h-5 text-mustard-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-mustard-400">New to Prime Fresh?</p>
                <p className="text-slate-300 text-[11px] mt-0.5 leading-snug">
                  Chat with <strong>SarsonSaathi AI</strong> to check live rates, MOQs, or make your first bulk order!
                </p>
              </div>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  setHasUnreadNotice(false);
                }}
                className="text-slate-400 hover:text-white p-0.5"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleOpenChat}
            className="group relative flex items-center gap-3 px-4 sm:px-5 py-3.5 rounded-full bg-gradient-to-r from-forest-900 via-forest-950 to-forest-900 text-cream-50 border-2 border-mustard-400/80 shadow-2xl hover:shadow-mustard-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Open AI Wholesale Assistant"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-mustard-500 text-forest-950 flex items-center justify-center font-black shadow-inner">
                <Bot className="w-5 h-5 text-forest-950" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-forest-950 rounded-full animate-pulse" />
            </div>

            <div className="text-left hidden sm:block">
              <div className="text-xs font-black tracking-wide text-mustard-300 uppercase flex items-center gap-1.5">
                <span>SarsonSaathi AI</span>
                <span className="text-[10px] bg-mustard-500/20 text-mustard-400 border border-mustard-400/40 px-1.5 py-0.2 rounded-sm">24/7 Mill Bot</span>
              </div>
              <div className="text-[11px] text-slate-300">Order & Rate Assistant</div>
            </div>

            {hasUnreadNotice && (
              <span className="flex h-2.5 w-2.5 sm:hidden relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mustard-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-mustard-500"></span>
              </span>
            )}
          </button>
        </div>
      )}

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ease-out shadow-2xl flex flex-col overflow-hidden border border-cream-300/80 bg-white
            ${isMinimized
              ? 'bottom-5 right-5 sm:bottom-6 sm:right-6 w-72 sm:w-80 h-14 rounded-2xl'
              : 'bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[420px] max-w-full h-[90vh] sm:h-[620px] sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl'
            }`}
        >
          {/* Chat Window Header */}
          <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 text-cream-50 px-4 py-3.5 border-b border-mustard-500/30 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full bg-mustard-500 text-forest-950 flex items-center justify-center font-bold shadow-md">
                  <Bot className="w-5 h-5 text-forest-950" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-forest-950 rounded-full" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-cream-50 truncate">SarsonSaathi AI</h3>
                  <span className="text-[10px] bg-mustard-500/20 text-mustard-300 border border-mustard-500/40 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                    Mill Desk
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 truncate">
                  Prime Fresh Wholesale & Logistics Guide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-300">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 hover:text-white hover:bg-forest-800 rounded-lg transition"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:text-white hover:bg-forest-800 rounded-lg transition"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white hover:bg-forest-800 rounded-lg transition"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* If minimized, hide body */}
          {!isMinimized && (
            <>
              {/* Context Summary Strip */}
              <div className="bg-mustard-50 px-3.5 py-2 border-b border-mustard-100 flex items-center justify-between text-xs text-forest-900 shrink-0">
                <div className="flex items-center gap-1.5 truncate">
                  <Flame className="w-3.5 h-3.5 text-mustard-600 shrink-0" />
                  <span className="truncate">
                    {user.isLoggedIn
                      ? `Logged in: ${user.distributorInfo?.companyName || user.distributorInfo?.contactPerson || 'Distributor'}`
                      : 'Wholesale Trade Desk • All-India Supply'}
                  </span>
                </div>
                <Link
                  to="/cart"
                  className="flex items-center gap-1 font-bold text-mustard-800 hover:text-mustard-950 shrink-0 ml-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Cart ({cartCount})</span>
                </Link>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`flex gap-2 max-w-[88%] sm:max-w-[85%] ${
                        msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                          msg.sender === 'user'
                            ? 'bg-forest-900 text-cream-100'
                            : 'bg-mustard-500 text-forest-950'
                        }`}
                      >
                        {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>

                      {/* Bubble */}
                      <div
                        className={`rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                          msg.sender === 'user'
                            ? 'bg-forest-900 text-cream-50 rounded-tr-none'
                            : 'bg-white text-slate-800 border border-cream-200 rounded-tl-none'
                        }`}
                      >
                        <div className="whitespace-pre-line break-words space-y-1">
                          {msg.text.split('\n\n').map((paragraph, idx) => {
                            // Support basic markdown bold rendering
                            const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                            return (
                              <p key={idx} className="leading-relaxed">
                                {parts.map((part, pIdx) => {
                                  if (part.startsWith('**') && part.endsWith('**')) {
                                    return (
                                      <strong key={pIdx} className="font-bold text-forest-950">
                                        {part.slice(2, -2)}
                                      </strong>
                                    );
                                  }
                                  return part;
                                })}
                              </p>
                            );
                          })}
                        </div>

                        <span
                          className={`text-[9px] block text-right mt-1.5 opacity-70 ${
                            msg.sender === 'user' ? 'text-cream-200' : 'text-slate-400'
                          }`}
                        >
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Matched Product Cards (if any) */}
                    {msg.matchedProducts && msg.matchedProducts.length > 0 && (
                      <div className="w-full pl-9 pr-2 mt-2 space-y-2">
                        {msg.matchedProducts.map(prod => (
                          <div
                            key={prod.id}
                            className="bg-white rounded-xl p-3 border border-cream-300 shadow-sm flex flex-col gap-2 hover:border-mustard-500 transition"
                          >
                            <div className="flex gap-2.5 items-center">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-12 h-12 object-cover rounded-lg border border-cream-200 shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <h4 className="font-bold text-xs text-forest-950 truncate">
                                  {prod.name}
                                </h4>
                                <div className="text-[11px] text-slate-500 truncate">
                                  {prod.packaging}
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="font-bold text-mustard-700 text-xs">
                                    ₹{prod.indicativePrice.toLocaleString('en-IN')}
                                  </span>
                                  <span className="text-[10px] text-slate-500">
                                    MOQ: <strong>{prod.moq} {prod.unitLabel}</strong>
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 pt-1 border-t border-cream-100">
                              <button
                                type="button"
                                onClick={() => handleAddToCartFromBot(prod, prod.moq)}
                                disabled={addedProductId === prod.id}
                                className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                                  addedProductId === prod.id
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-mustard-500 hover:bg-mustard-400 text-forest-950'
                                }`}
                              >
                                {addedProductId === prod.id ? (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Added!</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                    <span>Add MOQ ({prod.moq})</span>
                                  </>
                                )}
                              </button>

                              <Link
                                to={`/products/${prod.id}`}
                                className="py-1.5 px-2.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold"
                              >
                                Details
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Suggested Action Chips */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="w-full pl-9 pr-2 mt-2 flex flex-wrap gap-1.5">
                        {msg.suggestedActions.map((action, aIdx) => (
                          <button
                            key={aIdx}
                            type="button"
                            onClick={() => handleActionClick(action)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-cream-100 hover:bg-mustard-100 border border-cream-300 text-forest-950 hover:text-mustard-900 text-[11px] font-semibold transition active:scale-95 shadow-2xs"
                          >
                            <span>{action.label}</span>
                            <ChevronRight className="w-3 h-3 text-mustard-600" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
                    <div className="w-7 h-7 rounded-full bg-mustard-500 text-forest-950 flex items-center justify-center font-bold">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white px-3 py-2 rounded-2xl border border-cream-200 flex items-center gap-1 shadow-2xs">
                      <span className="w-1.5 h-1.5 bg-mustard-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-mustard-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-mustard-500 rounded-full animate-bounce"></span>
                      <span className="text-[11px] text-slate-500 ml-1">SarsonSaathi is typing...</span>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Quick Inquiry Categories Toolbar */}
              <div className="px-3 py-2 bg-cream-50 border-t border-cream-200 overflow-x-auto whitespace-nowrap flex gap-1.5 text-xs no-scrollbar shrink-0">
                <button
                  type="button"
                  onClick={() => handleSendMessage('How do I place a bulk order as a new customer?')}
                  className="px-2.5 py-1 rounded-lg bg-white border border-cream-300 hover:border-mustard-400 text-slate-700 text-[11px] font-medium transition shrink-0"
                >
                  📦 How to Order
                </button>
                <button
                  type="button"
                  onClick={() => handleSendMessage('What are your wholesale rates and MOQs?')}
                  className="px-2.5 py-1 rounded-lg bg-white border border-cream-300 hover:border-mustard-400 text-slate-700 text-[11px] font-medium transition shrink-0"
                >
                  💰 Rates & MOQ
                </button>
                <button
                  type="button"
                  onClick={() => handleSendMessage('How do I request an official proforma quotation?')}
                  className="px-2.5 py-1 rounded-lg bg-white border border-cream-300 hover:border-mustard-400 text-slate-700 text-[11px] font-medium transition shrink-0"
                >
                  📋 Request Quote
                </button>
                <button
                  type="button"
                  onClick={() => handleSendMessage('How do I register as an official distributor with GSTIN?')}
                  className="px-2.5 py-1 rounded-lg bg-white border border-cream-300 hover:border-mustard-400 text-slate-700 text-[11px] font-medium transition shrink-0"
                >
                  🏢 Distributor KYC
                </button>
                <button
                  type="button"
                  onClick={() => handleSendMessage('What are your delivery and freight terms?')}
                  className="px-2.5 py-1 rounded-lg bg-white border border-cream-300 hover:border-mustard-400 text-slate-700 text-[11px] font-medium transition shrink-0"
                >
                  🚚 Freight & Tankers
                </button>
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-white border-t border-cream-200 flex items-center gap-2 shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  placeholder="Ask about orders, MOQ, rates, or delivery..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-mustard-500 focus:bg-white transition"
                />

                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 disabled:opacity-40 disabled:hover:bg-forest-900 text-cream-100 transition shadow-sm shrink-0"
                  title="Send message"
                >
                  <Send className="w-4 h-4 text-mustard-400" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};
