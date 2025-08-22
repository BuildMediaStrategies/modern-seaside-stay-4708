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

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Handle scroll for parallax effects
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDonate = () => {
    console.log("Donation submitted:", { selectedStep, dedicationName, dedicationMessage });
    // In a real app, this would process the donation
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
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
                transform: `translateY(${scrollY * 0.3}px)`
              }}
            />
          </div>
          
          <div className="container relative z-10 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                Stairway to Heaven
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Intro text goes here
              </p>
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
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                Every step tells a story.
              </h2>
              <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>
                  Each step on this journey represents hope, memory, and the collective power of community coming together for a greater cause.
                </p>
                <p>
                  Together, we build a pathway to breakthrough research and life-saving treatments.
                </p>
                <p>
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
              <div className="animate-fade-in">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                  Dedicate a Step
                </h2>
                <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                  <p>
                    Choose a step, write their name, donate.
                  </p>
                  <p>
                    Honor someone special while funding breakthrough cancer research that saves lives.
                  </p>
                  <p>
                    Every dedication becomes part of our collective journey toward a cure.
                  </p>
                </div>
              </div>
              
              {/* Right side - Donation Form */}
              <div className="animate-fade-in [animation-delay:200ms]">
                <div className="glass-card p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-6 text-center">Make Your Dedication</h3>
                  
                  <div className="space-y-6">
                    {/* Step Selection */}
                    <div>
                      <Label className="text-base font-medium mb-3 block">Choose Your Step</Label>
                      <Select value={selectedStep} onValueChange={setSelectedStep}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a step tier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bronze">Bronze Step - £50</SelectItem>
                          <SelectItem value="silver">Silver Step - £100</SelectItem>
                          <SelectItem value="gold">Gold Step - £250</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Dedication Name */}
                    <div>
                      <Label htmlFor="dedication-name" className="text-base font-medium mb-3 block">
                        Dedication Name
                      </Label>
                      <Input
                        id="dedication-name"
                        value={dedicationName}
                        onChange={(e) => setDedicationName(e.target.value)}
                        placeholder="In memory of..."
                        className="w-full"
                      />
                    </div>
                    
                    {/* Dedication Message */}
                    <div>
                      <Label htmlFor="dedication-message" className="text-base font-medium mb-3 block">
                        Personal Message (Optional)
                      </Label>
                      <Textarea
                        id="dedication-message"
                        value={dedicationMessage}
                        onChange={(e) => setDedicationMessage(e.target.value)}
                        placeholder="Share a memory or message..."
                        className="w-full min-h-[100px]"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleDonate}
                      className="w-full btn-primary text-lg py-4"
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
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                Together, we climb higher.
              </h2>
              <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
                <p>
                  Each dedication joins thousands of others in our shared journey toward breakthrough treatments.
                </p>
                <p>
                  Every name etched on our stairway represents hope, love, and the unwavering belief that together we can conquer cancer.
                </p>
                <p>
                  Your step becomes part of something greater than any of us alone.
                </p>
              </div>
              
              {/* Visual placeholder for steps graphic */}
              <div className="glass-card p-12 rounded-2xl max-w-2xl mx-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-center mb-6">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Steps with Etched Names</h3>
                  <p className="text-muted-foreground">
                    Visual placeholder: Interactive stairway graphic showing dedicated steps with names and messages
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {[1, 2, 3, 4, 5, 6].map((step) => (
                      <div key={step} className="bg-primary/10 p-4 rounded-lg">
                        <Star className="h-6 w-6 text-primary mx-auto mb-2" />
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
                transform: `translateY(${scrollY * 0.1}px)`
              }}
            />
            {/* Stairway fading upward effect */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, rgba(236, 72, 153, 0.1) 20px, rgba(236, 72, 153, 0.1) 40px, transparent 60px)`,
                transform: `translateY(${scrollY * 0.2}px) scale(1.1)`,
                maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)'
              }}
            />
          </div>
          
          <div className="container relative z-10 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                Climb With Us.
              </h2>
              <div className="max-w-2xl mx-auto space-y-6 text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
                <p>
                  Honour their memory. Fund the future.
                </p>
                <p>
                  Every step forward brings us closer to a world without cancer.
                </p>
              </div>
              
              <Button className="btn-primary text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-primary/20 transition-all duration-300">
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