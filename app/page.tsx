
import { AboutSection } from "@/components/About";
import { BlogSection } from "@/components/BlogSection";
import { Catalogo } from "@/components/Catalog";
import { DeliveryHeroSection } from "@/components/DeliverySection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HeroSection } from "@/components/HeroSection";
import { ProductCarousel } from "@/components/ProductCarousel";
 
export default function Home() {


  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ProductCarousel />
      <DeliveryHeroSection />
 

      <BlogSection />
    </>
  );
}
