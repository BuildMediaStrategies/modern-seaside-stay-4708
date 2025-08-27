import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Users, MapPin, Building, Microscope, Heart, Star, Trophy, Target, Zap } from "lucide-react";

const achievements = [
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Top 10 Global University",
    description: "UCL consistently ranked among world's leading institutions"
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "400+ Cancer Scientists",
    description: "Largest concentration of cancer expertise in Europe"
  },
  {
    icon: <Building className="h-8 w-8 text-primary" />,
    title: "Established 2007",
    description: "Central hub for UCL's cancer research activities"
  },
  {
    icon: <Microscope className="h-8 w-8 text-primary" />,
    title: "Research Excellence",
    description: "Leading breakthrough discoveries in cancer treatment"
  }
];

const researchAreas = [
  { name: "Stem Cell Biology", icon: <Zap className="h-5 w-5" /> },
  { name: "Transcription Factors", icon: <Target className="h-5 w-5" /> },
  { name: "Cell Cycle Regulation", icon: <Microscope className="h-5 w-5" /> },
  { name: "Translational Immunology", icon: <Heart className="h-5 w-5" /> },
  { name: "Genomics & Bioinformatics", icon: <Star className="h-5 w-5" /> },
  { name: "Chromatin Regulation", icon: <Trophy className="h-5 w-5" /> },
  { name: "Gene Therapy & Immunotherapy", icon: <Zap className="h-5 w-5" /> },
  { name: "Viral Oncology", icon: <Target className="h-5 w-5" /> },
  { name: "Drug Development", icon: <Microscope className="h-5 w-5" /> },
  { name: "Clinical Trials", icon: <Heart className="h-5 w-5" /> }
];

const partnerships = [
  {
    name: "University College London Hospitals (UCLH)",
    description: "Primary clinical partner for translational research",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
  },
  {
    name: "Royal Free Hospital",
    description: "Collaborative research and patient care programs",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
  },
  {
    name: "Great Ormond Street Hospital",
    description: "Pediatric cancer research and treatment excellence",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop"
  }
];

export default function Apartments() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary/10 via-white to-primary/5 overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
                UCL Cancer Institute
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                World-class cancer research at the heart of London's medical district
              </p>
              <div className="inline-flex items-center bg-primary/10 rounded-full px-6 py-3">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <span className="text-primary font-medium">Central London • Faculty of Medical Sciences</span>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-primary/30 blur-3xl" />
          </div>
        </section>

        {/* Institute Overview */}
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Leading Cancer Research Excellence</h2>
              <p className="text-lg text-muted-foreground mb-8">
                UCL is consistently ranked among the world's top universities. The UCL Cancer Institute, established in 2007, 
                serves as the central hub for cancer research at UCL with over 400 scientists dedicated to understanding and treating cancer.
              </p>
              <p className="text-lg text-muted-foreground">
                Located in central London as part of UCL's Faculty of Medical Sciences, the Institute represents one of the 
                largest concentrations of cancer research expertise in Europe.
              </p>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="section bg-primary/5">
          <div className="container">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Recognition & Excellence</h2>
              <p className="text-muted-foreground">Celebrating our achievements in cancer research and education</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-xl text-center animate-fade-in border-2 border-primary/10 hover:border-primary/30 transition-all duration-300"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary inline-flex">
                    {achievement.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-primary">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Research Strengths</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our multidisciplinary approach spans fundamental research to clinical applications
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {researchAreas.map((area, index) => (
                <div 
                  key={index} 
                  className="glass-card p-4 rounded-lg text-center animate-fade-in hover:bg-primary/5 transition-all duration-300 border border-primary/10"
                  style={{ animationDelay: `${(index + 1) * 50}ms` }}
                >
                  <div className="text-primary mb-2 flex justify-center">
                    {area.icon}
                  </div>
                  <h3 className="text-sm font-medium text-foreground">{area.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Research Gallery */}
        <section className="section bg-muted">
          <div className="container">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Research in Action</h2>
              <p className="text-muted-foreground">Cutting-edge facilities where breakthrough discoveries happen</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div 
                  key={index} 
                  className="aspect-square rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in border-4 border-white"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <img 
                    src={`https://images.unsplash.com/photo-${1580000000000 + index * 100000}?w=400&h=400&fit=crop`}
                    alt={`Research facility ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hospital Partnerships */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Clinical Partnerships</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Strong collaborations with leading hospitals accelerate the translation of research into patient care
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {partnerships.map((partner, index) => (
                <div 
                  key={index} 
                  className="glass-card rounded-xl overflow-hidden animate-fade-in border-2 border-primary/10 hover:border-primary/30 transition-all duration-300"
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="h-48 relative">
                    <img 
                      src={partner.image} 
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-primary">{partner.name}</h3>
                    <p className="text-muted-foreground text-sm">{partner.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="glass-card p-8 rounded-xl bg-primary/5 border-2 border-primary/20 animate-fade-in [animation-delay:800ms]">
              <div className="text-center">
                <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-primary">UCH Macmillan Cancer Centre</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Opened in 2012 directly across from the Institute, this state-of-the-art facility enables seamless 
                  collaboration between researchers and clinicians, accelerating the translation of laboratory discoveries into patient treatments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="section bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">The Future of Cancer Research</h2>
              <p className="text-lg text-muted-foreground mb-8">
                The UCL Cancer Institute stands at the forefront of an exciting era in cancer research, driving progress in 
                targeted therapies that attack specific cancer vulnerabilities and advancing personalized medicine through 
                genomic sequencing and sophisticated diagnostics.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                With access to cutting-edge facilities including the UK's first hospital-based proton therapy center, 
                the Institute continues to lead the global effort to transform cancer from a fatal disease into a manageable condition.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
                {[
                  { title: "Targeted Therapies", icon: <Target className="h-8 w-8" /> },
                  { title: "Personalized Medicine", icon: <Heart className="h-8 w-8" /> },
                  { title: "Advanced Diagnostics", icon: <Microscope className="h-8 w-8" /> },
                  { title: "Proton Therapy", icon: <Zap className="h-8 w-8" /> }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="glass-card p-6 rounded-xl text-center border-2 border-primary/20 hover:border-primary/40 transition-all duration-300"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <div className="text-primary mb-3 flex justify-center">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-primary">{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}