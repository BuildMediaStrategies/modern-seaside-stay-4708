import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Award, Users, Heart } from "lucide-react";

const leadershipTeam = [
  {
    name: "Sandra Hamilton",
    role: "Founder, Chairman & Trustee",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=faces"
  },
  {
    name: "Bhavti Parmar",
    role: "Coordinator",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=faces"
  },
  {
    name: "Julia Selt",
    role: "Coordinator",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=faces"
  },
  {
    name: "Julian Margolin MBE",
    role: "Trustee",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces"
  },
  {
    name: "Natasha Hamilton",
    role: "Secretary & Trustee",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&fit=crop&crop=faces"
  },
  {
    name: "Professor Gert Attard",
    role: "Head of the UCL Cancer Institute",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=faces"
  },
  {
    name: "Siamack Bagheri",
    role: "Trustee",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=faces"
  },
  {
    name: "Stephen Sampson (FCA)",
    role: "Treasurer & Trustee",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=faces"
  },
  {
    name: "Joshua Johnson",
    role: "Web Development & DevOps Engineer",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=faces"
  }
];

const patronsAndSupporters = [
  { 
    name: "Professor A. Virchis",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=faces"
  },
  { 
    name: "Professor Anthony H. Goldstone (UCL)",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=faces"
  },
  { 
    name: "David King",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces"
  },
  { 
    name: "Rachel Stevens",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces"
  },
  { 
    name: "Amy Childs",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces"
  }
];

export default function Team() {
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
                Team
              </h1>
              <p className="text-muted-foreground text-lg">
                Meet the team of researchers, trustees, and supporters driving Cure Cancer @ UCL.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Leadership Team */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Leadership Team</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadershipTeam.map((member, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-xl animate-fade-in text-center group hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="relative mb-4">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-colors">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Patrons & Supporters */}
        <section className="section bg-muted">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Patrons & Supporters</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We are proud to be supported by esteemed patrons and champions of our mission.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {patronsAndSupporters.map((patron, index) => (
                <div 
                  key={index} 
                  className="glass-card p-4 rounded-xl animate-fade-in text-center group hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="relative mb-3">
                    <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-3 border-primary/20 group-hover:border-primary/40 transition-colors">
                      <img 
                        src={patron.image} 
                        alt={patron.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold leading-tight">{patron.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="section">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Together, we can advance cancer research and support patients and families affected by Non-Hodgkin's Lymphoma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary px-8 py-3">
                  Support Our Research
                </button>
                <button className="border border-primary text-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                  Get Involved
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}