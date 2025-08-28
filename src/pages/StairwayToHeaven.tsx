import { useState, useEffect, useRef, useCallback } from "react";
import { useMemo } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ArrowLeft, 
  Send, 
  Check,
  Filter,
  X,
  Volume2,
  VolumeX,
  Flame,
  Heart,
  MessageCircle,
  Upload,
  Image as ImageIcon
} from "lucide-react";

interface Tribute {
  id: string;
  name: string;
  message: string;
  photo?: string;
  type: 'candle' | 'tribute' | 'memory';
  timestamp: Date;
}

interface ConstellationNode {
  id: string;
  name: string;
  x: number;
  y: number;
  message: string;
  revealed: boolean;
  groupId: number;
}

interface LightOrb {
  id: string;
  x: number;
  y: number;
  message: string;
}

const preSeededMessages = [
  "Hope guides us through difficult times",
  "Every step forward honors those we love",
  "Together we carry the light of memory",
  "Courage grows stronger when shared",
  "Love transcends all boundaries",
  "In unity, we find healing",
  "Each story matters, each voice counts",
  "Strength flows through connection",
  "Research brings us closer to answers",
  "Support creates lasting change",
  "Your contribution makes a difference",
  "Science and compassion work together",
  "Progress happens one discovery at a time",
  "Community support sustains hope",
  "Innovation leads to better outcomes",
  "Together we advance understanding",
  "Knowledge empowers healing",
  "Research transforms lives",
  "Hope drives scientific progress",
  "Unity strengthens our mission"
];

// Shape path definitions
const shapePaths = {
  ribbon: "M 540,80 C 660,80 740,170 740,260 C 740,360 650,420 560,470 L 665,590 M 540,80 C 420,80 340,170 340,260 C 340,360 430,420 520,470 L 415,590",
  infinity: "M 200,300 C 200,200 350,150 450,300 C 550,450 700,450 800,300 C 700,150 550,150 450,300 C 350,450 200,450 200,300 Z",
  heart: "M 500,200 C 500,120 620,80 680,160 C 740,240 660,340 500,420 C 340,340 260,240 320,160 C 380,80 500,120 500,200 Z"
};

