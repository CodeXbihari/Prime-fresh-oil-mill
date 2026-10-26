import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  QuotationOrOrder,
  DistributorApplication,
  UserSession,
  OrderStatus
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_QUOTATIONS_AND_ORDERS,
  INITIAL_DISTRIBUTORS
} from '../data/mockData';

interface AppContextType {
  // Products
  products: Product[];
  updateProduct: (id: string, updates: Partial<Product>) => void;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (id: string) => void;

  // Bulk Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartGstEstimate: number;
  cartTotalEstimate: number;

  // Quotations & Orders
  quotations: QuotationOrOrder[];
  createQuotationFromCart: (details: {
    deliveryType: 'Ex-Mill (Pickup from Mill)' | 'Door Delivery (Transporter)';
    destinationCity: string;
    destinationState: string;
    pincode: string;
    shippingAddress: string;
    transportPreference?: string;
    paymentTerms: string;
    clientNotes?: string;
    contactPerson: string;
    companyName: string;
    phone: string;
    email: string;
    gstin?: string;
  }) => string;
  createDirectQuotation: (
    items: { product: Product; quantity: number }[],
    details: {
      deliveryType: 'Ex-Mill (Pickup from Mill)' | 'Door Delivery (Transporter)';
      destinationCity: string;
      destinationState: string;
      pincode: string;
      shippingAddress: string;
      transportPreference?: string;
      paymentTerms: string;
      clientNotes?: string;
      contactPerson: string;
      companyName: string;
      phone: string;
      email: string;
      gstin?: string;
    }
  ) => string;
  updateQuotationStatus: (
    id: string,
    status: OrderStatus,
    options?: {
      millNotes?: string;
      freightCharges?: number;
      updatedItemRates?: { productId: string; rate: number }[];
      dispatchDetails?: {
        transporterName: string;
        lrNumber: string;
        vehicleNumber: string;
        dispatchDate: string;
        estimatedArrival: string;
        remarks: string;
      };
    }
  ) => void;
  acceptQuotationByDistributor: (id: string) => void;

  // Distributors
  distributors: DistributorApplication[];
  submitDistributorApplication: (appData: Omit<DistributorApplication, 'id' | 'applicationDate' | 'status'>) => string;
  updateDistributorApplication: (
    id: string,
    status: DistributorApplication['status'],
    details?: { assignedTier?: DistributorApplication['assignedTier']; creditLimit?: number; adminNotes?: string }
  ) => void;

  // Session & Auth
  user: UserSession;
  loginAsDistributor: (distributorId?: string) => void;
  loginAsAdmin: () => void;
  logout: () => void;
  updateCurrentProfile: (updates: Partial<DistributorApplication>) => void;

