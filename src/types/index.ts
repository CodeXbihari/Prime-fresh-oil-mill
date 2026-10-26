export type OrderStatus =
  | 'Requested'
  | 'Quotation Sent'
  | 'Confirmed'
  | 'Processing'
  | 'Dispatched'
  | 'Delivered'
  | 'Cancelled';

export type OilGrade =
  | 'Kachi Ghani (Cold Pressed)'
  | 'Expeller Pressed Pure'
  | 'Refined Mustard Oil'
  | 'Mustard Cake (By-Product Khali)'
  | 'Raw Agro Commodity';

export type PackagingType =
  | '50 Kg Jute Gunny Bag'
  | '50 Kg HDPE Laminated Bag'
  | '40 Kg Jute / HDPE Bag'
  | '25 Kg PP Woven Bag'
  | '15 Litre Food-Grade Tin'
  | '15 Kg Commercial Tin'
  | '5 Litre Pet Jar with Handle'
  | '1 Litre Pet Bottle (Box of 16)'
  | '500 ml Pet Bottle (Box of 30)'
  | '200 Litre Industrial Steel Drum'
  | 'Bulk Road Tanker (20-30 MT)';

export interface ProductPriceTier {
  minQty: number;
  maxQty?: number;
  pricePerUnit: number; // in INR
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  tagline: string;
  grade: OilGrade;
  packaging: PackagingType;
  volumeOrWeight: string;
  indicativePrice: number; // Wholesale Base Price in INR (ex-mill, excl. GST)
  gstRate: number; // Standard 5% for edible mustard oil in India
  moq: number; // Minimum Order Quantity in units/cases
  unitLabel: string; // "Tins", "Cartons", "Drums", "Metric Tonnes"
  stockStatus: 'In Stock' | 'Low Stock' | 'Milling Lead Time (3 Days)';
  availableStock: number;
  image: string;
  description: string;
  specs: {
    pungencyIndex: string; // e.g. "High Pungency (Allyl Isothiocyanate > 0.30%)"
    acidValue: string; // e.g. "< 1.2 mg KOH/g"
    moistureContent: string; // e.g. "< 0.20%"
    refractiveIndex: string; // e.g. "1.4646 - 1.4660 at 40°C"
    colorValue: string; // e.g. "Natural Deep Golden Amber"
    shelfLife: string; // e.g. "12 Months from Packaging"
    masterPackaging: string; // e.g. "Heavy Duty Corrugated Box (16 x 1L)"
  };
  priceTiers: ProductPriceTier[];
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuotationItem {
  productId: string;
  productName: string;
  packaging: string;
  quantity: number;
  unitLabel: string;
  targetPricePerUnit?: number;
  quotedPricePerUnit?: number;
  gstAmount?: number;
  totalAmount?: number;
}

export interface QuotationOrOrder {
  id: string;
  quoteNumber: string; // e.g., PFM-QT-2026-1042
  orderNumber?: string; // e.g., PFM-ORD-2026-0819
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  
  // Distributor / Customer Info
  distributorId: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  gstin?: string;
  
  // Logistics & Destination
  deliveryType: 'Ex-Mill (Pickup from Mill)' | 'Door Delivery (Transporter)';
  destinationCity: string;
  destinationState: string;
  pincode: string;
  shippingAddress: string;
  transportPreference?: string;
  
  // Commercials
  items: QuotationItem[];
  subtotal: number;
  freightCharges: number;
  gstAmount: number;
  totalAmount: number;
  validUntil?: string; // Mandi rate volatility disclaimer, quote valid for 48-72h
  
  // Dispatch / Fulfillment tracking
  dispatchDetails?: {
    transporterName: string;
    lrNumber: string; // Lorry Receipt Number
    vehicleNumber: string;
    dispatchDate: string;
    estimatedArrival: string;
    remarks: string;
  };
  
  paymentTerms: string; // e.g., "100% Advance RTGS", "20% Advance, Balance against LR copy"
  clientNotes?: string;
  millNotes?: string;
}

export interface DistributorApplication {
  id: string;
  applicationDate: string;
  companyName: string;
  tradeName?: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  businessType: 'Wholesaler' | 'Super Stockist' | 'C&F Agent' | 'Modern Trade / Supermarket' | 'Food Processing Industry';
  yearsInBusiness: string;
  annualTurnover: string;
  operatingStates: string[];
  godownCapacity: string;
  gstin: string;
  panNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  status: 'Pending' | 'Approved' | 'Review Required' | 'Rejected';
  assignedTier?: 'Tier 1 Prime Partner' | 'Tier 2 Regional Stockist' | 'Authorized Wholesaler';
  creditLimit?: number;
  adminNotes?: string;
}

export interface UserSession {
  isLoggedIn: boolean;
  role: 'distributor' | 'admin' | 'guest';
  distributorInfo?: Partial<DistributorApplication>;
  adminName?: string;
}