export default function StairwayToHeaven() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedShape, setSelectedShape] = useState<'ribbon' | 'infinity' | 'heart'>('ribbon');
  const [driftingMessage, setDriftingMessage] = useState<{ text: string; id: string } | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [tributes, setTributes] = useState<Tribute[]>([
    { id: '1', name: 'Sarah M.', message: 'In loving memory of Mom', type: 'candle', timestamp: new Date() },
    { id: '2', name: 'David K.', message: 'For my brave sister', type: 'tribute', timestamp: new Date() },
    { id: '3', name: 'Emma L.', message: 'Celebrating 5 years cancer-free', type: 'memory', timestamp: new Date() },
    { id: '4', name: 'Michael R.', message: 'Dad\'s guiding light', type: 'candle', timestamp: new Date() },
    { id: '5', name: 'Lisa T.', message: 'Forever in our hearts', type: 'tribute', timestamp: new Date() },
    { id: '6', name: 'James W.', message: 'Strength through unity', type: 'memory', timestamp: new Date() }
  ]);
  
  const [formData, setFormData] = useState({ name: '', message: '', photo: null as File | null });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const messagesRef = useRef(null);
  const constellationRef = useRef(null);
  const tributesRef = useRef(null);
  const memoryTreeRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const messagesInView = useInView(messagesRef, { once: true });
  const constellationInView = useInView(constellationRef, { once: true });
  const tributesInView = useInView(tributesRef, { once: true });
  const memoryTreeInView = useInView(memoryTreeRef, { once: true });
  const shouldReduceMotion = useReducedMotion();

  // Get responsive star count
  const getStarCount = () => {
    if (typeof window === 'undefined') return 80;
    const width = window.innerWidth;
    if (width < 768) return 56; // mobile
    if (width < 1024) return 80; // tablet
    return 120; // desktop
  };

  // Sample points along SVG path
  const samplePathPoints = (pathData: string, count: number) => {
    if (typeof document === 'undefined') return [];
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    svg.appendChild(path);
    document.body.appendChild(svg);
    
    const totalLength = path.getTotalLength();
    const points = [];
    
    for (let i = 0; i < count; i++) {
      const distance = (i / count) * totalLength;
      const point = path.getPointAtLength(distance);
      
      // Add perpendicular jitter for band effect
      const nextPoint = path.getPointAtLength(Math.min(distance + 1, totalLength));
      const dx = nextPoint.x - point.x;
      const dy = nextPoint.y - point.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      
      if (length > 0) {
        const normalX = -dy / length;
        const normalY = dx / length;
        const jitterAmount = window.innerWidth < 768 ? 6 : 10;
        const jitter = (Math.random() - 0.5) * jitterAmount;
        
        point.x += normalX * jitter;
        point.y += normalY * jitter;
      }
      
      points.push({ x: point.x, y: point.y, messageIndex: i % preSeededMessages.length });
    }
    
    document.body.removeChild(svg);
    return points;
  };

  // Get star positions for current shape
  const [starPositions, setStarPositions] = useState<Array<{ x: number; y: number; messageIndex: number }>>([]);

  useEffect(() => {
    const updateStarPositions = () => {
      const count = getStarCount();
      const positions = samplePathPoints(shapePaths[selectedShape], count);
      setStarPositions(positions);
    };

    updateStarPositions();
    window.addEventListener('resize', updateStarPositions);
    return () => window.removeEventListener('resize', updateStarPositions);
  }, [selectedShape]);

  // Handle star click
  const handleStarClick = (messageIndex: number, starId: string) => {
    const message = preSeededMessages[messageIndex];
    setDriftingMessage({ text: message, id: starId });
    
    if (soundEnabled) {
      console.log('🔔 Soft chime');
    }
    
    setTimeout(() => setDriftingMessage(null), shouldReduceMotion ? 3000 : 12000);
  };

  // Handle star keyboard interaction
  const handleStarKeyDown = (e: React.KeyboardEvent, messageIndex: number, starId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleStarClick(messageIndex, starId);
    }
    if (e.key === 'Escape') {
      setDriftingMessage(null);
    }
  };

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const cloudY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTributeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    
    const newTribute: Tribute = {
      id: Date.now().toString(),
      name: formData.name,
      message: formData.message,
      photo: formData.photo ? URL.createObjectURL(formData.photo) : undefined,
      type: 'tribute',
      timestamp: new Date()
    };
    
    setTributes(prev => [newTribute, ...prev]);
    setFormData({ name: '', message: '', photo: null });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleModalSubmit = (type: string) => {
    if (!formData.name || !formData.message) return;
    
    const newTribute: Tribute = {
      id: Date.now().toString(),
      name: formData.name,
      message: formData.message,
      type: type as any,
      timestamp: new Date()
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
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'candle': return 'from-pink-100 to-pink-50 border-pink-200';
      case 'tribute': return 'from-pink-200 to-pink-100 border-pink-300';
      case 'memory': return 'from-gray-100 to-white border-gray-200';
      default: return 'from-pink-100 to-pink-50 border-pink-200';
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
        className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full shadow-2xl border border-pink-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-pink-100 mr-3 text-pink-600">
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
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
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              className="mt-1 bg-white/80 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-medium text-gray-700">Your Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Share your message..."
              className="mt-1 min-h-[80px] bg-white/80 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
            />
          </div>

          <Button
            onClick={() => handleModalSubmit(type)}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white"
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
        className="fixed inset-0 bg-gradient-to-b from-pink-50 via-white to-gray-50"
      >
        {/* Floating Clouds */}
        <motion.div style={{ y: cloudY }} className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/30 rounded-full blur-xl"
              style={{
                width: `${Math.random() * 150 + 80}px`,
                height: `${Math.random() * 80 + 40}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={shouldReduceMotion ? {} : {
                x: [0, 20, 0],
                y: [0, -15, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: Math.random() * 8 + 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
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
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-gray-700 bg-clip-text text-transparent"
                initial={{ y: 30, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Stairway to Heaven
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                A space where families and friends can honor loved ones, celebrate survivors, and share messages of support.
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
                    className="group bg-white/80 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg border border-pink-100 hover:shadow-xl hover:border-pink-200 transition-all duration-300 flex items-center text-gray-700 hover:text-pink-600"
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Button asChild variant="ghost" className="text-pink-600 hover:text-pink-700 hover:bg-pink-50">
                  <Link to="/memory-tree">
                    Explore the Memory Tree ↓
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* 2. Messages of Light */}
        <motion.section 
          ref={messagesRef}
          className="py-20 relative min-h-[70vh] flex items-center"
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
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-gray-700 bg-clip-text text-transparent">
                Messages of Light
              </h2>
              <p className="text-gray-600 mb-6">Tap the stars to reveal messages of hope</p>
              
              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mb-8">
                {/* Shape Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Shape:</span>
                  <div className="flex bg-white rounded-full border border-pink-100 p-1">
                    {(['ribbon', 'infinity', 'heart'] as const).map((shape) => (
                      <button
                        key={shape}
                        onClick={() => setSelectedShape(shape)}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                          selectedShape === shape
                            ? 'bg-pink-500 text-white'
                            : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                        }`}
                      >
                        {shape.charAt(0).toUpperCase() + shape.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sound Toggle */}
                <motion.button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-full bg-white/50 hover:bg-pink-50 border border-pink-100 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={soundEnabled ? "Mute chime" : "Enable chime"}
                >
                  {soundEnabled ? <Volume2 className="h-5 w-5 text-pink-600" /> : <VolumeX className="h-5 w-5 text-gray-400" />}
                </motion.button>
              </div>
            </motion.div>

            {/* SVG Stars Formation */}
            <div className="relative max-w-5xl mx-auto">
              <svg 
                width="100%" 
                height="600" 
                viewBox="0 0 1000 600" 
                preserveAspectRatio="xMidYMid meet"
                className="w-full"
              >
                <defs>
                  <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="starGlowHover" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Hidden path for sampling (no visual) */}
                <path
                  d={shapePaths[selectedShape]}
                  fill="none"
                  stroke="none"
                  style={{ display: 'none' }}
                />

                {/* Render stars along path */}
                {starPositions.map((position, index) => {
                  const starId = `star-${selectedShape}-${index}`;
                  return (
                    <g key={starId}>
                      <motion.path
                        d="M0,-6 L1.8,-1.8 L6,-1.8 L2.4,1.2 L4.2,6 L0,3 L-4.2,6 L-2.4,1.2 L-6,-1.8 L-1.8,-1.8 Z"
                        fill="#EC4899"
                        filter="url(#starGlow)"
                        transform={`translate(${position.x}, ${position.y})`}
                        className="cursor-pointer focus:outline-none"
                        role="button"
                        tabIndex={0}
                        aria-label={`Message of hope #${index + 1}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={messagesInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.02 }}
                        whileHover={{ 
                          scale: 1.15,
                          filter: "url(#starGlowHover)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleStarClick(position.messageIndex, starId)}
                        onKeyDown={(e) => handleStarKeyDown(e, position.messageIndex, starId)}
                        animate={shouldReduceMotion ? { opacity: 1 } : {
                          opacity: [1, 0.7, 1],
                        }}
                        transition={{
                          opacity: {
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Drifting Message Bubble */}
              <AnimatePresence>
                {driftingMessage && (
                  <motion.div
                    key={driftingMessage.id}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/95 backdrop-blur-lg rounded-lg px-6 py-3 shadow-lg border border-pink-200 text-center max-w-md z-10"
                    initial={{ x: -100, opacity: 0 }}
                    animate={shouldReduceMotion ? 
                      { opacity: [0, 1, 1, 0] } :
                      { 
                        x: 'calc(100vw + 100px)', 
                        opacity: [0, 1, 1, 0] 
                      }
                    }
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: shouldReduceMotion ? 3 : 12, 
                      ease: "linear" 
                    }}
                    aria-live="polite"
                  >
                    <p className="text-gray-800 font-medium text-sm">{driftingMessage.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Helper text when no messages */}
              {starPositions.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500 text-center">Messages will appear here</p>
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* 3. Tributes Section */}
        <motion.section 
          ref={tributesRef}
          className="py-20 bg-gradient-to-b from-pink-50/30 to-gray-50/30"
          initial={{ opacity: 0 }}
          animate={tributesInView ? { opacity: 1 } : {}}
        >
          <div className="container">
            <motion.div 
              className="text-center mb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={tributesInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-gray-700 bg-clip-text text-transparent">
                Leave a Tribute
              </h2>
              <p className="text-gray-600">Share your message of support</p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <motion.form 
                onSubmit={handleTributeSubmit}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-pink-100 mb-8"
                initial={{ y: 30, opacity: 0 }}
                animate={tributesInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="tribute-name" className="text-sm font-medium text-gray-700">Name *</Label>
                    <Input
                      id="tribute-name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your name"
                      className="mt-1 bg-white/80 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="tribute-photo" className="text-sm font-medium text-gray-700">Photo (optional)</Label>
                    <div className="mt-1 relative">
                      <Input
                        id="tribute-photo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.files?.[0] || null }))}
                        className="bg-white/80 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                      />
                      <ImageIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="tribute-message" className="text-sm font-medium text-gray-700">Message *</Label>
                  <Textarea
                    id="tribute-message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Share your message..."
                    className="mt-1 min-h-[100px] bg-white/80 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                  disabled={!formData.name || !formData.message}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Leave Tribute
                </Button>
              </motion.form>

              {/* Recent Tributes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tributes.slice(0, 4).map((tribute, index) => (
                  <motion.div
                    key={tribute.id}
                    className={`bg-gradient-to-br ${getTypeColor(tribute.type)} backdrop-blur-lg rounded-xl p-4 shadow-lg border hover:shadow-xl transition-all duration-300`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={tributesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -2, scale: 1.02 }}
                  >
                    <div className="flex items-start mb-3">
                      {tribute.photo && (
                        <img 
                          src={tribute.photo} 
                          alt={`Photo from ${tribute.name}`}
                          className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-pink-200"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{tribute.name}</p>
                        <p className="text-xs text-gray-600 capitalize">{tribute.type}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">{tribute.message}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 4. Memory Tree Teaser */}
        <motion.section 
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
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-gray-700 bg-clip-text text-transparent">
                Memory Tree
              </h2>
              <p className="text-gray-600">A living tribute to those we remember</p>
            </motion.div>

            {/* Tree Preview */}
            <div className="relative max-w-md mx-auto mb-12">
              <motion.div
                className="w-full h-80 bg-gradient-to-b from-pink-50 to-white rounded-2xl border border-pink-100 shadow-lg flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={memoryTreeInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">💖</div>
                  <p className="text-gray-600 font-medium">Heart Tree</p>
                  <p className="text-sm text-gray-500 mt-2">Interactive tree with names and messages</p>
                </div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={memoryTreeInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button asChild className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full">
                <Link to="/memory-tree">View the Memory Tree</Link>
              </Button>
              <Button asChild variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-full">
                <Link to="/memory-tree#add">Add a Name</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* 5. Community Wall */}
        <section className="py-20 bg-gradient-to-b from-pink-50/30 to-gray-50/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-gray-700 bg-clip-text text-transparent">
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
                        ? 'bg-pink-500 text-white shadow-lg'
                        : 'bg-white/80 text-gray-600 hover:bg-pink-50 border border-pink-100'
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
                        <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center text-pink-600">
                          {getTypeIcon(tribute.type)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{tribute.name}</p>
                        <p className="text-xs text-gray-600 capitalize">{tribute.type}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">{tribute.message}</p>
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
              className="fixed top-24 right-4 bg-white/95 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-pink-200 z-40"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-medium text-pink-800">Thank You</p>
                  <p className="text-sm text-pink-600">Your tribute has been shared</p>
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