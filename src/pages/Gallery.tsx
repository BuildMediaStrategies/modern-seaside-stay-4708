import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Target, Users, Heart } from "lucide-react";

const wishlistItems = [
  {
    id: "1",
    name: "PromethION 2 Solo Sequencer",
    description: "Advanced DNA sequencing technology for breakthrough lymphoma research",
    target: 65000,
    raised: 65000,
    status: "completed",
    priority: "High"
  },
  {
    id: "2", 
    name: "Flow Cytometer Upgrade",
    description: "Enhanced cell analysis capabilities for diagnostic research",
    target: 45000,
    raised: 28500,
    status: "active",
    priority: "High"
  },
  {
    id: "3",
    name: "Microscopy Equipment",
    description: "High-resolution imaging for cellular research studies",
    target: 25000,
    raised: 12800,
    status: "active", 
    priority: "Medium"
  },
  {
    id: "4",
    name: "Laboratory Consumables",
    description: "Essential supplies for ongoing research projects",
    target: 15000,
    raised: 5200,
    status: "active",
    priority: "Medium"
  },
  {
    id: "5",
    name: "Data Storage System",
    description: "Secure storage for research data and patient information",
    target: 35000,
    raised: 8900,
    status: "active",
    priority: "High"
  },
  {
    id: "6",
    name: "Centrifuge Equipment",
    description: "Sample preparation equipment for laboratory analysis",
    target: 18000,
    raised: 3400,
    status: "active",
    priority: "Low"
  }
];

export default function Wishlist() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-600 bg-red-50";
      case "Medium": return "text-yellow-600 bg-yellow-50";
      case "Low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };
  
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
              <p className="text-muted-foreground text-lg mb-4">
                Each year the UCL Cancer Institute shares a list of vital research equipment.
              </p>
              <p className="text-muted-foreground text-lg">
                Cure Cancer @ UCL raises funds to provide these items. Donations directly advance research and care.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Wishlist Items */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="glass-card rounded-xl overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      </div>
                      <div className="ml-4">
                        {item.status === "completed" ? (
                          <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <Check className="h-3 w-3 mr-1" />
                            Funded
                          </div>
                        ) : (
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          £{item.raised.toLocaleString()} raised
                        </span>
                        <span className="text-sm text-muted-foreground">
                          £{item.target.toLocaleString()} goal
                        </span>
                      </div>
                      <Progress 
                        value={getProgressPercentage(item.raised, item.target)} 
                        className="h-2"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {getProgressPercentage(item.raised, item.target).toFixed(0)}% funded
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full btn-primary"
                      disabled={item.status === "completed"}
                    >
                      {item.status === "completed" ? "Fully Funded" : "Support This Item"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}