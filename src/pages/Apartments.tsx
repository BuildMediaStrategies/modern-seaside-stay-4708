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
            <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
              <p className="text-lg text-muted-foreground mb-4">
                UCL is consistently ranked among the world's top universities. The UCL Cancer Institute, established in 2007, serves as the central hub for cancer research with over 400 scientists.
              </p>
              <p className="text-lg text-muted-foreground">
                Located in central London as part of UCL's Faculty of Medical Sciences.
              </p>
            </div>
          </div>
        </section>

        {/* Research Strengths */}
        <section className="section bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Research Strengths</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-3">
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Stem cell biology
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Transcription factors
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Cell cycle regulation
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Translational immunology
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Genomics & bioinformatics
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Chromatin regulation
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Gene therapy & immunotherapy
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Viral oncology
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Drug development
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Clinical trials
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Collaborations */}
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Collaborations</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Strong partnerships with UCLH, Royal Free Hospital, and Great Ormond Street Hospital.
              </p>
              <p className="text-lg text-muted-foreground">
                UCH Macmillan Cancer Centre (2012) sits directly across the street, enabling seamless research-clinical collaboration.
              </p>
            </div>
          </div>
        </section>

        {/* Looking Ahead */}
        <section className="section bg-primary/5">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Looking Ahead</h2>
              <p className="text-lg text-muted-foreground mb-4">
                The Institute leads advances in targeted therapies and personalised medicine through genomic sequencing and sophisticated diagnostics.
              </p>
              <p className="text-lg text-muted-foreground">
                With access to the UK's first hospital-based proton therapy center, we continue transforming cancer treatment.
              </p>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}