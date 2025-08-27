import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Flame, MessageCircle, Star, BookOpen, Send, Check, Upload, X } from "lucide-react";

interface Tribute {
  id: string;
  name: string;
  message: string;
  type: 'candle' | 'tribute' | 'memory' | 'star' | 'book';
  timestamp: Date;
  photo?: string;
}

interface StarData {
  id: string;
  name: string;
  x: number;
  y: number;
  message: string;
}

export default function StairwayToHeaven() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [tributes, setTributes] = useState<Tribute[]>([
    { id: '1', name: 'Sarah M.', message: 'In loving memory of Mom', type: 'candle', timestamp: new Date() },
    { id: '2', name: 'David K.', message: 'For my brave sister who fought with courage', type: 'tribute', timestamp: new Date() },
    { id: '3', name: 'Emma L.', message: 'Celebrating 5 years cancer-free', type: 'memory', timestamp: new Date() },
  ]);
  const [stars, setStars] = useState<StarData[]>([
    { id: '1', name: 'Michael R.', x: 20, y: 30, message: 'Dad\'s guiding light' },
    { id: '2', name: 'Lisa K.', x: 70, y: 20, message: 'Forever in our hearts' },
    { id: '3', name: 'James T.', x: 40, y: 50, message: 'Strength and hope' },
  ]);
  
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    photo: null as File | null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (type: string) => {
    if (!formData.name || !formData.message) return;
    
    const newTribute: Tribute = {
      id: Date.now().toString(),
      name: formData.name,
      message: formData.message,
      type: type as any,
      timestamp: new Date(),
      photo: formData.photo ? URL.createObjectURL(formData.photo) : undefined
    };
    
    if (type === 'star') {
      const newStar: StarData = {
        id: Date.now().toString(),
        name: formData.name,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        message: formData.message
      };
      setStars(prev => [...prev, newStar]);
    }
    
    setTributes(prev => [newTribute, ...prev]);
    setFormData({ name: '', message: '', photo: null });
    setIsSubmitted(true);
    setActiveModal(null);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'candle': return <Flame className="h-4 w-4" />;
      case 'tribute': return <Heart className="h-4 w-4" />;
      case 'memory': return <MessageCircle className="h-4 w-4" />;
      case 'star': return <Star className="h-4 w-4" />;
      case 'book': return <BookOpen className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'candle': return 'from-orange-200 to-yellow-100 border-orange-200';
      case 'tribute': return 'from-pink-200 to-rose-100 border-pink-200';
      case 'memory': return 'from-blue-200 to-indigo-100 border-blue-200';
      case 'star': return 'from-purple-200 to-indigo-100 border-purple-200';
      case 'book': return 'from-green-200 to-emerald-100 border-green-200';
      default: return 'from-pink-200 to-rose-100 border-pink-200';
    }
  };

  const Modal = ({ type, title, icon }: { type: string; title: string; icon: React.ReactNode }) => (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full shadow-2xl border border-white/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 mr-3">
              {icon}
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              className="mt-1 bg-white/80"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-medium">
              {type === 'candle' && 'Dedication Message'}
              {type === 'tribute' && 'Your Tribute'}
              {type === 'memory' && 'Share Your Memory'}
              {type === 'star' && 'Star Dedication'}
              {type === 'book' && 'Memory Book Entry'}
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Share your message..."
              className="mt-1 min-h-[80px] bg-white/80"
            />
          </div>

          {(type === 'tribute' || type === 'memory') && (
            <div>
              <Label className="text-sm font-medium">Add Photo (Optional)</Label>
              <div className="mt-1 flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-2 pb-2">
                    <Upload className="w-6 h-6 mb-1 text-gray-500" />
                    <p className="text-xs text-gray-500">Click to upload</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.files?.[0] || null }))}
                  />
                </label>
              </div>
              {formData.photo && (
                <p className="text-xs text-gray-600 mt-1">Selected: {formData.photo.name}</p>
              )}
            </div>
          )}

          <Button
            onClick={() => handleSubmit(type)}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            disabled={!formData.name || !formData.message}
          >
            <Send className="mr-2 h-4 w-4" />
            {type === 'candle' && 'Light Candle'}
            {type === 'tribute' && 'Leave Tribute'}
            {type === 'memory' && 'Share Memory'}
            {type === 'star' && 'Dedicate Star'}
            {type === 'book' && 'Add to Book'}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-50 via-white to-purple-50">
        {/* Floating Clouds */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/30 rounded-full blur-xl animate-float"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${Math.random() * 10 + 15}s`
              }}
            />
          ))}
        </div>

        {/* Starfield */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute group cursor-pointer"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
            >
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-200/50">
                <div className="absolute inset-0 bg-yellow-300 rounded-full animate-ping opacity-20"></div>
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <div className="font-medium">{star.name}</div>
                <div className="text-xs opacity-80">{star.message}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Light Rays */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-b from-yellow-200/50 to-transparent"
              style={{
                width: '2px',
                height: '100%',
                left: `${20 + i * 30}%`,
                transform: `rotate(${i * 15 - 15}deg)`,
                transformOrigin: 'top center',
                animation: `pulse ${4 + i}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>
      </div>

      <Navbar />
      
      <main className="flex-1 pt-20 relative z-10">
        {/* Header Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Stairway to Heaven
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                Stairway to Heaven is a space where families and friends can honor loved ones, celebrate survivors, and share messages of support.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Actions */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {[
                { type: 'candle', title: 'Light a Candle', icon: <Flame className="h-8 w-8" />, desc: 'Honor with light' },
                { type: 'tribute', title: 'Leave a Tribute', icon: <Heart className="h-8 w-8" />, desc: 'Share your love' },
                { type: 'memory', title: 'Share a Memory', icon: <MessageCircle className="h-8 w-8" />, desc: 'Cherished moments' },
                { type: 'star', title: 'Dedicate a Star', icon: <Star className="h-8 w-8" />, desc: 'Eternal guidance' },
                { type: 'book', title: 'Memory Book', icon: <BookOpen className="h-8 w-8" />, desc: 'Written remembrance' }
              ].map((action, index) => (
                <div
                  key={action.type}
                  className="group cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setActiveModal(action.type)}
                >
                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-lg border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-white/90">
                    <div className="mb-4 flex justify-center">
                      <div className="p-4 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                        {action.icon}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Message */}
        {isSubmitted && (
          <div className="fixed top-24 right-4 bg-white/95 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-green-200 z-40 animate-fade-in">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">Thank You</p>
                <p className="text-sm text-green-600">Your tribute has been shared</p>
              </div>
            </div>
          </div>
        )}

        {/* Community Wall */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Community Wall
              </h2>
              <p className="text-gray-600">Messages of love, hope, and remembrance</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {tributes.slice(0, 9).map((tribute, index) => (
                <div
                  key={tribute.id}
                  className={`bg-gradient-to-br ${getTypeColor(tribute.type)} backdrop-blur-lg rounded-xl p-4 shadow-lg border hover:shadow-xl transition-all duration-300 animate-fade-in`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start mb-3">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center">
                        {getTypeIcon(tribute.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{tribute.name}</p>
                      <p className="text-xs text-gray-600 capitalize">{tribute.type}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{tribute.message}</p>
                  {tribute.photo && (
                    <div className="mt-3">
                      <img src={tribute.photo} alt="Tribute" className="w-full h-20 object-cover rounded-lg" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Together in Hope</h2>
              <p className="text-gray-600 mb-6">
                Every tribute shared here represents the strength of our community and our commitment to finding a cure.
              </p>
              <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full">
                <a href="/donate">Support Our Research</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Modals */}
      {activeModal && (
        <Modal
          type={activeModal}
          title={
            activeModal === 'candle' ? 'Light a Candle' :
            activeModal === 'tribute' ? 'Leave a Tribute' :
            activeModal === 'memory' ? 'Share a Memory' :
            activeModal === 'star' ? 'Dedicate a Star' :
            'Memory Book Entry'
          }
          icon={
            activeModal === 'candle' ? <Flame className="h-5 w-5" /> :
            activeModal === 'tribute' ? <Heart className="h-5 w-5" /> :
            activeModal === 'memory' ? <MessageCircle className="h-5 w-5" /> :
            activeModal === 'star' ? <Star className="h-5 w-5" /> :
            <BookOpen className="h-5 w-5" />
          }
        />
      )}
      
      <Footer />
    </div>
  );
}