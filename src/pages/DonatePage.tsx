import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Heart, Target, Users } from "lucide-react";

// Sample campaign data
const campaigns = [
  {
    id: "1",
    title: "PromethION 2 Solo Sequencer",
    description: "Advanced DNA sequencing technology for breakthrough lymphoma research",
    target: 65000,
    raised: 65000,
    status: "completed",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop"
  },
  {
    id: "2", 
    title: "Next-Gen Diagnostic Research",
    description: "Developing faster, more accurate diagnostic tools for blood cancers",
    target: 45000,
    raised: 28500,
    status: "active",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop"
  },
  {
    id: "3",
    title: "Patient Support Services",
    description: "Expanding counseling and practical support for patients and families",
    target: 25000,
    raised: 12800,
    status: "active", 
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop"
  },
  {
    id: "4",
    title: "Research Fellowship Program",
    description: "Supporting the next generation of cancer researchers through PhD funding",
    target: 80000,
    raised: 5200,
    status: "active",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
  }
];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("one-time");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Set page metadata
    document.title = "Donate – CureCancer UCL";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Support cancer research at UCL by donating to active campaigns or the general research fund.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Support cancer research at UCL by donating to active campaigns or the general research fund.';
      document.head.appendChild(meta);
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleDonate = (campaignId?: string) => {
    // In a real app, this would process the donation
    console.log("Donation submitted:", { 
      campaignId, 
      amount: customAmount || selectedAmount, 
      type: donationType 
    });
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Fund Life-Saving Cancer Research
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-3xl mx-auto">
                Your donation directly supports breakthrough research into Non-Hodgkin's Lymphoma and other blood cancers. 
                Choose from active campaigns or contribute to our general research fund to make an immediate impact.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-primary mr-2" />
                  <span>100% goes to research</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  <span>Tax-deductible donations</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-5 w-5 text-primary mr-2" />
                  <span>Regular progress updates</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>

        {/* Campaign Grid */}
        <section className="section">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Active Campaigns
              </h2>
              <p className="text-muted-foreground">
                Support specific research initiatives and equipment purchases that are making a direct impact on cancer treatment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {campaigns.map((campaign, index) => (
                <div 
                  key={campaign.id} 
                  className="glass-card rounded-xl overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="h-48 relative">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                    {campaign.status === "completed" && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Fully Funded
                      </div>
                    )}
                    {campaign.status === "active" && (
                      <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        In Progress
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                    <p className="text-muted-foreground mb-4">{campaign.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          £{campaign.raised.toLocaleString()} raised
                        </span>
                        <span className="text-sm text-muted-foreground">
                          £{campaign.target.toLocaleString()} goal
                        </span>
                      </div>
                      <Progress 
                        value={getProgressPercentage(campaign.raised, campaign.target)} 
                        className="h-2"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {getProgressPercentage(campaign.raised, campaign.target).toFixed(0)}% funded
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full btn-primary"
                      disabled={campaign.status === "completed"}
                      onClick={() => handleDonate(campaign.id)}
                    >
                      {campaign.status === "completed" ? "Fully Funded" : "Donate to This Campaign"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* General Donation Section */}
        <section className="section bg-muted">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Support General Research
                </h2>
                <p className="text-muted-foreground text-lg">
                  Can't decide on a specific campaign? Your general donation will be allocated to our most urgent research needs.
                </p>
              </div>
              
              <div className="glass-card p-8 animate-fade-in [animation-delay:200ms]">
                {!isSubmitted ? (
                  <div className="space-y-6">
                    {/* Donation Type */}
                    <div>
                      <label className="block text-sm font-medium mb-3">Donation Type</label>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setDonationType("one-time")}
                          className={`flex-1 p-3 rounded-lg border transition-colors ${
                            donationType === "one-time" 
                              ? "border-primary bg-primary/10 text-primary" 
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          One-time
                        </button>
                        <button
                          onClick={() => setDonationType("monthly")}
                          className={`flex-1 p-3 rounded-lg border transition-colors ${
                            donationType === "monthly" 
                              ? "border-primary bg-primary/10 text-primary" 
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          Monthly
                        </button>
                      </div>
                    </div>
                    
                    {/* Amount Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-3">Select Amount</label>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                        {["25", "50", "100", "250", "500", "1000"].map((amount) => (
                          <button
                            key={amount}
                            onClick={() => {
                              setSelectedAmount(amount);
                              setCustomAmount("");
                            }}
                            className={`p-3 rounded-lg border transition-colors ${
                              selectedAmount === amount && !customAmount
                                ? "border-primary bg-primary/10 text-primary" 
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            £{amount}
                          </button>
                        ))}
                      </div>
                      
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">£</span>
                        <input
                          type="number"
                          placeholder="Custom amount"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setSelectedAmount("");
                          }}
                          className="w-full pl-8 pr-4 py-3 border border-border rounded-lg focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleDonate()}
                      className="w-full btn-primary text-lg py-4"
                      disabled={!selectedAmount && !customAmount}
                    >
                      Donate £{customAmount || selectedAmount || "0"} {donationType === "monthly" ? "Monthly" : ""}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      Your donation is secure and tax-deductible. You will receive a confirmation email with your receipt.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Thank You for Your Donation!</h3>
                    <p className="text-muted-foreground mb-6">
                      Your generous contribution will make a real difference in cancer research.
                    </p>
                    <p className="font-medium">
                      Donation Reference: <span className="text-primary">DON-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}