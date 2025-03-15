export interface HeroSection {
  id: string
  title: string
  subtitle?: string
  backgroundImage?: string
  mobileBackgroundImage?: string
  buttonText?: string
  buttonLink?: string
  styles?: Record<string, any>
  metadata?: Record<string, any>
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface HeroSectionStyles {
  height: {
    mobile: string
    tablet: string
    desktop: string
  }
  animation: string
  textAlign: string
  titleSize: {
    mobile: string
    tablet: string
    desktop: string
  }
  buttonSize: string
  textShadow: string
  titleColor: string
  contentWidth: {
    mobile: string
    tablet: string
    desktop: string
  }
  overlayColor: string
  subtitleSize: {
    mobile: string
    tablet: string
    desktop: string
  }
  buttonVariant: string
  subtitleColor: string
  verticalAlign: string
  backgroundSize: string
  contentPadding: {
    mobile: string
    tablet: string
    desktop: string
  }
  backgroundPosition: string
}