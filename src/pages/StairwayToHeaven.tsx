import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUp, Heart, Users, Star } from "lucide-react";

export default function StairwayToHeaven() {
  const [selectedStep, setSelectedStep] = useState("");
  const [dedicationName, setDedicationName] = useState("");
  const [dedicationMessage, setDedicationMessage] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Handle scroll for parallax effects
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
    );

    // Observe all animated elements
    const elementsToObserve = document.querySelectorAll('[data-animate]');
    elementsToObserve.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleDonate = () => {
    console.log("Donation submitted:", { selectedStep, dedicationName, dedicationMessage });
    // In a real app, this would process the donation
  };

  const isVisible = (id: string) => visibleElements.has(id);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Global parallax stairway background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(236, 72, 153, 0.1) 40px, rgba(236, 72, 153, 0.1) 80px)`,
              transform: `translateY(${scrollY * -0.1}px)`
            }}
          />
        </div>

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background with stairway motif */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50 to-pink-100">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(236, 72, 153, 0.1) 50%, transparent 60%),
                                 linear-gradient(135deg, transparent 40%, rgba(236, 72, 153, 0.1) 50%, transparent 60%)`,
                backgroundSize: '100px 100px',
                transform: `translateY(${scrollY * 0.3}px) translateX(${scrollY * 0.1}px)`
              }}
            />
          </div>
          
          <div className="container relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 
                data-animate
                id="hero-title"
                className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight transition-all duration-1000 ${
                  isVisible('hero-title') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: '0.2s' }}
              >
                Stairway to Heaven
              </h1>
              <p 
                data-animate
                id="hero-subtitle"
                className={`text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
                  isVisible('hero-subtitle') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                Intro text goes here
              </p>
            </div>
          </div>
          
          {/* Animated stairway graphic */}
          <div 
            data-animate
            id="hero-stairway"
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-32 transition-all duration-1500 delay-1000 ${
              isVisible('hero-stairway') 
                ? 'opacity-30 translate-y-0' 
                : 'opacity-0 translate-y-16'
            }`}
          >
            <div className="relative w-full h-full">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-primary/20 rounded"
                  style={{
                    width: `${60 - i * 8}px`,
                    height: '6px',
                    bottom: `${i * 6}px`,
                    left: `${i * 8}px`,
                    animationDelay: `${1.2 + i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-pink-50">
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
                                 radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)`,
                transform: `translateY(${scrollY * 0.2}px)`
              }}
            />
          </div>
          
          <div className="container relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 
                data-animate
                id="why-title"
                className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-1000 ${
                  isVisible('why-title') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                Every step tells a story.
              </h2>
              <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <div 
                  data-animate
                  id="why-divider-1"
                  className={`w-16 h-0.5 bg-primary mx-auto mb-6 transition-all duration-1000 delay-300 ${
                    isVisible('why-divider-1') 
                      ? 'opacity-100 scale-x-100' 
                      : 'opacity-0 scale-x-0'
                  }`}
                />
                <p 
                  data-animate
                  id="why-text-1"
                  className={`transition-all duration-1000 delay-500 ${
                    isVisible('why-text-1') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  Each step on this journey represents hope, memory, and the collective power of community coming together for a greater cause.
                </p>
                <div 
                  data-animate
                  id="why-divider-2"
                  className={`w-16 h-0.5 bg-primary mx-auto my-6 transition-all duration-1000 delay-700 ${
                    isVisible('why-divider-2') 
                      ? 'opacity-100 scale-x-100' 
                      : 'opacity-0 scale-x-0'
                  }`}
                />
                <p 
                  data-animate
                  id="why-text-2"
                  className={`transition-all duration-1000 delay-900 ${
                    isVisible('why-text-2') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  Together, we build a pathway to breakthrough research and life-saving treatments.
                </p>
                <div 
                  data-animate
                  id="why-divider-3"
                  className={`w-16 h-0.5 bg-primary mx-auto my-6 transition-all duration-1000 delay-1100 ${
                    isVisible('why-divider-3') 
                      ? 'opacity-100 scale-x-100' 
                      : 'opacity-0 scale-x-0'
                  }`}
                />
                <p 
                  data-animate
                  id="why-text-3"
                  className={`transition-all duration-1000 delay-1300 ${
                    isVisible('why-text-3') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  Your dedication becomes part of something eternal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dedication / Donation Section */}
        <section className="relative min-h-screen flex items-center justify-center py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-25 to-white">
            <div 
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `linear-gradient(0deg, transparent 30%, rgba(236, 72, 153, 0.1) 50%, transparent 70%)`,
                backgroundSize: '200px 200px',
                transform: `translateY(${scrollY * 0.1}px)`
              }}
            />
          </div>
          
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Content */}
              <div>
                <h2 
                  data-animate
                  id="dedication-title"
                  className={`text-4xl md:text-6xl font-bold mb-8 leading-tight transition-all duration-1000 ${
                    isVisible('dedication-title') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  Dedicate a Step
                </h2>
                <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                  <p 
                    data-animate
                    id="dedication-text-1"
                    className={`transition-all duration-1000 delay-300 ${
                      isVisible('dedication-text-1') 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    Choose a step, write their name, donate.
                  </p>
                  <p 
                    data-animate
                    id="dedication-text-2"
                    className={`transition-all duration-1000 delay-500 ${
                      isVisible('dedication-text-2') 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    Honor someone special while funding breakthrough cancer research that saves lives.
                  </p>
                  <p 
                    data-animate
                    id="dedication-text-3"
                    className={`transition-all duration-1000 delay-700 ${
                      isVisible('dedication-text-3') 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    Every dedication becomes part of our collective journey toward a cure.
                  </p>
                </div>
              </div>
              
              {/* Right side - Donation Form */}
              <div>
                <div className="glass-card p-8 rounded-2xl">
                  <h3 
                    data-animate
                    id="form-title"
                    className={`text-2xl font-bold mb-6 text-center transition-all duration-1000 ${
                      isVisible('form-title') 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    Make Your Dedication
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Step Selection */}
                    <div 
                      data-animate
                      id="step-selection"
                      className={`transition-all duration-1000 delay-300 ${
                        isVisible('step-selection') 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-8'
                      }`}
                    >
                      <Label className="text-base font-medium mb-3 block">Choose Your Step</Label>
                      <Select value={selectedStep} onValueChange={setSelectedStep}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a step tier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bronze">
                            <span className="flex items-center">
                              <span className="w-3 h-3 bg-amber-600 rounded-full mr-2"></span>
                              Bronze Step - £50
                            </span>
                          </SelectItem>
                          <SelectItem value="silver">
                            <span className="flex items-center">
                              <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                              Silver Step - £100
                            </span>
                          </SelectItem>
                          <SelectItem value="gold">
                            <span className="flex items-center">
                              <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                              Gold Step - £250
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Dedication Name */}
                    <div 
                      data-animate
                      id="dedication-name"
                      className={`transition-all duration-1000 delay-500 ${
                        isVisible('dedication-name') 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-8'
                      }`}
                    >
                      <Label htmlFor="dedication-name" className="text-base font-medium mb-3 block">
                        Dedication Name
                      </Label>
                      <Input
                        id="dedication-name"
                        value={dedicationName}
                        onChange={(e) => setDedicationName(e.target.value)}
                        placeholder="In memory of..."
                        className={`w-full transition-all duration-300 ${
                          dedicationName ? 'ring-2 ring-primary/20 shadow-lg' : ''
                        }`}
                      />
                    </div>
                    
                    {/* Dedication Message */}
                    <div 
                      data-animate
                      id="dedication-message"
                      className={`transition-all duration-1000 delay-700 ${
                        isVisible('dedication-message') 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-8'
                      }`}
                    >
                      <Label htmlFor="dedication-message" className="text-base font-medium mb-3 block">
                        Personal Message (Optional)
                      </Label>
                      <Textarea
                        id="dedication-message"
                        value={dedicationMessage}
                        onChange={(e) => setDedicationMessage(e.target.value)}
                        placeholder="Share a memory or message..."
                        className={`w-full min-h-[100px] transition-all duration-300 ${
                          dedicationMessage ? 'ring-2 ring-primary/20 shadow-lg' : ''
                        }`}
                      />
                    </div>
                    
                    <Button
                      data-animate
                      id="donate-button"
                      onClick={handleDonate}
                      className={`w-full btn-primary text-lg py-4 transition-all duration-1000 delay-900 ${
                        isVisible('donate-button') 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-95'
                      } ${
                        selectedStep && dedicationName 
                          ? 'hover:scale-105 shadow-lg hover:shadow-primary/20' 
                          : ''
                      }`}
                      disabled={!selectedStep || !dedicationName}
                    >
                      <Heart className="mr-2 h-5 w-5" />
                      Dedicate Step
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collective Impact Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-pink-100">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(236, 72, 153, 0.05) 50px, rgba(236, 72, 153, 0.05) 100px)`,
                transform: `translateY(${scrollY * 0.15}px)`
              }}
            />
          </div>
          
          <div className="container relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 
                data-animate
                id="collective-title"
                className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-1000 ${
                  isVisible('collective-title') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                Together, we climb higher.
              </h2>
              <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
                <p 
                  data-animate
                  id="collective-text-1"
                  className={`transition-all duration-1000 delay-300 ${
                    isVisible('collective-text-1') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  Each dedication joins thousands of others in our shared journey toward breakthrough treatments.
                </p>
                <p 
                  data-animate
                  id="collective-text-2"
                  className={`transition-all duration-1000 delay-500 ${
                    isVisible('collective-text-2') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  Every name etched on our stairway represents hope, love, and the unwavering belief that together we can conquer cancer.
                </p>
                <p 
                  data-animate
                  id="collective-text-3"
                  className={`transition-all duration-1000 delay-700 ${
                    isVisible('collective-text-3') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  Your step becomes part of something greater than any of us alone.
                </p>
              </div>
              
              {/* Visual placeholder for steps graphic */}
              <div className="glass-card p-12 rounded-2xl max-w-2xl mx-auto">
                <div className="space-y-4">
                  <div 
                    data-animate
                    id="steps-icon"
                    className={`flex items-center justify-center mb-6 transition-all duration-1000 delay-900 ${
                      isVisible('steps-icon') 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-75'
                    }`}
                  >
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <h3 
                    data-animate
                    id="steps-title"
                    className={`text-2xl font-bold mb-4 transition-all duration-1000 delay-1100 ${
                      isVisible('steps-title') 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    Steps with Etched Names
                  </h3>
                  <p 
                    data-animate
                    id="steps-description"
                    className={`text-muted-foreground transition-all duration-1000 delay-1300 ${
                      isVisible('steps-description') 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    Visual placeholder: Interactive stairway graphic showing dedicated steps with names and messages
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {[1, 2, 3, 4, 5, 6].map((step) => (
                      <div 
                        key={step} 
                        data-animate
                        id={`step-${step}`}
                        className={`bg-primary/10 p-4 rounded-lg transition-all duration-1000 ${
                          isVisible(`step-${step}`) 
                            ? 'opacity-100 scale-100 shadow-lg' 
                            : 'opacity-0 scale-75'
                        }`}
                        style={{ 
                          transitionDelay: `${1500 + step * 100}ms`,
                          boxShadow: isVisible(`step-${step}`) ? '0 0 20px rgba(236, 72, 153, 0.2)' : 'none'
                        }}
                      >
                        <Star className={`h-6 w-6 text-primary mx-auto mb-2 transition-all duration-500 ${
                          isVisible(`step-${step}`) ? 'animate-pulse' : ''
                        }`} />
                        <p className="text-sm font-medium">Step {step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-pink-100 via-pink-50 to-white">
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(236, 72, 153, 0.1) 0%, transparent 70%)`,
                transform: `translateY(${scrollY * 0.1}px)`,
                filter: isVisible('final-cta-title') ? 'brightness(1.5)' : 'brightness(1)'
              }}
            />
            {/* Stairway fading upward effect */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, rgba(236, 72, 153, 0.1) 20px, rgba(236, 72, 153, 0.1) 40px, transparent 60px)`,
                transform: `translateY(${scrollY * 0.2}px) scale(1.1)`,
                maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
                filter: isVisible('final-cta-title') ? 'brightness(2)' : 'brightness(1)'
              }}
            />
          </div>
          
          <div className="container relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 
                data-animate
                id="final-cta-title"
                className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight transition-all duration-1500 ${
                  isVisible('final-cta-title') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transform: isVisible('final-cta-title') 
                    ? `translateY(${scrollY * -0.05}px)` 
                    : 'translateY(48px)'
                }}
              >
                Climb With Us.
              </h2>
              <div className="max-w-2xl mx-auto space-y-6 text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
                <p 
                  data-animate
                  id="final-text-1"
                  className={`transition-all duration-1000 delay-500 ${
                    isVisible('final-text-1') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  Honour their memory. Fund the future.
                </p>
                <p 
                  data-animate
                  id="final-text-2"
                  className={`transition-all duration-1000 delay-700 ${
                    isVisible('final-text-2') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  Every step forward brings us closer to a world without cancer.
                </p>
              </div>
              
              <Button 
                data-animate
                id="final-cta-button"
                className={`btn-primary text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-primary/20 transition-all duration-1000 delay-1000 ${
                  isVisible('final-cta-button') 
                    ? 'opacity-100 scale-100 animate-pulse-slow' 
                    : 'opacity-0 scale-75'
                }`}
              >
                <ArrowUp className="mr-3 h-6 w-6" />
                Start Your Journey
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}