  // Reset
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'pfm_products_v4',
  QUOTES: 'pfm_quotes_v2',
  DISTRIBUTORS: 'pfm_distributors_v2',
  CART: 'pfm_cart_v2',
  USER: 'pfm_user_v2'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        // Sync fresh images from INITIAL_PRODUCTS so static asset updates reflect immediately
        return parsed.map(p => {
          const fresh = INITIAL_PRODUCTS.find(ip => ip.id === p.id);
          return fresh ? { ...p, image: fresh.image } : p;
        });
      }
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // 2. Quotations and Orders state
  const [quotations, setQuotations] = useState<QuotationOrOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUOTES);
      return saved ? JSON.parse(saved) : INITIAL_QUOTATIONS_AND_ORDERS;
    } catch {
      return INITIAL_QUOTATIONS_AND_ORDERS;
    }
  });

  // 3. Distributors state
  const [distributors, setDistributors] = useState<DistributorApplication[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DISTRIBUTORS);
      return saved ? JSON.parse(saved) : INITIAL_DISTRIBUTORS;
    } catch {
      return INITIAL_DISTRIBUTORS;
    }
  });

  // 4. Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 5. User session state (Defaults to demo distributor logged in for convenience, or guest)
  const [user, setUser] = useState<UserSession>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default initial session: Shree Balaji Agro Traders logged in for easy review of distributor features
    return {
      isLoggedIn: true,
      role: 'distributor',
      distributorInfo: INITIAL_DISTRIBUTORS[0]
    };
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotations));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [quotations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DISTRIBUTORS, JSON.stringify(distributors));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [distributors]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [user]);

  // Product actions
  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const addProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Cart actions
  const addToCart = (product: Product, quantity: number) => {
    const qtyToAdd = Math.max(quantity, product.moq);
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      return [...prev, { product, quantity: qtyToAdd }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => {
    // Check tier pricing
    let unitPrice = item.product.indicativePrice;
    if (item.product.priceTiers && item.product.priceTiers.length > 0) {
      const tier = [...item.product.priceTiers]
        .sort((a, b) => b.minQty - a.minQty)
        .find(t => item.quantity >= t.minQty);
      if (tier) unitPrice = tier.pricePerUnit;
    }
    return sum + unitPrice * item.quantity;
  }, 0);

  const cartGstEstimate = cart.reduce((sum, item) => {
    let unitPrice = item.product.indicativePrice;
    if (item.product.priceTiers && item.product.priceTiers.length > 0) {
      const tier = [...item.product.priceTiers]
        .sort((a, b) => b.minQty - a.minQty)
        .find(t => item.quantity >= t.minQty);
      if (tier) unitPrice = tier.pricePerUnit;
    }
    const itemSubtotal = unitPrice * item.quantity;
    return sum + itemSubtotal * item.product.gstRate;
  }, 0);

  const cartTotalEstimate = cartSubtotal + cartGstEstimate;

  // Quotation actions
  const createQuotationFromCart = (details: {
    deliveryType: 'Ex-Mill (Pickup from Mill)' | 'Door Delivery (Transporter)';
    destinationCity: string;
    destinationState: string;
    pincode: string;
    shippingAddress: string;
    transportPreference?: string;
    paymentTerms: string;
    clientNotes?: string;
    contactPerson: string;
    companyName: string;
    phone: string;
    email: string;
    gstin?: string;
  }): string => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const quoteNumber = `PFM-QT-2026-${randomSuffix}`;
    const id = `quote-${Date.now()}`;

    const items = cart.map(item => {
      let unitPrice = item.product.indicativePrice;
      if (item.product.priceTiers && item.product.priceTiers.length > 0) {
        const tier = [...item.product.priceTiers]
          .sort((a, b) => b.minQty - a.minQty)
          .find(t => item.quantity >= t.minQty);
        if (tier) unitPrice = tier.pricePerUnit;
      }
      const itemSubtotal = unitPrice * item.quantity;
      const gst = itemSubtotal * item.product.gstRate;
      return {
        productId: item.product.id,
        productName: item.product.name,
        packaging: item.product.packaging,
        quantity: item.quantity,
        unitLabel: item.product.unitLabel,
        targetPricePerUnit: unitPrice,
        quotedPricePerUnit: unitPrice,
        gstAmount: gst,
        totalAmount: itemSubtotal + gst
      };
    });

    const subtotal = cartSubtotal;
    const gstAmount = cartGstEstimate;
    const freight = details.deliveryType === 'Door Delivery (Transporter)' ? 12500 : 0;
    const totalAmount = subtotal + gstAmount + freight;

    const newQuote: QuotationOrOrder = {
      id,
      quoteNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'Requested',
      distributorId: user.distributorInfo?.id || 'guest-distributor',
      companyName: details.companyName,
      contactPerson: details.contactPerson,
      phone: details.phone,
      email: details.email,
      gstin: details.gstin,
      deliveryType: details.deliveryType,
      destinationCity: details.destinationCity,
      destinationState: details.destinationState,
      pincode: details.pincode,
      shippingAddress: details.shippingAddress,
      transportPreference: details.transportPreference,
      items,
      subtotal,
      freightCharges: freight,
      gstAmount,
      totalAmount,
      paymentTerms: details.paymentTerms,
      clientNotes: details.clientNotes
    };

    setQuotations(prev => [newQuote, ...prev]);
    clearCart();
    return quoteNumber;
  };

  const createDirectQuotation = (
    itemsList: { product: Product; quantity: number }[],
    details: {
      deliveryType: 'Ex-Mill (Pickup from Mill)' | 'Door Delivery (Transporter)';
      destinationCity: string;
      destinationState: string;
      pincode: string;
      shippingAddress: string;
      transportPreference?: string;
      paymentTerms: string;
      clientNotes?: string;
      contactPerson: string;
      companyName: string;
      phone: string;
      email: string;
      gstin?: string;
    }
  ): string => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const quoteNumber = `PFM-QT-2026-${randomSuffix}`;
    const id = `quote-${Date.now()}`;

    let subtotal = 0;
    let gstAmount = 0;

    const items = itemsList.map(item => {
      let unitPrice = item.product.indicativePrice;
      if (item.product.priceTiers && item.product.priceTiers.length > 0) {
        const tier = [...item.product.priceTiers]
          .sort((a, b) => b.minQty - a.minQty)
          .find(t => item.quantity >= t.minQty);
        if (tier) unitPrice = tier.pricePerUnit;
      }
      const itemSubtotal = unitPrice * item.quantity;
      const gst = itemSubtotal * item.product.gstRate;
      subtotal += itemSubtotal;
      gstAmount += gst;
      return {
        productId: item.product.id,
        productName: item.product.name,
        packaging: item.product.packaging,
        quantity: item.quantity,
        unitLabel: item.product.unitLabel,
        targetPricePerUnit: unitPrice,
        quotedPricePerUnit: unitPrice,
        gstAmount: gst,
        totalAmount: itemSubtotal + gst
      };
    });

    const freight = details.deliveryType === 'Door Delivery (Transporter)' ? 15000 : 0;
    const totalAmount = subtotal + gstAmount + freight;

    const newQuote: QuotationOrOrder = {
      id,
      quoteNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'Requested',
      distributorId: user.distributorInfo?.id || 'guest-distributor',
      companyName: details.companyName,
      contactPerson: details.contactPerson,
      phone: details.phone,
      email: details.email,
      gstin: details.gstin,
      deliveryType: details.deliveryType,
      destinationCity: details.destinationCity,
      destinationState: details.destinationState,
      pincode: details.pincode,
      shippingAddress: details.shippingAddress,
      transportPreference: details.transportPreference,
      items,
      subtotal,
      freightCharges: freight,
      gstAmount,
      totalAmount,
      paymentTerms: details.paymentTerms,
      clientNotes: details.clientNotes
    };

    setQuotations(prev => [newQuote, ...prev]);
    return quoteNumber;
  };

  const updateQuotationStatus = (
    id: string,
    status: OrderStatus,
    options?: {
      millNotes?: string;
      freightCharges?: number;
      updatedItemRates?: { productId: string; rate: number }[];
      dispatchDetails?: {
        transporterName: string;
        lrNumber: string;
        vehicleNumber: string;
        dispatchDate: string;
        estimatedArrival: string;
        remarks: string;
      };
    }
  ) => {
    setQuotations(prev =>
      prev.map(q => {
        if (q.id !== id) return q;

        let updatedItems = [...q.items];
        let subtotal = q.subtotal;
        let gstAmount = q.gstAmount;

        if (options?.updatedItemRates && options.updatedItemRates.length > 0) {
          subtotal = 0;
          gstAmount = 0;
          updatedItems = updatedItems.map(item => {
            const override = options.updatedItemRates?.find(r => r.productId === item.productId);
            const rate = override ? override.rate : item.quotedPricePerUnit || item.targetPricePerUnit || 0;
            const lineSubtotal = rate * item.quantity;
            const gst = lineSubtotal * 0.05; // standard edible oil GST
            subtotal += lineSubtotal;
            gstAmount += gst;
            return {
              ...item,
              quotedPricePerUnit: rate,
              gstAmount: gst,
              totalAmount: lineSubtotal + gst
            };
          });
        }

        const freight = options?.freightCharges !== undefined ? options.freightCharges : q.freightCharges;
        const totalAmount = subtotal + gstAmount + freight;

        // Auto assign order number if status moves beyond Quotation Sent
        const orderNumber =
          q.orderNumber ||
          (['Confirmed', 'Processing', 'Dispatched', 'Delivered'].includes(status)
            ? `PFM-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`
            : undefined);

        return {
          ...q,
          status,
          orderNumber,
          updatedAt: new Date().toISOString(),
          millNotes: options?.millNotes !== undefined ? options.millNotes : q.millNotes,
          freightCharges: freight,
          items: updatedItems,
          subtotal,
          gstAmount,
          totalAmount,
          dispatchDetails: options?.dispatchDetails || q.dispatchDetails,
          validUntil: status === 'Quotation Sent' ? new Date(Date.now() + 48 * 3600 * 1000).toISOString() : q.validUntil
        };
      })
    );
  };

  const acceptQuotationByDistributor = (id: string) => {
    updateQuotationStatus(id, 'Confirmed', {
      millNotes: 'Distributor accepted quotation terms. Awaiting production queue & advance payment receipt.'
    });
  };

  // Distributor application actions
  const submitDistributorApplication = (
    appData: Omit<DistributorApplication, 'id' | 'applicationDate' | 'status'>
  ): string => {
    const id = `dist-${Date.now()}`;
    const newDistributor: DistributorApplication = {
      ...appData,
      id,
      applicationDate: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };

    setDistributors(prev => [newDistributor, ...prev]);

    // Also auto update session if currently user
    setUser({
      isLoggedIn: true,
      role: 'distributor',
      distributorInfo: newDistributor
    });

    return id;
  };

  const updateDistributorApplication = (
    id: string,
    status: DistributorApplication['status'],
    details?: { assignedTier?: DistributorApplication['assignedTier']; creditLimit?: number; adminNotes?: string }
  ) => {
    setDistributors(prev =>
      prev.map(d =>
        d.id === id
          ? {
              ...d,
              status,
              assignedTier: details?.assignedTier ?? d.assignedTier,
              creditLimit: details?.creditLimit ?? d.creditLimit,
              adminNotes: details?.adminNotes ?? d.adminNotes
            }
          : d
      )
    );
  };

  // Auth actions
  const loginAsDistributor = (distributorId?: string) => {
    const found = distributors.find(d => d.id === distributorId) || distributors[0] || INITIAL_DISTRIBUTORS[0];
    setUser({
      isLoggedIn: true,
      role: 'distributor',
      distributorInfo: found
    });
  };

  const loginAsAdmin = () => {
    setUser({
      isLoggedIn: true,
      role: 'admin',
      adminName: 'S. K. Singhal (General Manager, Works)'
    });
  };

  const logout = () => {
    setUser({
      isLoggedIn: false,
      role: 'guest'
    });
  };

  const updateCurrentProfile = (updates: Partial<DistributorApplication>) => {
    if (user.distributorInfo?.id) {
      const id = user.distributorInfo.id;
      setDistributors(prev =>
        prev.map(d => (d.id === id ? { ...d, ...updates } : d))
      );
      setUser(prev => ({
        ...prev,
        distributorInfo: { ...prev.distributorInfo, ...updates }
      }));
    }
  };

  const resetAllData = () => {
    setProducts(INITIAL_PRODUCTS);
    setQuotations(INITIAL_QUOTATIONS_AND_ORDERS);
    setDistributors(INITIAL_DISTRIBUTORS);
    setCart([]);
    setUser({
      isLoggedIn: true,
      role: 'distributor',
      distributorInfo: INITIAL_DISTRIBUTORS[0]
    });
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.QUOTES);
    localStorage.removeItem(STORAGE_KEYS.DISTRIBUTORS);
    localStorage.removeItem(STORAGE_KEYS.CART);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        updateProduct,
        addProduct,
        deleteProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        cartGstEstimate,
        cartTotalEstimate,
        quotations,
        createQuotationFromCart,
        createDirectQuotation,
        updateQuotationStatus,
        acceptQuotationByDistributor,
        distributors,
        submitDistributorApplication,
        updateDistributorApplication,
        user,
        loginAsDistributor,
        loginAsAdmin,
        logout,
        updateCurrentProfile,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

