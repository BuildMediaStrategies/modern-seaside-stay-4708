import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const leadershipTeam = [
  {
    name: "Sandra Hamilton",
    role: "Founder, Chairman & Trustee",
    description: "Leading the charge in cancer research funding and community engagement."
  },
  {
    name: "Bhavti Parmar",
    role: "Coordinator",
    description: "Coordinating our research initiatives and community outreach programs."
  },
  {
    name: "Julia Selt",
    role: "Coordinator",
    description: "Managing fundraising activities and donor relations."
  },
  {
    name: "Julian Margolin MBE",
    role: "Trustee",
    description: "Providing strategic guidance and governance oversight."
  },
  {
    name: "Natasha Hamilton",
    role: "Secretary & Trustee",
    description: "Managing organizational affairs and trustee responsibilities."
  },
  {
    name: "Professor Gert Attard",
    role: "Head of the UCL Cancer Institute",
    description: "Leading cancer research excellence at UCL Cancer Institute."
  },
  {
    name: "Siamack Bagheri",
    role: "Trustee",
    description: "Contributing expertise in strategic planning and development."
  },
  {
    name: "Stephen Sampson (FCA)",
    role: "Treasurer & Trustee",
    description: "Managing financial oversight and ensuring fiscal responsibility."
  },
  {
    name: "Joshua Johnson",
    role: "Web Development & DevOps Engineer",
    description: "Maintaining our digital presence and technical infrastructure."
  }
];

const patronsAndSupporters = [
  { name: "Professor A. Virchis" },
  { name: "Professor Anthony H. Goldstone (UCL)" },
  { name: "David King" },
  { name: "Rachel Stevens" },
  { name: "Amy Childs" }
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
                Meet the People Behind CureCancer UCL
              </p>
              <p className="text-muted-foreground mt-4">
                We're powered by a dedicated group of professionals, researchers, and volunteers committed to supporting cancer research through direct action and community-driven fundraising.
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
            <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadershipTeam.map((member, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-xl animate-fade-in text-center"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Patrons & Supporters */}
        <section className="section bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Patrons & Supporters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {patronsAndSupporters.map((patron, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-xl animate-fade-in text-center"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <h3 className="text-lg font-semibold">{patron.name}</h3>
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