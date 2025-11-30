import Hero from "@/components/Hero";
import FeatureShowcase from "@/components/FeatureShowcase";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeatureShowcase />
    </div>
  );
}
