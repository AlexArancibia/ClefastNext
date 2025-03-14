import { create } from "zustand"
import apiClient from "@/lib/axiosConfig"
import type { Product } from "@/types/product"
import type { Category } from "@/types/category"
import type { Collection } from "@/types/collection"
import type { Order, CreateOrderDto, UpdateOrderDto, CreateRefundDto } from "@/types/order"
import type { Customer, CreateCustomerDto, UpdateCustomerDto } from "@/types/customer"
import type { Coupon } from "@/types/coupon"
import type { ShippingMethod } from "@/types/shippingMethod"
import type { ShopSettings } from "@/types/shopSettings"
import type { Currency } from "@/types/currency"
import type { ExchangeRate } from "@/types/exchangeRate"
import type { ProductVariant } from "@/types/productVariant"
import type { Content } from "@/types/content"
 
import type { PaymentProvider, PaymentTransaction } from "@/types/payments"
import type { HeroSection } from "@/types/heroSection"

interface MainStore {
  
  endpoint: string
  categories: Category[]
  products: Product[]
  productVariants: ProductVariant[]
  collections: Collection[]
  orders: Order[]
  customers: Customer[]
  coupons: Coupon[]
  shippingMethods: ShippingMethod[]
  paymentProviders: PaymentProvider[]
  paymentTransactions: PaymentTransaction[]
  currencies: Currency[]
  exchangeRates: ExchangeRate[]
  contents: Content[]
  heroSections: HeroSection[]
 
  shopSettings: ShopSettings[]
  loading: boolean
  error: string | null
  lastFetch: {
    categories: number | null
    products: number | null
    productVariants: number | null
    collections: number | null
    orders: number | null
    customers: number | null
    coupons: number | null
    shippingMethods: number | null
    paymentProviders: number | null
    contents: number | null
    heroSections: number | null
    users: number | null
    shopSettings: number | null
    currencies: number | null
    exchangeRates: number | null
  }

  setEndpoint: (endpoint: string) => void

  // Category actions
  fetchCategories: () => Promise<Category[]>

  // Product actions
  fetchProducts: () => Promise<Product[]>

  // ProductVariant actions
  fetchProductVariants: () => Promise<ProductVariant[]>

  // Content actions
  fetchContents: () => Promise<Content[]>
  fetchContent: (id: string) => Promise<Content>

  // HeroSection actions
  fetchHeroSections: () => Promise<HeroSection[]>
  fetchHeroSection: (id: string) => Promise<HeroSection>

  // Collection actions
  fetchCollections: () => Promise<Collection[]>

  // Order actions
  fetchOrders: () => Promise<Order[]>
  createOrder: (data: CreateOrderDto) => Promise<Order>
  updateOrder: (id: string, data: UpdateOrderDto) => Promise<Order>
  createRefund: (data: CreateRefundDto) => Promise<void>

  // Customer actions
  fetchCustomers: () => Promise<Customer[]>
  createCustomer: (customer: CreateCustomerDto) => Promise<Customer>
  updateCustomer: (id: string, customer: UpdateCustomerDto) => Promise<Customer>

  // Coupon actions
  fetchCoupons: () => Promise<Coupon[]>

  // Shipping Method actions
  fetchShippingMethods: () => Promise<ShippingMethod[]>

  // PaymentProvider actions
  fetchPaymentProviders: () => Promise<PaymentProvider[]>
  fetchPaymentTransactions: () => Promise<PaymentTransaction[]>

  // User actions
 

  // Shop actions
  fetchShopSettings: () => Promise<ShopSettings[]>

  // Currency actions
  fetchCurrencies: () => Promise<Currency[]>

  // Exchange Rate actions
  fetchExchangeRates: () => Promise<ExchangeRate[]>

  // Utility functions
  refreshData: () => Promise<void>
  getCategoryById: (id: string) => Category | undefined
  getProductById: (id: string) => Product | undefined
  getCollectionById: (id: string) => Collection | undefined
  getOrderById: (id: string) => Order | undefined
  getCustomerById: (id: string) => Customer | undefined
  getCouponById: (id: string) => Coupon | undefined
  getCurrencyById: (id: string) => Currency | undefined
  getExchangeRateById: (id: string) => ExchangeRate | undefined
  submitFormEmail: (formData: any) => Promise<void>
  sendEmail: (to: string, subject: string, html: string) => Promise<void>
  initializeStore: () => Promise<void>;

}

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds

