
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApartmentCard, { ApartmentProps } from "@/components/ApartmentCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Sample apartments data (will use translations from context)
const allApartments: ApartmentProps[] = [
  {
    id: "1",
    name: "Deluxe Sea View Suite",
    description: "Luxurious suite with panoramic sea views, modern amenities, and a private balcony.",
    price: 180,
    capacity: 2,
    size: 45,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Balcony"]
  },
  {
    id: "2",
    name: "Premium Family Apartment",
    description: "Spacious apartment ideal for families, with full kitchen and stunning coastal views.",
    price: 250,
    capacity: 4,
    size: 75,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    location: "Second row",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Washing Machine"]
  },
  {
    id: "3",
    name: "Executive Beach Studio",
    description: "Elegant studio with direct beach access, modern design, and premium finishes.",
    price: 150,
    capacity: 2,
    size: 35,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Kitchenette", "Bathroom", "Air Conditioning", "TV"]
  },
  {
    id: "4",
    name: "Luxury Penthouse Suite",
    description: "Exclusive top-floor suite with expansive terrace and panoramic sea views.",
    price: 350,
    capacity: 4,
    size: 90,
    image: "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Full Kitchen", "2 Bathrooms", "Air Conditioning", "TV", "Terrace", "Jacuzzi"]
  },
  {
    id: "5",
    name: "Classic Double Room",
    description: "Comfortable hotel room with modern amenities and partial sea views.",
    price: 120,
    capacity: 2,
    size: 28,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
    location: "Hotel building",
    features: ["Wi-Fi", "Bathroom", "Air Conditioning", "TV", "Mini Fridge"]
  },
  {
    id: "6",
    name: "Garden View Apartment",
    description: "Peaceful apartment surrounded by lush gardens, just a short walk from the beach.",
    price: 160,
    capacity: 3,
    size: 55,
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop",
    location: "Garden area",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Terrace"]
  },
];

export default function Apartments() {
  const [filteredApartments, setFilteredApartments] = useState<ApartmentProps[]>(allApartments);
  const [capacityFilter, setCapacityFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([100, 350]);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = allApartments;
    
    // Filter by capacity
    if (capacityFilter !== "all") {
      const capacity = parseInt(capacityFilter);
      result = result.filter(apt => apt.capacity >= capacity);
    }
    
    // Filter by location
    if (locationFilter !== "all") {
      result = result.filter(apt => apt.location === locationFilter);
    }
    
    // Filter by price range
    result = result.filter(apt => apt.price >= priceRange[0] && apt.price <= priceRange[1]);
    
    setFilteredApartments(result);
  }, [capacityFilter, locationFilter, priceRange]);
  
  // Get unique locations for filter
  const locations = ["all", ...new Set(allApartments.map(apt => apt.location))];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                UCL Cancer Institute
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                World-class cancer research at the heart of London's medical district.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-10">
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute top-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Institute Overview */}
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none animate-fade-in">
                <p className="text-lg text-muted-foreground mb-6">
                  UCL is consistently ranked among the world's top universities, and the UCL Cancer Institute, established in 2007, serves as the central hub for cancer research at UCL. With over 400 scientists dedicated to understanding and treating cancer, the Institute represents one of the largest concentrations of cancer research expertise in Europe.
                </p>
                
                <p className="text-lg text-muted-foreground mb-6">
                  Located in central London, the Institute is part of UCL's Faculty of Medical Sciences and benefits from its position at the heart of one of the world's leading medical districts. This strategic location facilitates collaboration with major teaching hospitals and provides access to diverse patient populations for clinical research.
                </p>
                
                <p className="text-lg text-muted-foreground mb-4">
                  Key research areas include:
                </p>
                
                <div className="mb-8 animate-fade-in [animation-delay:200ms]">
                  <ul className="text-lg text-muted-foreground space-y-1 ml-6">
                    <li>• Stem cell biology</li>
                    <li>• Transcription factors</li>
                    <li>• Cell cycle regulation</li>
                    <li>• Translational immunology</li>
                    <li>• Genomics & bioinformatics</li>
                    <li>• Chromatin regulation mechanisms</li>
                    <li>• Gene therapy & immunotherapy</li>
                    <li>• Viral oncology</li>
                    <li>• Drug development</li>
                    <li>• Clinical trials</li>
                  </ul>
                </div>
                
                <p className="text-lg text-muted-foreground mb-6 animate-fade-in [animation-delay:300ms]">
                  The Institute maintains strong partnerships with University College London Hospitals (UCLH), Royal Free Hospital, and Great Ormond Street Hospital. The UCH Macmillan Cancer Centre, opened in 2012 directly across from the Institute, enables seamless collaboration between researchers and clinicians, accelerating the translation of laboratory discoveries into patient treatments.
                </p>
                
                <p className="text-lg text-muted-foreground animate-fade-in [animation-delay:400ms]">
                  The UCL Cancer Institute stands at the forefront of an exciting era in cancer research. The Institute is driving progress in targeted therapies that attack specific cancer vulnerabilities, advancing personalized medicine through genomic sequencing and sophisticated diagnostics, and pioneering new treatment approaches. With access to cutting-edge facilities including the UK's first hospital-based proton therapy center, the Institute continues to lead the global effort to transform cancer from a fatal disease into a manageable condition.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Research Impact Gallery */}
        <section className="section bg-muted">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Research in Action
              </h2>
              <p className="text-muted-foreground">
                Explore the cutting-edge research facilities and collaborative spaces where breakthrough discoveries happen.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div 
                  key={index} 
                  className="aspect-square rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <img 
                    src={`https://images.unsplash.com/photo-${1550000000000 + index * 100000}?w=400&h=400&fit=crop`}
                    alt={`Research facility ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
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
