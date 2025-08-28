import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  ArrowLeft, 
  Send, 
  Check,
  X
} from "lucide-react";
import { memoryService, type MemoryEntry } from "@/lib/memoryTreeService";

interface SymbolicElement {
  id: string;
  type: 'heart' | 'ribbon' | 'butterfly' | 'dove';
  x: number;
  y: number;
  opacity: number;
}

export default function MemoryTree() {
  const [entries, setEntries] = useState<MemoryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "alphabetical">("recent");
  const [symbolicElements, setSymbolicElements] = useState<SymbolicElement[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [highlightedEntry, setHighlightedEntry] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "", photo: null as File | null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [newEntryId, setNewEntryId] = useState<string | null>(null);

  const shouldReduceMotion = useReducedMotion();
  const tributeListRef = useRef<HTMLDivElement>(null);

  // Load entries
  useEffect(() => {
    const loadEntries = async () => {
      try {
        const data = await memoryService.getEntries();
        setEntries(data);
      } catch (error) {
        console.error("Failed to load entries:", error);
      }
    };
    loadEntries();
  }, []);

  // Generate symbolic elements periodically
  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      const elementTypes: SymbolicElement['type'][] = ['heart', 'ribbon', 'butterfly', 'dove'];
      const newElement: SymbolicElement = {
        id: Date.now().toString(),
        type: elementTypes[Math.floor(Math.random() * elementTypes.length)],
        x: 350 + Math.random() * 100, // Near heart canopy
        y: 150 + Math.random() * 100,
        opacity: 0.3 + Math.random() * 0.4
      };

      setSymbolicElements(prev => [...prev, newElement]);

      // Remove element after animation
      setTimeout(() => {
        setSymbolicElements(prev => prev.filter(el => el.id !== newElement.id));
      }, 6000);
    }, 8000); // Longer intervals for respectful spacing

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Handle search focus
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const matchingEntry = entries.find(entry => 
        entry.name.toLowerCase().includes(query.toLowerCase())
      );
      if (matchingEntry) {
        setHighlightedEntry(matchingEntry.id);
      } else {
        setHighlightedEntry(null);
      }
    } else {
      setHighlightedEntry(null);
    }
  }, [entries]);

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const newEntry = await memoryService.addEntry(formData.name, formData.message);
      setEntries(prev => [newEntry, ...prev]);
      setFormData({ name: "", message: "", photo: null });
      setShowForm(false);
      setSubmitSuccess(true);
      setNewEntryId(newEntry.id);
      setHighlightedEntry(newEntry.id);

      setTimeout(() => {
        setSubmitSuccess(false);
        setNewEntryId(null);
      }, 3000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to add entry");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter and sort entries
  const filteredEntries = entries.filter(entry => 
    entry.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  // Get hanging tribute cards (most recent)
  const getHangingTributes = () => {
    const isMobile = window.innerWidth < 768;
    const maxCards = isMobile ? 6 : 12;
    return sortedEntries.slice(0, maxCards);
  };

  // Get card position around heart (2 concentric arcs)
  const getCardPosition = (index: number, total: number) => {
    const isMobile = window.innerWidth < 768;
    const heartCenterX = 600;
    const heartCenterY = 200;
    const minAngleSeparation = Math.PI / 10; // 18 degrees
    
    // Distribute cards around top and upper sides of heart
    const startAngle = -Math.PI * 0.8; // Start from top-left
    const endAngle = -Math.PI * 0.2;   // End at top-right
    const angleRange = endAngle - startAngle;
    
    // Calculate angle for this card
    let angle;
    if (total === 1) {
      angle = -Math.PI / 2; // Top center
    } else {
      angle = startAngle + (index / (total - 1)) * angleRange;
    }
    
    // Heart dimensions (30% larger)
    const heartRadiusX = 114;
    const heartRadiusY = 70;
    
    // Determine which arc (inner or outer) based on spacing
    const isOuterArc = index >= total / 2 && total > 6;
    const arcRadius = isOuterArc ? 1.4 : 1.2;
    
    // Anchor point on heart edge
    const anchorX = heartCenterX + Math.cos(angle) * heartRadiusX;
    const anchorY = heartCenterY + Math.sin(angle) * heartRadiusY;
    
    // Card position (outside heart with safe margin)
    const cardDistance = isMobile ? 180 : 220;
    const cardRadius = cardDistance * arcRadius;
    const cardX = heartCenterX + Math.cos(angle) * cardRadius;
    const cardY = heartCenterY + Math.sin(angle) * cardRadius;
    
    // Ensure cards don't go off screen
    const safeMargin = 150;
    const clampedCardX = Math.max(safeMargin, Math.min(1200 - safeMargin, cardX));
    const clampedCardY = Math.max(safeMargin, Math.min(600 - safeMargin, cardY));
    
    const stringLength = Math.sqrt(
      Math.pow(clampedCardX - anchorX, 2) + Math.pow(clampedCardY - anchorY, 2)
    );
    
    return { 
      anchorX, 
      anchorY, 
      cardX: clampedCardX, 
      cardY: clampedCardY, 
      stringLength,
      angle 
    };
  };

  // Handle hanging card click
  const handleHangingCardClick = (entryId: string) => {
    setHighlightedEntry(entryId);
    
    // Smooth scroll to tribute list
    if (tributeListRef.current) {
      tributeListRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
    
    // Clear highlight after animation
    setTimeout(() => {
      setHighlightedEntry(null);
    }, 2000);
  };

  // Get symbolic element emoji
  const getSymbolicEmoji = (type: SymbolicElement['type']) => {
    switch (type) {
      case 'heart': return '💕';
      case 'ribbon': return '🎀';
      case 'butterfly': return '🦋';
      case 'dove': return '🕊️';
      default: return '💕';
    }
  };

  // Check if entry is recent (within 24h)
  const isRecent = (entry: MemoryEntry) => {
    const now = new Date();
    const entryDate = new Date(entry.created_at);
    const diffHours = (now.getTime() - entryDate.getTime()) / (1000 * 60 * 60);
    return diffHours < 24;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 via-white to-gray-50 relative">
      {/* Subtle light rays background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-pink-200 to-transparent rounded-full blur-3xl"></div>
      </div>

      <Navbar />
      
      <main className="flex-1 pt-20 relative z-10">
        {/* Hero */}
        <section className="py-12 text-center">
          <div className="container">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-gray-700 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              The Memory Tree
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A living space to honor loved ones and share messages of support.
            </motion.p>
          </div>
        </section>

        {/* Controls */}
        <section className="py-4 border-b bg-white/50 backdrop-blur-sm sticky top-20 z-40">
          <div className="container">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Left controls */}
              <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/stairway-to-heaven">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Stairway
                  </Link>
                </Button>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search names..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "recent" | "alphabetical")}
                  className="px-3 py-2 border rounded-md bg-white text-sm"
                >
                  <option value="recent">Recent</option>
                  <option value="alphabetical">A–Z</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Tree Section */}
        <section className="py-20 relative min-h-[70vh] flex items-center">
          <div className="container">
            <div className="relative h-[600px] max-w-6xl mx-auto">
              {/* Fixed, centered tree */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="1200" height="600" viewBox="0 0 1200 600" className="w-full h-full">
                  <defs>
                    <radialGradient id="heartGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#BE185D" />
                    </radialGradient>
                    <filter id="pinkGlow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Tree Trunk */}
                  <rect
                    x="588"
                    y="350"
                    width="24"
                    height="150"
                    fill="#9CA3AF"
                    rx="12"
                    opacity="0.8"
                  />
                  
                  {/* Heart Canopy - 30% larger */}
                  <g transform="translate(600, 200)">
                    <path
                      d="M0,-70 C-44,-114 -114,-114 -114,-44 C-114,0 0,88 0,88 C0,88 114,0 114,-44 C114,-114 44,-114 0,-70 Z"
                      fill="url(#heartGradient)"
                      filter="url(#pinkGlow)"
                      opacity="0.9"
                    />
                  </g>

                  {/* Hanging Tribute Cards Around Heart */}
                  {getHangingTributes().map((entry, index) => {
                    const { anchorX, anchorY, cardX, cardY, stringLength } = getCardPosition(index, getHangingTributes().length);
                    
                    return (
                      <g key={`hanging-${entry.id}`}>
                        {/* String */}
                        <motion.line
                          x1={anchorX}
                          y1={anchorY}
                          x2={cardX}
                          y2={cardY}
                          stroke="#EC4899"
                          strokeWidth="1.5"
                          opacity="0.7"
                          animate={shouldReduceMotion ? {} : {
                            x2: [cardX, cardX + 1, cardX - 1, cardX],
                            y2: [cardY, cardY + 1, cardY - 1, cardY],
                          }}
                          transition={{
                            duration: 6 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        
                        {/* Anchor dot */}
                        <circle
                          cx={anchorX}
                          cy={anchorY}
                          r="2"
                          fill="#EC4899"
                          opacity="0.8"
                        />
                        
                      </g>
                    );
                  })}

                  {/* Symbolic Elements */}
                  <AnimatePresence>
                    {symbolicElements.map((element) => (
                      <motion.g
                        key={element.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: element.opacity, 
                          scale: 1,
                          y: [0, -20, 0],
                          x: [0, 10, -10, 0]
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ 
                          duration: 6, 
                          ease: "easeInOut",
                          y: { repeat: Infinity, duration: 4 },
                          x: { repeat: Infinity, duration: 3 }
                        }}
                      >
                        <text
                          x={element.x}
                          y={element.y}
                          textAnchor="middle"
                          fontSize="16"
                          opacity={element.opacity}
                        >
                          {getSymbolicEmoji(element.type)}
                        </text>
                      </motion.g>
                    ))}
                  </AnimatePresence>
                </svg>
              </div>
              
              {/* Hanging Cards as HTML elements positioned absolutely */}
              {getHangingTributes().map((entry, index) => {
                const { cardX, cardY } = getCardPosition(index, getHangingTributes().length);
                const isMobile = window.innerWidth < 768;
                const cardWidth = isMobile ? 240 : 280;
                
                return (
                  <motion.div
                    key={`card-${entry.id}`}
                    className="absolute z-20 cursor-pointer"
                    style={{
                      left: `${(cardX / 1200) * 100}%`,
                      top: `${(cardY / 600) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                      width: `${cardWidth}px`
                    }}
                    animate={shouldReduceMotion ? {} : {
                      x: [0, 1, -1, 0],
                      y: [0, 0.5, -0.5, 0],
                    }}
                    transition={{
                      duration: 6 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    onMouseEnter={() => setHoveredCard(entry.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handleHangingCardClick(entry.id)}
                    aria-label={`Tribute for ${entry.name}`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleHangingCardClick(entry.id);
                      }
                    }}
                  >
                    <div className="bg-white border border-pink-200/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-pink-300/40">
                      <div className="flex items-start gap-3">
                        {entry.photo && (
                          <img 
                            src={entry.photo} 
                            alt={`Photo from ${entry.name}`}
                            className="w-8 h-8 rounded-full object-cover border border-pink-200"
                            loading="lazy"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-800 text-sm truncate">{entry.name}</p>
                          <p className="text-gray-600 text-xs line-clamp-2 mt-1">
                            {entry.message.length > 60 
                              ? entry.message.substring(0, 60) + "..." 
                              : entry.message}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover tooltip */}
                    <AnimatePresence>
                      {hoveredCard === entry.id && entry.message.length > 60 && (
                        <motion.div
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-pink-200 rounded-lg p-3 shadow-lg z-30 max-w-xs"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <p className="text-gray-800 text-sm">{entry.message}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Legend & Actions */}
            <div className="text-center mt-8 space-y-4">
              <p className="text-sm text-gray-600">Recent tributes hang from the heart</p>
              {getHangingTributes().length < sortedEntries.length && (
                <p className="text-xs text-gray-500">+ more tributes below</p>
              )}
              <Button
                onClick={() => setShowForm(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full"
              >
                Add a Tribute
              </Button>
            </div>
          </div>
        </section>

        {/* Tribute Grid */}
        <section className="py-16 bg-white/50">
          <div className="container">
            <div ref={tributeListRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {sortedEntries.map((entry, index) => (
                <motion.div
                  key={`tribute-${entry.id}`}
                  id={`tribute-${entry.id}`}
                  className={`bg-white rounded-xl p-4 border transition-all duration-300 ${
                    highlightedEntry === entry.id 
                      ? 'border-pink-300 shadow-lg bg-pink-50' 
                      : 'border-pink-100 hover:shadow-lg hover:border-pink-200'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <div className="flex items-start mb-3">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{entry.name}</p>
                      {isRecent(entry) && (
                        <span className="text-xs text-pink-600 bg-pink-50 px-2 py-1 rounded-full">Recent</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">{entry.message}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Add Tribute Modal */}
        <AnimatePresence>
          {showForm && (
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
                  <h3 className="text-lg font-semibold text-gray-800">Add a Tribute</h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter name"
                      className="mt-1 bg-white/80 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                      required
                      maxLength={50}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message * (max 200 characters)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Share a message of love, support, or remembrance..."
                      className="mt-1 min-h-[100px] bg-white/80 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                      required
                      maxLength={200}
                    />
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {formData.message.length}/200
                    </div>
                  </div>

                  {submitError && (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
                      {submitError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.name.trim() || !formData.message.trim()}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    {isSubmitting ? (
                      "Adding..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Add Tribute
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Toast */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              className="fixed top-24 right-4 bg-white/95 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-pink-200 z-50"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-medium text-pink-800">Added to the Memory Tree</p>
                  <p className="text-sm text-pink-600">Your tribute is now part of our living memorial</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}