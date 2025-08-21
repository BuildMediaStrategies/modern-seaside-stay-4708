import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Wishlist() {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Wishlist
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                Help Fund Life-Saving Equipment
              </p>
              <p className="text-muted-foreground">
                Our Wishlist shows current fundraising goals for critical equipment that will directly impact cancer research and patient outcomes. Every donation brings us closer to a breakthrough.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Current Active Wishlist Item */}
        <section className="section">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Current Active Wishlist Item</h2>
              
              <div className="glass-card p-8 animate-fade-in">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold mb-4">Promethion 2 Solo</h3>
                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground mb-2">Progress: 23% funded</div>
                    <div className="w-full bg-muted rounded-full h-3 mb-2">
                      <div className="bg-primary h-3 rounded-full transition-all duration-300" style={{ width: '23%' }}></div>
                    </div>
                    <div className="text-2xl font-bold text-primary">Goal: £6,600</div>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Your support will help fund this vital research tool used to advance treatment studies.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="btn-primary">
                      Donate to this item
                    </Button>
                    <Button variant="outline">
                      Support this Goal
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}