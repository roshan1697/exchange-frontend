import Image from "next/image";
import { Header } from "./components/home/header";
import { HeroCarousel } from "./components/home/hero-carousel";
import { MarketTables } from "./components/home/market-table";

export default function Home() {
  return (
    
    <>
    <div className="bg-base-background-l3">
      <Header/>
      <main>
        <HeroCarousel/>
        <MarketTables/>

        
      </main>
    </div>
    
    </>
  );
}
