import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Flame, MessageCircle, Star, BookOpen, Send, Check, Upload, X, Volume2, VolumeX, Filter } from "lucide-react";

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
  revealed: boolean;
}

interface LightOrb {
  id: string;
  x: number;
  y: number;
  message: string;
  active: boolean;
}

const preSeededMessages = [
  "Hope shines brightest in the darkest moments",
  "Every step forward honors those we love",
  "Together we carry the light of memory",
  "Courage grows stronger when shared",
  "Love transcends all boundaries",
  "In unity, we find healing",
  "Each story matters, each voice counts",
  "Strength flows through connection"
];

const memoryTreeLeaves = [
  { id: '1', name: 'Sarah', message: 'Forever in our hearts', x: 30, y: 25 },
  { id: '2', name: 'Michael', message: 'Your courage inspires us', x: 60, y: 35 },
  { id: '3', name: 'Emma', message: 'Love never fades', x: 45, y: 50 },
  { id: '4', name: 'David', message: 'Celebrating your strength', x: 70, y: 20 },
  { id: '5', name: 'Lisa', message: 'Light in our darkness', x: 25, y: 45 }
];

export default function StairwayToHeaven() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [tributes, setTributes] = useState<Tribute[]>([
    { id: '1', name: 'Sarah M.', message: 'In loving memory of Mom', type: 'candle', timestamp: new Date() },
    { id: '2', name: 'David K.', message: 'For my brave sister who fought with courage', type: 'tribute', timestamp: new Date() },
    { id: '3', name: 'Emma L.', message: 'Celebrating 5 years cancer-free', type: 'memory', timestamp: new Date() },
  ]);
  
  const [stars, setStars] = useState<StarData[]>([
    { id: '1', name: 'Michael R.', x: 20, y: 30, message: 'Dad\'s guiding light', revealed: false },
    { id: '2', name: 'Lisa K.', x: 70, y: 20, message: 'Forever in our hearts', revealed: false },
    { id: '3', name: 'James T.', x: 40, y: 50, message: 'Strength and hope', revealed: false },
    { id: '4', name: 'Anna S.', x: 80, y: 60, message: 'Love transcends all', revealed: false },
    { id: '5', name: 'Robert M.', x: 15, y: 70, message: 'Courage lives on', revealed: false }
  ]);

  const [lightOrbs, setLightOrbs] = useState<LightOrb[]>([]);
  const [driftingMessage, setDriftingMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', message: '', photo: null as File | null });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const messagesRef = useRef(null);
  const constellationRef = useRef(null);
  const memoryTreeRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const messagesInView = useInView(messagesRef, { once: true });
  const constellationInView = useInView(constellationRef, { once: true });
  const memoryTreeInView = useInView(memoryTreeRef, { once: true });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const cloudY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Initialize light orbs
    const orbs = Array.from({ length: 8 }, (_, i) => ({
      id: `orb-${i}`,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      message: preSeededMessages[i],
      active: false
    }));
    setLightOrbs(orbs);
  }, []);

  const handleOrbClick = (orb: LightOrb) => {
    if (driftingMessage) return;
    
    setDriftingMessage(orb.message);
    if (soundEnabled) {
      // Soft chime sound would go here
      console.log('🔔 Soft chime');
    }
    
    setTimeout(() => setDriftingMessage(null), 4000);
  };

  const handleStarClick = (starId: string) => {
    setStars(prev => prev.map(star => 
      star.id === starId ? { ...star, revealed: !star.revealed } : star
    ));
  };

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
    
    setTributes(prev => [newTribute, ...prev]);
    setFormData({ name: '', message: '', photo: null });
    setIsSubmitted(true);
    setActiveModal(null);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const filteredTributes = activeFilter === 'All' 
    ? tributes 
    : tributes.filter(tribute => {
        if (activeFilter === 'Candles') return tribute.type === 'candle';
        if (activeFilter === 'Tributes') return tribute.type === 'tribute';
        if (activeFilter === 'Memories') return tribute.type === 'memory';
        return true;
      });

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full shadow-2xl border border-white/50"
      >
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
            <Label htmlFor="message" className="text-sm font-medium">Your Message</Label>
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
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 bg-gradient-to-b from-blue-50 via-white to-purple-50"
      >
        {/* Floating Clouds */}
        <motion.div style={{ y: cloudY }} className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/20 rounded-full blur-xl"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Light Rays */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-b from-yellow-200/30 to-transparent"
              style={{
                width: '2px',
                height: '100%',
                left: `${20 + i * 30}%`,
                transform: `rotate(${i * 15 - 15}deg)`,
                transformOrigin: 'top center',
              }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>

      <Navbar />
      
      <main className="flex-1 pt-20 relative z-10">
        {/* 1. Hero Section */}
        <motion.section 
          ref={heroRef}
          className="py-16 relative"
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ y: 30, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Stairway to Heaven
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-700 leading-relaxed mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Stairway to Heaven is a space where families and friends can honor loved ones, celebrate survivors, and share messages of support.
              </motion.p>

              {/* Primary CTAs */}
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {[
                  { type: 'candle', title: 'Light a Candle', icon: <Flame className="h-5 w-5" /> },
                  { type: 'tribute', title: 'Leave a Tribute', icon: <Heart className="h-5 w-5" /> },
                  { type: 'memory', title: 'Share a Memory', icon: <MessageCircle className="h-5 w-5" /> }
                ].map((action, index) => (
                  <motion.button
                    key={action.type}
                    onClick={() => setActiveModal(action.type)}
                    className="group bg-white/80 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 flex items-center"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={heroInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="mr-2 group-hover:animate-pulse">
                      {action.icon}
                    </div>
                    {action.title}
                  </motion.button>
                ))}
              </motion.div>

              {/* Secondary CTA */}
              <motion.button
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                onClick={() => document.getElementById('memory-tree')?.scrollIntoView({ behavior: 'smooth' })}
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Explore the Memory Tree ↓
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* 2. Messages of Light */}
        <motion.section 
          ref={messagesRef}
          className="py-20 relative min-h-screen flex items-center"
          initial={{ opacity: 0 }}
          animate={messagesInView ? { opacity: 1 } : {}}
        >
          <div className="container">
            <motion.div 
              className="text-center mb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={messagesInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Messages of Light
              </h2>
              <p className="text-gray-600">Tap the glowing orbs to reveal messages of hope</p>
              
              {/* Sound Toggle */}
              <motion.button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="mt-4 p-2 rounded-full bg-white/50 hover:bg-white/70 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </motion.button>
            </motion.div>

            {/* Light Orbs */}
            <div className="relative h-96">
              {lightOrbs.map((orb, index) => (
                <motion.div
                  key={orb.id}
                  className="absolute cursor-pointer"
                  style={{ left: `${orb.x}%`, top: `${orb.y}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={messagesInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleOrbClick(orb)}
                >
                  <motion.div
                    className="w-6 h-6 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-full shadow-lg"
                    animate={{
                      boxShadow: [
                        '0 0 10px rgba(255, 255, 0, 0.3)',
                        '0 0 20px rgba(255, 255, 0, 0.6)',
                        '0 0 10px rgba(255, 255, 0, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              ))}

              {/* Drifting Message */}
              <AnimatePresence>
                {driftingMessage && (
                  <motion.div
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/90 backdrop-blur-lg rounded-lg px-6 py-3 shadow-lg border border-white/50 text-center max-w-md"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 'calc(100vw + 100px)', opacity: [0, 1, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 4, ease: "linear" }}
                  >
                    <p className="text-gray-800 font-medium">{driftingMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        {/* 3. Constellation of Hope */}
        <motion.section 
          ref={constellationRef}
          className="py-20 bg-gradient-to-b from-transparent to-blue-50/30 relative min-h-screen flex items-center"
          initial={{ opacity: 0 }}
          animate={constellationInView ? { opacity: 1 } : {}}
        >
          <div className="container">
            <motion.div 
              className="text-center mb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={constellationInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Constellation of Hope
              </h2>
              <div className="inline-block bg-white/80 backdrop-blur-lg rounded-lg px-4 py-2 shadow-lg border border-white/50">
                <p className="text-gray-600 text-sm">Tap stars to reveal messages</p>
              </div>
            </motion.div>

            {/* Starfield */}
            <div className="relative h-96">
              {stars.map((star, index) => (
                <motion.div
                  key={star.id}
                  className="absolute cursor-pointer group"
                  style={{ left: `${star.x}%`, top: `${star.y}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={constellationInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => handleStarClick(star.id)}
                >
                  <motion.div
                    className="w-4 h-4 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    whileHover={{ scale: 1.5 }}
                  />
                  
                  <AnimatePresence>
                    {star.revealed && (
                      <motion.div
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-xs rounded whitespace-nowrap"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <div className="font-medium">{star.name}</div>
                        <div className="opacity-80">{star.message}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {stars.filter(star => star.revealed).map((star, index, revealedStars) => 
                  revealedStars.slice(index + 1).map(nextStar => (
                    <motion.line
                      key={`${star.id}-${nextStar.id}`}
                      x1={`${star.x}%`}
                      y1={`${star.y}%`}
                      x2={`${nextStar.x}%`}
                      y2={`${nextStar.y}%`}
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ pathLength: 0, opacity: 0 }}
                      transition={{ duration: 1 }}
                    />
                  ))
                )}
              </svg>
            </div>
          </div>
        </motion.section>

        {/* 4. Memory Tree Preview */}
        <motion.section 
          id="memory-tree"
          ref={memoryTreeRef}
          className="py-20 relative"
          initial={{ opacity: 0 }}
          animate={memoryTreeInView ? { opacity: 1 } : {}}
        >
          <div className="container">
            <motion.div 
              className="text-center mb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={memoryTreeInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Memory Tree
              </h2>
              <p className="text-gray-600">A living tribute to those we remember</p>
            </motion.div>

            {/* Animated Tree */}
            <div className="relative max-w-md mx-auto mb-12">
              <motion.svg
                viewBox="0 0 200 300"
                className="w-full h-80"
                initial={{ opacity: 0 }}
                animate={memoryTreeInView ? { opacity: 1 } : {}}
                transition={{ duration: 1 }}
              >
                {/* Tree Trunk */}
                <motion.rect
                  x="90"
                  y="200"
                  width="20"
                  height="100"
                  fill="#8B4513"
                  initial={{ scaleY: 0 }}
                  animate={memoryTreeInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ transformOrigin: 'bottom' }}
                />
                
                {/* Tree Crown */}
                <motion.circle
                  cx="100"
                  cy="150"
                  r="80"
                  fill="url(#treeGradient)"
                  initial={{ scale: 0 }}
                  animate={memoryTreeInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                
                <defs>
                  <radialGradient id="treeGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#90EE90" />
                    <stop offset="100%" stopColor="#228B22" />
                  </radialGradient>
                </defs>
              </motion.svg>

              {/* Memory Leaves */}
              {memoryTreeLeaves.map((leaf, index) => (
                <motion.div
                  key={leaf.id}
                  className="absolute cursor-pointer group"
                  style={{ 
                    left: `${leaf.x}%`, 
                    top: `${leaf.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={memoryTreeInView ? { 
                    scale: 1, 
                    opacity: 1,
                    y: [0, -3, 0]
                  } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.8 + index * 0.1,
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <motion.div
                    className="bg-gradient-to-r from-green-200 to-green-300 rounded-full px-3 py-1 shadow-lg border border-green-200 text-xs font-medium"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    {leaf.name}
                  </motion.div>
                  
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {leaf.message}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={memoryTreeInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-full">
                View the Memory Tree
              </Button>
              <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 px-8 py-3 rounded-full">
                Add a Name
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* 5. Community Wall */}
        <section className="py-20 bg-gradient-to-b from-blue-50/30 to-purple-50/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Community Wall
              </h2>
              
              {/* Filter Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                {['All', 'Candles', 'Tributes', 'Memories'].map((filter) => (
                  <motion.button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeFilter === filter
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white/80 text-gray-600 hover:bg-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Filter className="h-3 w-3 mr-1 inline" />
                    {filter}
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              <AnimatePresence>
                {filteredTributes.slice(0, 9).map((tribute, index) => (
                  <motion.div
                    key={tribute.id}
                    className={`bg-gradient-to-br ${getTypeColor(tribute.type)} backdrop-blur-lg rounded-xl p-4 shadow-lg border hover:shadow-xl transition-all duration-300`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -2, scale: 1.02 }}
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
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Success Message */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              className="fixed top-24 right-4 bg-white/95 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-green-200 z-40"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-800">Thank You</p>
                  <p className="text-sm text-green-600">Your tribute has been shared</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <Modal
            type={activeModal}
            title={
              activeModal === 'candle' ? 'Light a Candle' :
              activeModal === 'tribute' ? 'Leave a Tribute' :
              'Share a Memory'
            }
            icon={
              activeModal === 'candle' ? <Flame className="h-5 w-5" /> :
              activeModal === 'tribute' ? <Heart className="h-5 w-5" /> :
              <MessageCircle className="h-5 w-5" />
            }
          />
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}