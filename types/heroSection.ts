// Asegurarnos de que los tipos sean consistentes
export interface HeroSectionStyles {
  titleColor: string
  subtitleColor: string
  textAlign: string
  verticalAlign: string
  overlayColor: string
  overlayType?: "none" | "color" | "gradient"
  overlayGradient?: {
    colorStart: string // String de rgba
    colorEnd: string // String de rgba
    angle: number
  }
  buttonVariant: "default" | "outline" | "secondary" | "destructive" | "ghost"
  buttonSize: "sm" | "default" | "lg"
  contentWidth: {
    mobile: string
    tablet: string
    desktop: string
  }
  contentPadding: {
    mobile: string
    tablet: string
    desktop: string
  }
  height: {
    mobile: string
    tablet: string
    desktop: string
  }
  titleSize: {
    mobile: string
    tablet: string
    desktop: string
  }
  subtitleSize: {
    mobile: string
    tablet: string
    desktop: string
  }
  textShadow: string
  animation: string
  backgroundPosition: string
  backgroundSize: string
}

export interface HeroSectionMetadata {
  section?: string
  tags?: string[]
  priority?: number
  startDate?: string
  endDate?: string
  theme?: string
  deviceVisibility?: {
    mobile?: boolean
    tablet?: boolean
    desktop?: boolean
  }
}

export interface HeroSection {
  id: string
  title: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  backgroundImage?: string
  mobileBackgroundImage?: string
  backgroundVideo?: string
  mobileBackgroundVideo?: string
  styles: Record<string, any>
  metadata?: HeroSectionMetadata
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}
