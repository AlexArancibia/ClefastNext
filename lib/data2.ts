export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  tags: string[]
  isNew?: boolean
  inStock: boolean
  features?: string[]
}

export const products: Product[] = [
  {
    id: 1,
    name: "Detergente Extra Forte",
    description: "Detergente líquido concentrado para lavandería industrial con alto poder desengrasante.",
    price: 199.9,
    image: "/product1.png",
    category: "Detergentes",
    tags: ["Lavandería", "Industrial", "Concentrado"],
    isNew: true,
    inStock: true,
    features: ["Fórmula concentrada", "Biodegradable", "Alto poder desengrasante", "pH neutro"],
  },
  {
    id: 2,
    name: "Suavizante Premium",
    description: "Suavizante textil concentrado con aroma duradero para todo tipo de telas.",
    price: 159.9,
    image: "/product2.png",
    category: "Suavizantes",
    tags: ["Lavandería", "Textil", "Aroma"],
    inStock: true,
    features: ["Aroma duradero", "No daña las fibras", "Antiestático", "Rinde hasta 100 lavadas"],
  },
  {
    id: 3,
    name: "Desinfectante Industrial",
    description: "Desinfectante de amplio espectro para superficies industriales y hospitalarias.",
    price: 299.9,
    image: "/product3.png",
    category: "Desinfectantes",
    tags: ["Hospital", "Industrial", "Sanitización"],
    isNew: true,
    inStock: true,
    features: ["Elimina 99.9% de bacterias", "Uso hospitalario", "No deja residuos", "Secado rápido"],
  },
  // Añade más productos según sea necesario
]

export const categories = [
  {
    name: "Detergentes",
    count: 15,
    subcategories: ["Líquidos", "En polvo", "Concentrados"],
  },
  {
    name: "Suavizantes",
    count: 8,
    subcategories: ["Textil", "Industrial", "Hogar"],
  },
  {
    name: "Desinfectantes",
    count: 12,
    subcategories: ["Hospitalario", "Industrial", "Superficies"],
  },
  {
    name: "Limpiadores",
    count: 20,
    subcategories: ["Multiusos", "Específicos", "Especiales"],
  },
  {
    name: "Sanitizantes",
    count: 10,
    subcategories: ["Manos", "Superficies", "Equipos"],
  },
]

export const filters = {
  priceRanges: [
    { label: "Menos de S/100", value: "0-100" },
    { label: "S/100 - S/200", value: "100-200" },
    { label: "S/200 - S/300", value: "200-300" },
    { label: "Más de S/300", value: "300+" },
  ],
  sizes: [
    { label: "1L", value: "1L" },
    { label: "4L", value: "4L" },
    { label: "10L", value: "10L" },
    { label: "20L", value: "20L" },
  ],
  applications: ["Lavandería", "Industrial", "Hospitalario", "Hotelería", "Restaurantes", "Minería"],
}

export const blogPosts = [
  {
    id: "1",
    title: "The Impact of Technology on the Workplace",
    excerpt: "Explore how technology is reshaping the modern workplace and its implications for businesses.",
    image: "/blog1.jpg",
    category: "Technology",
    featured: true,
  },
  {
    id: "2",
    title: "Sustainable Practices in Industrial Cleaning",
    excerpt: "Learn about eco-friendly cleaning solutions and their benefits for the environment and your business.",
    image: "/blog2.jpg",
    category: "Sustainability",
    featured: false,
  },
  {
    id: "3",
    title: "The Future of Cleaning: Innovations and Trends",
    excerpt: "Discover the latest advancements in cleaning technology and how they can improve efficiency and safety.",
    image: "/blog3.jpg",
    category: "Innovation",
    featured: false,
  },
]

export const testimonials = [
  {
    id: 1,
    name: "John Smith",
    role: "CEO, Acme Corp",
    text: "Clefast has transformed our cleaning processes. Their products are effective and eco-friendly.",
    rating: 5,
    avatar: "/avatars/john.jpg",
  },
  {
    id: 2,
    name: "Emily Johnson",
    role: "Manager, Beta Industries",
    text: "We've seen a significant improvement in cleanliness and hygiene since switching to Clefast products.",
    rating: 4,
    avatar: "/avatars/emily.jpg",
  },
  {
    id: 3,
    name: "David Brown",
    role: "Owner, Gamma Solutions",
    text: "Clefast's customer service is outstanding. They always go above and beyond to meet our needs.",
    rating: 5,
    avatar: "/avatars/david.jpg",
  },
]

export const testimonios = [
  {
    id: 1,
    nombre: "Juan Pérez",
    cargo: "Gerente de Operaciones, Empresa XYZ",
    texto:
      "Los productos de Clefast han mejorado significativamente la limpieza en nuestras instalaciones. ¡Muy recomendables!",
    calificacion: 5,
    avatar: "/avatars/juan.jpg",
  },
  {
    id: 2,
    nombre: "María Gómez",
    cargo: "Supervisora de Limpieza, Hospital ABC",
    texto:
      "La calidad de los desinfectantes de Clefast es excelente. Nos brindan la seguridad que necesitamos en nuestro hospital.",
    calificacion: 4,
    avatar: "/avatars/maria.jpg",
  },
  {
    id: 3,
    nombre: "Carlos Rodríguez",
    cargo: "Jefe de Mantenimiento, Hotel LMN",
    texto:
      "El servicio de Clefast es impecable. Siempre están dispuestos a ayudarnos y a brindarnos soluciones personalizadas.",
    calificacion: 5,
    avatar: "/avatars/carlos.jpg",
  },
]