export const useMainStore = create<MainStore>((set, get) => ({
  endpoint: "",
  categories: [],
  products: [],
  productVariants: [],
  collections: [],
  orders: [],
  customers: [],
  heroSections: [],
  coupons: [],
  shippingMethods: [],
  contents: [],
  users: [],
  shopSettings: [],
  currencies: [],
  exchangeRates: [],
  paymentProviders: [],
  paymentTransactions: [],
  loading: false,
  error: null,
  lastFetch: {
    categories: null,
    products: null,
    productVariants: null,
    collections: null,
    orders: null,
    customers: null,
    heroSections: null,
    coupons: null,
    shippingMethods: null,
    paymentProviders: null,
    contents: null,
    users: null,
    shopSettings: null,
    currencies: null,
    exchangeRates: null,
  },

  setEndpoint: () => {
    const savedEndpoint = typeof window !== "undefined" ? localStorage.getItem("endpoint") || "" : ""
    set({ endpoint: savedEndpoint })
  },

  // Category actions
  fetchCategories: async () => {
    const { categories, lastFetch } = get()
    const now = Date.now()

    if (categories.length > 0 && lastFetch.categories && now - lastFetch.categories < CACHE_DURATION) {
      return categories
    }

    set({ loading: true, error: null })
    try {
      const response = await apiClient.get<Category[]>("/categories")
      set({ categories: response.data, loading: false, lastFetch: { ...get().lastFetch, categories: now } })
      return response.data
    } catch (error) {
      set({ error: "Failed to fetch categories", loading: false })
      throw error
    }
  },

  // Product actions
  fetchProducts: async () => {
    const { products, lastFetch } = get()
    const now = Date.now()

    if (products.length > 0 && lastFetch.products && now - lastFetch.products < CACHE_DURATION) {
      return products
    }

    set({ loading: true, error: null })
    try {
      const response = await apiClient.get<Product[]>("/products")
      set({ products: response.data, loading: false, lastFetch: { ...get().lastFetch, products: now } })
      return response.data
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false })
      throw error
    }
  },

  // ProductVariant actions
  fetchProductVariants: async () => {
    const { productVariants, lastFetch } = get()
    const now = Date.now()

    if (productVariants.length > 0 && lastFetch.productVariants && now - lastFetch.productVariants < CACHE_DURATION) {
      return productVariants
    }

    set({ loading: true, error: null })
    try {
      const response = await apiClient.get<ProductVariant[]>("/product-variants")
      set({ productVariants: response.data, loading: false, lastFetch: { ...get().lastFetch, productVariants: now } })
      return response.data
    } catch (error) {
      set({ error: "Failed to fetch product variants", loading: false })
      throw error
    }
  },

  fetchContents: async () => {
    const { contents, lastFetch } = get()
    const now = Date.now()

    if (contents.length > 0 && lastFetch.contents && now - lastFetch.contents < CACHE_DURATION) {
      return contents
    }

    set({ loading: true, error: null })
    try {
      const response = await apiClient.get<Content[]>("/content")
      set({ contents: response.data, loading: false, lastFetch: { ...get().lastFetch, contents: now } })
      return response.data
    } catch (error) {
      set({ error: "Failed to fetch contents", loading: false })
      throw error
    }
  },

  fetchContent: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const response = await apiClient.get<Content>(`/content/${id}`)
      set({ loading: false })
      return response.data
    } catch (error) {
      set({ error: "Failed to fetch content", loading: false })
      throw error
    }
  },

  fetchHeroSections: async () => {
    const { heroSections, lastFetch } = get()
    const now = Date.now()

    if (heroSections.length > 0 && lastFetch.heroSections && now - lastFetch.heroSections < CACHE_DURATION) {
      return heroSections
    }

    set({ loading: true, error: null })
    try {
      const response = await apiClient.get<HeroSection[]>("/hero-section")
      set({
        heroSections: response.data,
        loading: false,
        lastFetch: { ...get().lastFetch, heroSections: now },
      })
      return response.data
    } catch (error) {
      set({ error: "Failed to fetch hero sections", loading: false })
      throw error
    }
  },

  fetchHeroSection: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const response = await apiClient.get<HeroSection>(`/hero-section/${id}`)
      set({ loading: false })
      return response.data
    } catch (error) {
      set({ error: "Failed to fetch hero section", loading: false })
      throw error
    }
  },

  // Collection actions
  fetchCollections: async () => {
    const { collections, lastFetch } = get()
    const now = Date.now()

    if (collections.length > 0 && lastFetch.collections && now - lastFetch.collections < CACHE_DURATION) {
      return collections
    }

    set({ loading: true, error: null })
    try {
      const response = await apiClient.get<Collection[]>("/collections")
      set({ collections: response.data, loading: false, lastFetch: { ...get().lastFetch, collections: now } })
      return response.data
    } catch (error) {
      set({ error: "Failed to fetch collections", loading: false })
      throw error
    }
  },

  // Order actions
  fetchOrders: async () => {
    const response = await apiClient.get("/order")
    console.log("xDDDD:;;;;;;", response)
    const orders = response.data
    set({ orders })
    return orders
  },

  createOrder: async (data: CreateOrderDto) => {
    const response = await apiClient.post("/order", data)
    const newOrder = response.data
    set((state) => ({ orders: [...state.orders, newOrder] }))
    return newOrder
  },

  updateOrder: async (id: string, data: UpdateOrderDto) => {
    const response = await apiClient.patch(`/order/${id}`, data)
    const updatedOrder = response.data
    set((state) => ({
      orders: state.orders.map((order) => (order.id === id ? updatedOrder : order)),
    }))
    return updatedOrder
  },

  createRefund: async (data: CreateRefundDto) => {
    await apiClient.post("/refund", data)
    // After creating a refund, fetch the updated order to reflect the changes
    const updatedOrder = await apiClient.get(`/order/${data.orderId}`)
    set((state) => ({
      orders: state.orders.map((order) => (order.id === data.orderId ? updatedOrder.data : order)),
    }))
  },

  // Customer actions
  fetchCustomers: async () => {
    console.log("Iniciando fetchCustomers")
    const { customers, lastFetch } = get()
    const now = Date.now()
    console.log("Último fetch:", lastFetch.customers, "Ahora:", now)

    if (customers.length > 0 && lastFetch.customers && now - lastFetch.customers < CACHE_DURATION) {
      console.log("Usando datos en caché")
      return customers
    }

    console.log("Haciendo nueva petición a la API")
    set({ loading: true, error: null })
    try {
      console.log("URL de la petición:", `${apiClient.defaults.baseURL}/customers`)
      const response = await apiClient.get<Customer[]>("/customers")
      console.log("Respuesta recibida:", response.data)
      set({ customers: response.data, loading: false, lastFetch: { ...get().lastFetch, customers: now } })
      return response.data
    } catch (error) {
      console.error("Error en fetchCustomers:", error)
      set({ error: "Failed to fetch customers", loading: false })
      throw error
    }
  },

  createCustomer: async (customer: CreateCustomerDto) => {
    set({ loading: true, error: null })
    try {
      const customerData = {
        ...customer,
        phone: customer.phone === "" ? null : customer.phone,
      }
      const response = await apiClient.post<Customer>("/customers", customerData)
      set((state) => ({
        customers: [...state.customers, response.data],
        loading: false,
      }))
      return response.data
    } catch (error) {
      set({ error: "Failed to create customer", loading: false })
      throw error
    }
  },

  updateCustomer: async (id: string, customer: UpdateCustomerDto) => {
    set({ loading: true, error: null })
    try {
      const customerData = {
        ...customer,
        phone: customer.phone === "" ? null : customer.phone,
      }
      // Si no se proporciona una nueva contraseña, no la incluimos en la actualización
      if (!customerData.password) {
        delete customerData.password
      }
      const response = await apiClient.patch<Customer>(`/customers/${id}`, customerData)
      set((state) => ({
        customers: state.customers.map((c) => (c.id === id ? { ...c, ...response.data } : c)),
        loading: false,
      }))
      return response.data
    } catch (error) {
      set({ error: "Failed to update customer", loading: false })
      throw error
    }
  },

  // Coupon actions
  fetchCoupons: async () => {
    const { coupons, lastFetch } = get()
    const now = Date.now()

    if (coupons.length > 0 && lastFetch.coupons && now - lastFetch.coupons < CACHE_DURATION) {
      return coupons
    }

    set({ loading: true, error: null })
    try {
      const response = await apiClient.get<Coupon[]>("/coupon")
      set({ coupons: response.data, loading: false, lastFetch: { ...get().lastFetch, coupons: now } })
      return response.data
    } catch (error) {
      set({ error: "Failed to fetch coupons", loading: false })
      throw error
    }
  },

  // Shipping Method actions
  fetchShippingMethods: async () => {
    const { shippingMethods, lastFetch } = get()
    const now = Date.now()

    if (shippingMethods.length > 0 && lastFetch.shippingMethods && now - lastFetch.shippingMethods < CACHE_DURATION) {
      return shippingMethods
    }

    set({ loading: true, error: null })
    try {
      const response = await apiClient.get<ShippingMethod[]>("/shipping-methods")
      set({ shippingMethods: response.data, loading: false, lastFetch: { ...get().lastFetch, shippingMethods: now } })
      return response.data
    } catch (error) {
      set({ error: "Failed to fetch shipping methods", loading: false })
      throw error
    }
  },

  // PaymentProvider actions
  fetchPaymentProviders: async () => {
    const response = await apiClient.get("/payment-providers")
    const providers = response.data
    set({ paymentProviders: providers })
    return providers
  },

  fetchPaymentTransactions: async () => {
    const response = await apiClient.get("/payment-transaction")
    const transactions = response.data
    set({ paymentTransactions: transactions })
    return transactions
  },

  // User actions
 

  fetchShopSettings: async () => {
    const { shopSettings, lastFetch } = get()
    const now = Date.now()

    // Comprueba si los datos ya están en la caché y son válidos
    if (shopSettings && lastFetch.shopSettings && now - lastFetch.shopSettings < CACHE_DURATION) {
      return shopSettings
    }

    set({ loading: true, error: null })

    try {
      const response = await apiClient.get<ShopSettings[]>("/shop")
      console.log("SHOPPP SETTINGS", response.data)
      set({
        shopSettings: response.data,
        loading: false,
        lastFetch: { ...lastFetch, shopSettings: now },
      })

      return response.data
    } catch (error) {
      set({ error: "Failed to fetch shop settings", loading: false })
      throw error
    }
  },

  // Currency actions
  fetchCurrencies: async () => {
    const { currencies, lastFetch } = get()
    const now = Date.now()

    if (currencies.length > 0 && lastFetch.currencies && now - lastFetch.currencies < CACHE_DURATION) {
      return currencies
    }

    set({ loading: true, error: null })
    try {
      const response = await apiClient.get<Currency[]>("/currencies")
      set({ currencies: response.data, loading: false, lastFetch: { ...get().lastFetch, currencies: now } })
      return response.data
    } catch (error) {
      set({ error: "Failed to fetch currencies", loading: false })
      throw error
    }
  },

  // Exchange Rate actions
  fetchExchangeRates: async () => {
    const { exchangeRates, lastFetch } = get()
    const now = Date.now()

    if (exchangeRates.length > 0 && lastFetch.exchangeRates && now - lastFetch.exchangeRates < CACHE_DURATION) {
      return exchangeRates
    }

    set({ loading: true, error: null })
    try {
      const response = await apiClient.get<ExchangeRate[]>("/exchange-rates")
      set({ exchangeRates: response.data, loading: false, lastFetch: { ...get().lastFetch, exchangeRates: now } })
      return response.data
    } catch (error) {
      set({ error: "Failed to fetch exchange rates", loading: false })
      throw error
    }
  },

  // Utility functions
  refreshData: async () => {
    set({ loading: true, error: null })
    try {
      const [
        categoriesResponse,
        productsResponse,
        productVariantsResponse,
        collectionsResponse,
        ordersResponse,
        customersResponse,
        couponsResponse,
        shippingMethodsResponse,
        paymentProvidersResponse,
        contentsResponse,
 
        shopSettingsResponse,
        currenciesResponse,
        exchangeRatesResponse,
        heroSectionsResponse,
      ] = await Promise.all([
        apiClient.get<Category[]>("/categories"),
        apiClient.get<Product[]>("/products"),
        apiClient.get<ProductVariant[]>("/product-variants"),
        apiClient.get<Collection[]>("/collections"),
        apiClient.get<Order[]>("/orders"),
        apiClient.get<Customer[]>("/customers"),
        apiClient.get<Coupon[]>("/coupons"),
        apiClient.get<ShippingMethod[]>("/shipping-methods"),
        apiClient.get<PaymentProvider[]>("/payment-providers"),
        apiClient.get<Content[]>("/contents"),
        apiClient.get<ShopSettings[]>("/shop"),
        apiClient.get<Currency[]>("/currencies"),
        apiClient.get<ExchangeRate[]>("/exchange-rates"),
        apiClient.get<HeroSection[]>("/hero-section"),
      ])
      const now = Date.now()
      set({
        categories: categoriesResponse.data,
        products: productsResponse.data,
        productVariants: productVariantsResponse.data,
        collections: collectionsResponse.data,
        heroSections: heroSectionsResponse.data,
        orders: ordersResponse.data,
        customers: customersResponse.data,
        coupons: couponsResponse.data,
        shippingMethods: shippingMethodsResponse.data,
        paymentProviders: paymentProvidersResponse.data,
        contents: contentsResponse.data,
        shopSettings: shopSettingsResponse.data,
        currencies: currenciesResponse.data,
        exchangeRates: exchangeRatesResponse.data,
        loading: false,
        lastFetch: {
          categories: now,
          products: now,
          productVariants: now,
          collections: now,
          orders: now,
          customers: now,
          coupons: now,
          heroSections: now,
          shippingMethods: now,
          paymentProviders: now,
          contents: now,
          users: now,
          shopSettings: now,
          currencies: now,
          exchangeRates: now,
        },
      })
    } catch (error) {
      set({ error: "Failed to refresh data", loading: false })
      throw error
    }
  },

  getCategoryById: (id) => {
    const category = get().categories.find((category) => category.id === id)
    if (category) {
      return {
        ...category,
        parent: category.parentId ? get().categories.find((c) => c.id === category.parentId) : undefined,
        children: get().categories.filter((c) => c.parentId === category.id),
      }
    }
    return undefined
  },

  getProductById: (id) => {
    return get().products.find((product) => product.id === id)
  },

  getCollectionById: (id) => {
    return get().collections.find((collection) => collection.id === id)
  },

  getOrderById: (id) => {
    return get().orders.find((order) => order.id === id)
  },

  getCustomerById: (id) => {
    return get().customers.find((customer) => customer.id === id)
  },

  getCouponById: (id) => {
    return get().coupons.find((coupon) => coupon.id === id)
  },

  getCurrencyById: (id) => {
    return get().currencies.find((currency) => currency.id === id)
  },

  getExchangeRateById: (id) => {
    return get().exchangeRates.find((exchangeRate) => exchangeRate.id === id)
  },

  sendEmail: async (to, subject, html) => {
    try {
      const response = await apiClient.post("/email/send", {
        to,
        subject,
        html,
      })
      return response.data
    } catch (error) {
      console.error("Error sending email:", error)
      throw error
    }
  },
  submitFormEmail: async (formData) => {
    try {
      const response = await apiClient.post("/email/submit-form", formData)
      return response.data
    } catch (error) {
      console.error("Error submitting form email:", error)
      throw error
    }
  },

  initializeStore: async () => {
    // if (get().products.length > 0 && get().shopSettings.length > 0) return;

    set({ loading: true });
    try {
      await Promise.all([get().fetchProducts(), get().fetchShopSettings(), get().fetchShippingMethods(), get().fetchCategories(),  get().fetchCollections() ,get().fetchPaymentProviders()]);
    } finally {
      set({ loading: false });
    }
  },

}))

