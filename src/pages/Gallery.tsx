import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Award, Users, Microscope, Heart } from "lucide-react";

const newsItems = [
  {
    id: "1",
    headline: "New PromethION Sequencer Fully Funded",
    date: "March 2024",
    summary: "Thanks to generous donations, we've successfully funded the £65,000 PromethION 2 Solo Sequencer. This advanced DNA sequencing technology will accelerate lymphoma research breakthroughs.",
    category: "Equipment",
    icon: <Microscope className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop"
  },
  {
    id: "2",
    headline: "UCL Cancer Institute Receives Research Excellence Award",
    date: "February 2024",
    summary: "The Institute has been recognized for outstanding contributions to blood cancer research. This achievement highlights our commitment to advancing Non-Hodgkin's Lymphoma treatments.",
    category: "Recognition",
    icon: <Award className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
  },
  {
    id: "3",
    headline: "New Clinical Trial Launches for Lymphoma Patients",
    date: "January 2024",
    summary: "Our research team has initiated a groundbreaking clinical trial testing innovative immunotherapy approaches. Early results show promising potential for improved patient outcomes.",
    category: "Research",
    icon: <Heart className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
  },
  {
    id: "4",
    headline: "Research Team Expands with Leading Scientists",
    date: "December 2023",
    summary: "Three world-renowned cancer researchers have joined our team. Their expertise in genomics and immunotherapy will strengthen our research capabilities significantly.",
    category: "Team",
    icon: <Users className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
  },
  {
    id: "5",
    headline: "Flow Cytometer Upgrade Campaign Reaches 60% Funding",
    date: "November 2023",
    summary: "Our £45,000 flow cytometer upgrade is making excellent progress. This enhanced cell analysis technology will improve diagnostic accuracy for blood cancer patients.",
    category: "Equipment",
    icon: <Microscope className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop"
  },
  {
    id: "6",
    headline: "Patient Support Services Expand Across London",
    date: "October 2023",
    summary: "New counseling and practical support programs are now available at three additional hospital locations. These services provide vital assistance to patients and families.",
    category: "Support",
    icon: <Heart className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
  }
];

const categories = ["All", "Equipment", "Research", "Recognition", "Team", "Support"];

export default function News() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Equipment": return "text-blue-600 bg-blue-50";
      case "Research": return "text-green-600 bg-green-50";
      case "Recognition": return "text-purple-600 bg-purple-50";
      case "Team": return "text-orange-600 bg-orange-50";
      case "Support": return "text-pink-600 bg-pink-50";
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
                Latest News & Updates
              </h1>
              <p className="text-muted-foreground text-lg">
                Stay informed about our research progress, equipment funding, and impact on cancer treatment.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* News Grid */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((item, index) => (
                <article 
                  key={item.id} 
                  className="glass-card rounded-xl overflow-hidden animate-fade-in hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="h-48 relative">
                    <img 
                      src={item.image} 
                      alt={item.headline}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getCategoryColor(item.category)}`}>
                        {item.icon}
                        <span className="ml-1">{item.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {item.date}
                    </div>
                    
                    <h3 className="text-lg font-bold mb-3 line-clamp-2">{item.headline}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{item.summary}</p>
                    
                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="section bg-muted">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground mb-6">
                Subscribe to receive the latest news about our research progress and funding milestones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
                />
                <Button className="btn-primary">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}