import { useEffect } from "react";

// Safe string helper: never throw on undefined/null/non-strings
const s = (v: any) => (typeof v === "string" ? v : v == null ? "" : String(v));

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import BookingForm from "@/components/BookingForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import ApartmentCard, { ApartmentProps } from "@/components/ApartmentCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Wifi, Utensils, Waves, LifeBuoy, MapPin, Coffee } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample apartments data
const impactAreas: ApartmentProps[] = [
  {
    id: "1",
    name: "Lab Equipment Funding",
    description: "Help us purchase vital tools used daily in breakthrough cancer research.",
    price: 250,
    capacity: 1,
    size: 100,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop",
    location: "Research Labs",
    features: ["Direct Impact", "Equipment Purchase", "Research Support", "Innovation", "Progress Tracking", "Regular Updates"]
  },
  {
    id: "2",
    name: "Patient Support Services",
    description: "Providing practical help and emotional care for those fighting blood cancer.",
    price: 100,
    capacity: 2,
    size: 200,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    location: "Patient Care",
    features: ["Patient Support", "Family Care", "Counseling", "Practical Help", "Emotional Support", "Community"]
  },
  {
    id: "3",
    name: "Scholarships for Researchers",
    description: "Empower the next generation of cancer scientists through funded PhDs.",
    price: 50,
    capacity: 3,
    size: 150,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    location: "Education",
    features: ["PhD Funding", "Career Development", "Training", "Innovation", "Future Scientists", "Research Excellence"]
  }
];

export default function Index() {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Feature items
  const features = [
    {
      icon: <Waves className="h-8 w-8 text-primary" />,
      title: "Laboratory Research",
      description: "State-of-the-art facilities conducting groundbreaking lymphoma research."
    },
    {
      icon: <LifeBuoy className="h-8 w-8 text-primary" />,
      title: "Clinical Trials",
      description: "Testing new treatments and therapies for Non-Hodgkin's Lymphoma patients."
    },
    {
      icon: <Utensils className="h-8 w-8 text-primary" />,
      title: "Patient Support",
      description: "Providing care and assistance to patients and their families."
    },
    {
      icon: <Wifi className="h-8 w-8 text-primary" />,
      title: "Research Collaboration",
      description: "Partnering with leading cancer research institutions worldwide."
    },
    {
      icon: <Coffee className="h-8 w-8 text-primary" />,
      title: "Education & Awareness",
      description: "Raising awareness about blood cancers and their prevention."
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: "Innovation Hub",
      description: "Located at UCL, one of the world's leading research universities."
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Welcome Section */}
        <section id="welcome" className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in [animation-delay:100ms]">
                <span className="text-sm text-primary font-medium uppercase tracking-wider">
                  {t.home.welcome.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                  {t.home.welcome.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t.home.welcome.description1}
                </p>
                <p className="text-muted-foreground mb-8">
                  {t.home.welcome.description2}
                </p>
                <Button asChild className="btn-primary">
                  <Link to="/about">
                    {t.home.welcome.learnMore} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="relative animate-fade-in [animation-delay:300ms]">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop"
                    alt="Cancer research laboratory" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-2/3 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
                    alt="Patient support and care" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-6 -right-6 w-1/2 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
                    alt="Research education and training" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Booking Form Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <span className="text-sm text-primary font-medium uppercase tracking-wider">
                  Make a Difference
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                  Become a Supporter
                </h2>
                <p className="text-muted-foreground mb-6">
                  Get involved by making a one-time or recurring donation. Your contribution will directly help fund our research and support services for patients and families.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Direct impact on research", "Regular progress updates", "Tax-deductible donations", "Transparent fund usage"].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <BookingForm />
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Impact Areas */}
        <section className="section">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                Our Impact Areas
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                Where Your Donation Makes a Difference
              </h2>
              <p className="text-muted-foreground">
                Discover how your support directly contributes to breakthrough cancer research and patient care services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {impactAreas.map((impactArea, index) => (
                <div key={impactArea.id} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                  <ApartmentCard apartment={impactArea} />
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild className="btn-primary">
                <Link to="/apartments">
                  View All Impact Areas <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Features Section */}
        <section className="section bg-card">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                Research Focus
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                Advancing Medical Science
              </h2>
              <p className="text-muted-foreground">
                Our comprehensive approach to cancer research encompasses multiple areas of study and support.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-xl animate-fade-in flex flex-col items-center text-center"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="mb-4 p-3 rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
                Welcome to Our Mission
        {/* CTA Section */}
        <section className="relative py-24 bg-primary/5">
                Welcome to Cure Cancer @ UCL
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Where Science Meets Hope
              </h2>
              <p className="text-muted-foreground mb-8">
                Learn More About Our Mission
              </p>
              <Button asChild className="btn-primary">
                <Link to="/booking">
                  Donate Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
        </section>
          
          {/* Decorative waves */}
          <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
            <svg 
              className="absolute bottom-0 w-full h-24 fill-background"
              preserveAspectRatio="none"
              viewBox="0 0 1440 74"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M0,37.1L40,34.5C80,32,160,27,240,29.6C320,32,400,42,480,42.9C560,44,640,35,720,32.1C800,30,880,34,960,40.8C1040,47,1120,56,1200,56.6C1280,57,1360,48,1400,43.3L1440,39.1L1440,74L1400,74C1360,74,1280,74,1200,74C1120,74,1040,74,960,74C880,74,800,74,720,74C640,74,560,74,480,74C400,74,320,74,240,74C160,74,80,74,40,74L0,74Z"
                className="animate-wave opacity-50"
              />
              <path 
                d="M0,37.1L40,34.5C80,32,160,27,240,29.6C320,32,400,42,480,42.9C560,44,640,35,720,32.1C800,30,880,34,960,40.8C1040,47,1120,56,1200,56.6C1280,57,1360,48,1400,43.3L1440,39.1L1440,74L1400,74C1360,74,1280,74,1200,74C1120,74,1040,74,960,74C880,74,800,74,720,74C640,74,560,74,480,74C400,74,320,74,240,74C160,74,80,74,40,74L0,74Z"
                className="animate-wave opacity-100 [animation-delay:-4s]"
              />
            </svg>
          </div>
      </main>
      
      <Footer />
    </div>
  );
}
