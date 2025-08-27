import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Candy as Candle, MessageCircle, Star, Send, Check } from "lucide-react";

interface Tribute {
  id: string;
  name: string;
  message: string;
  type: 'memory' | 'support' | 'honor';
  timestamp: Date;
}

interface Candle {
  id: string;
  name: string;
  message: string;
  lit: boolean;
}

export default function StairwayToHeaven() {
  const [activeTab, setActiveTab] = useState<'candle' | 'tribute' | 'memory'>('candle');
  const [candles, setCandles] = useState<Candle[]>([
    { id: '1', name: 'Sarah M.', message: 'In loving memory of Mom', lit: true },
    { id: '2', name: 'David K.', message: 'For my brave sister', lit: true },
    { id: '3', name: 'Emma L.', message: 'Celebrating 5 years cancer-free', lit: true },
  ]);
  const [tributes, setTributes] = useState<Tribute[]>([
    { id: '1', name: 'Anonymous', message: 'Thank you for giving us hope during the darkest times.', type: 'support', timestamp: new Date() },
    { id: '2', name: 'Michael R.', message: 'Dad fought bravely for 3 years. His strength inspires us daily.', type: 'honor', timestamp: new Date() },
  ]);
  
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    tributeType: 'memory' as 'memory' | 'support' | 'honor'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLightCandle = () => {
    if (!formData.name || !formData.message) return;
    
    const newCandle: Candle = {
      id: Date.now().toString(),
      name: formData.name,
      message: formData.message,
      lit: true
    };
    
    setCandles(prev => [newCandle, ...prev]);
    setFormData({ name: '', message: '', tributeType: 'memory' });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleLeaveTribute = () => {
    if (!formData.name || !formData.message) return;
    
    const newTribute: Tribute = {
      id: Date.now().toString(),
      name: formData.name,
      message: formData.message,
      type: formData.tributeType,
      timestamp: new Date()
    };
    
    setTributes(prev => [newTribute, ...prev]);
    setFormData({ name: '', message: '', tributeType: 'memory' });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const getTributeIcon = (type: string) => {
    switch (type) {
      case 'memory': return <Heart className="h-4 w-4" />;
      case 'support': return <MessageCircle className="h-4 w-4" />;
      case 'honor': return <Star className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const getTributeColor = (type: string) => {
    switch (type) {
      case 'memory': return 'text-pink-600 bg-pink-50';
      case 'support': return 'text-blue-600 bg-blue-50';
      case 'honor': return 'text-purple-600 bg-purple-50';
      default: return 'text-pink-600 bg-pink-50';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50/30 to-white">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
                Stairway to Heaven
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stairway to Heaven is a space where families and friends can honor loved ones, celebrate survivors, and share messages of support. Light a candle, leave a tribute, or share a cherished memory.
              </p>
            </div>
          </div>
          
          {/* Soft decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-pink-300 blur-3xl" />
          </div>
        </section>

        {/* Interactive Tabs */}
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {/* Tab Navigation */}
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-full p-1 shadow-lg border">
                  <button
                    onClick={() => setActiveTab('candle')}
                    className={`px-6 py-3 rounded-full font-medium transition-all flex items-center ${
                      activeTab === 'candle' 
                        ? 'bg-primary text-white shadow-md' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <Candle className="h-4 w-4 mr-2" />
                    Light a Candle
                  </button>
                  <button
                    onClick={() => setActiveTab('tribute')}
                    className={`px-6 py-3 rounded-full font-medium transition-all flex items-center ${
                      activeTab === 'tribute' 
                        ? 'bg-primary text-white shadow-md' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Leave a Tribute
                  </button>
                  <button
                    onClick={() => setActiveTab('memory')}
                    className={`px-6 py-3 rounded-full font-medium transition-all flex items-center ${
                      activeTab === 'memory' 
                        ? 'bg-primary text-white shadow-md' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Share a Memory
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="glass-card p-6 rounded-2xl">
                  {!isSubmitted ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          {activeTab === 'candle' && <><Candle className="h-5 w-5 mr-2 text-primary" /> Light a Candle</>}
                          {activeTab === 'tribute' && <><Heart className="h-5 w-5 mr-2 text-primary" /> Leave a Tribute</>}
                          {activeTab === 'memory' && <><MessageCircle className="h-5 w-5 mr-2 text-primary" /> Share a Memory</>}
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter your name"
                            className="mt-1"
                          />
                        </div>

                        {activeTab === 'tribute' && (
                          <div>
                            <Label className="text-sm font-medium">Tribute Type</Label>
                            <div className="flex gap-2 mt-2">
                              {[
                                { value: 'memory', label: 'In Memory', icon: <Heart className="h-4 w-4" /> },
                                { value: 'support', label: 'Support', icon: <MessageCircle className="h-4 w-4" /> },
                                { value: 'honor', label: 'Honor', icon: <Star className="h-4 w-4" /> }
                              ].map((type) => (
                                <button
                                  key={type.value}
                                  onClick={() => setFormData(prev => ({ ...prev, tributeType: type.value as any }))}
                                  className={`flex items-center px-3 py-2 rounded-lg border transition-colors ${
                                    formData.tributeType === type.value
                                      ? 'border-primary bg-primary/10 text-primary'
                                      : 'border-border hover:border-primary/50'
                                  }`}
                                >
                                  {type.icon}
                                  <span className="ml-1 text-sm">{type.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <Label htmlFor="message" className="text-sm font-medium">
                            {activeTab === 'candle' && 'Dedication Message'}
                            {activeTab === 'tribute' && 'Your Tribute'}
                            {activeTab === 'memory' && 'Share Your Memory'}
                          </Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            placeholder={
                              activeTab === 'candle' ? 'In loving memory of...' :
                              activeTab === 'tribute' ? 'Share your tribute...' :
                              'Share a cherished memory...'
                            }
                            className="mt-1 min-h-[100px]"
                          />
                        </div>

                        <Button
                          onClick={activeTab === 'candle' ? handleLightCandle : handleLeaveTribute}
                          className="w-full btn-primary"
                          disabled={!formData.name || !formData.message}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          {activeTab === 'candle' && 'Light Candle'}
                          {activeTab === 'tribute' && 'Leave Tribute'}
                          {activeTab === 'memory' && 'Share Memory'}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Thank You</h3>
                      <p className="text-muted-foreground">
                        Your {activeTab === 'candle' ? 'candle has been lit' : 
                             activeTab === 'tribute' ? 'tribute has been shared' : 
                             'memory has been added'}.
                      </p>
                    </div>
                  )}
                </div>

                {/* Display Section */}
                <div className="space-y-4">
                  {activeTab === 'candle' && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Candle className="h-5 w-5 mr-2 text-primary" />
                        Lit Candles ({candles.length})
                      </h3>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {candles.map((candle) => (
                          <div key={candle.id} className="bg-white/50 p-4 rounded-lg border border-primary/20">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mr-3">
                                <div className="w-8 h-8 bg-gradient-to-t from-yellow-400 to-orange-300 rounded-full flex items-center justify-center">
                                  <div className="w-3 h-4 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full animate-pulse"></div>
                                </div>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{candle.name}</p>
                                <p className="text-muted-foreground text-sm mt-1">{candle.message}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(activeTab === 'tribute' || activeTab === 'memory') && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-primary" />
                        Tributes & Memories ({tributes.length})
                      </h3>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {tributes.map((tribute) => (
                          <div key={tribute.id} className="bg-white/50 p-4 rounded-lg border border-primary/20">
                            <div className="flex items-start">
                              <div className={`flex-shrink-0 mr-3 p-1.5 rounded-full ${getTributeColor(tribute.type)}`}>
                                {getTributeIcon(tribute.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="font-medium text-sm">{tribute.name}</p>
                                  <span className={`text-xs px-2 py-1 rounded-full ${getTributeColor(tribute.type)}`}>
                                    {tribute.type}
                                  </span>
                                </div>
                                <p className="text-muted-foreground text-sm">{tribute.message}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section bg-gradient-to-r from-primary/5 to-pink-50/50">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Together in Hope</h2>
              <p className="text-muted-foreground mb-6">
                Every tribute, memory, and candle lit here represents the strength of our community and our shared commitment to finding a cure.
              </p>
              <Button asChild className="btn-primary">
                <a href="/donate">Support Our Research</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}