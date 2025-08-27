import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Heart, Award, Coffee, Microscope } from "lucide-react";

const upcomingEvents = [
  {
    id: "1",
    title: "Annual Research Gala",
    date: "March 15, 2024",
    time: "7:00 PM",
    location: "UCL Wilkins Building",
    description: "Celebrate breakthrough discoveries and meet leading cancer researchers.",
    category: "Fundraising",
    icon: <Award className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop"
  },
  {
    id: "2",
    title: "Lab Tour & Open Day",
    date: "March 22, 2024",
    time: "2:00 PM",
    location: "UCL Cancer Institute",
    description: "Explore our research facilities and see cutting-edge equipment in action.",
    category: "Education",
    icon: <Microscope className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop"
  },
  {
    id: "3",
    title: "Patient Support Workshop",
    date: "April 5, 2024",
    time: "10:00 AM",
    location: "UCLH Conference Centre",
    description: "Information session for patients and families affected by lymphoma.",
    category: "Support",
    icon: <Heart className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
  },
  {
    id: "4",
    title: "Research Symposium",
    date: "April 18, 2024",
    time: "9:00 AM",
    location: "UCL Medical School",
    description: "Leading scientists present latest findings in blood cancer research.",
    category: "Academic",
    icon: <Users className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
  },
  {
    id: "5",
    title: "Coffee Morning Fundraiser",
    date: "May 3, 2024",
    time: "10:30 AM",
    location: "UCL Student Centre",
    description: "Informal gathering to raise funds for new laboratory equipment.",
    category: "Community",
    icon: <Coffee className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop"
  },
  {
    id: "6",
    title: "Charity Walk for Cancer",
    date: "May 20, 2024",
    time: "8:00 AM",
    location: "Regent's Park",
    description: "5km sponsored walk to support Non-Hodgkin's Lymphoma research.",
    category: "Fundraising",
    icon: <Heart className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
  }
];

export default function Events() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Fundraising": return "text-primary bg-primary/10";
      case "Education": return "text-blue-600 bg-blue-50";
      case "Support": return "text-green-600 bg-green-50";
      case "Academic": return "text-purple-600 bg-purple-50";
      case "Community": return "text-orange-600 bg-orange-50";
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
                Upcoming Events
              </h1>
              <p className="text-muted-foreground text-lg">
                Join us at upcoming events to support cancer research at UCL.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Events Grid */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className="glass-card rounded-xl overflow-hidden animate-fade-in hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="h-48 relative">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getCategoryColor(event.category)}`}>
                        {event.icon}
                        <span className="ml-1">{event.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-3">{event.title}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        {event.location}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                    
                    <Button className="w-full btn-primary">
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="section bg-muted">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Informed</h2>
              <p className="text-muted-foreground mb-6">
                Subscribe to receive updates about upcoming events and research milestones.
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