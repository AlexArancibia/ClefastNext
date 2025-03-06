
import { AboutSection } from "@/components/About";
import { BlogSection } from "@/components/BlogSection";
import { DeliverySection } from "@/components/DeliverySection";
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
      <DeliverySection />
      <BlogSection />
    </>
  );
}
