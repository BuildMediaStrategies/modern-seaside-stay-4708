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
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const [focusedStar, setFocusedStar] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "", photo: null as File | null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [newStarId, setNewStarId] = useState<string | null>(null);

  const shouldReduceMotion = useReducedMotion();

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
        setFocusedStar(matchingEntry.id);
      }
    } else {
      setFocusedStar(null);
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
      setNewStarId(newEntry.id);
      setFocusedStar(newEntry.id);

      setTimeout(() => {
        setSubmitSuccess(false);
        setNewStarId(null);
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

  // Position stars around heart canopy in concentric arcs
  const getStarPosition = (index: number, total: number) => {
    const heartCenterX = 400;
    const heartCenterY = 200;
    
    // Create concentric arcs
    const arc = Math.floor(index / 8); // 8 stars per arc
    const positionInArc = index % 8;
    const radius = 60 + (arc * 25); // Increasing radius for each arc
    const angleOffset = arc * 0.3; // Slight rotation offset per arc
    const angle = (positionInArc / 8) * Math.PI * 2 + angleOffset;
    
    const x = heartCenterX + Math.cos(angle) * radius;
    const y = heartCenterY + Math.sin(angle) * radius * 0.7; // Flatten vertically
    
    return { x, y };
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
        <section className="py-20 relative min-h-screen flex items-center">
          <div className="container">
            <div className="relative h-96 max-w-4xl mx-auto">
              {/* Fixed, centered tree */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="800" height="400" viewBox="0 0 800 400" className="w-full h-full">
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
                    <filter id="starGlow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Tree Trunk */}
                  <rect
                    x="390"
                    y="280"
                    width="20"
                    height="120"
                    fill="#9CA3AF"
                    rx="10"
                    opacity="0.8"
                  />
                  
                  {/* Heart Canopy */}
                  <g transform="translate(400, 200)">
                    <path
                      d="M0,-40 C-25,-65 -65,-65 -65,-25 C-65,0 0,50 0,50 C0,50 65,0 65,-25 C65,-65 25,-65 0,-40 Z"
                      fill="url(#heartGradient)"
                      filter="url(#pinkGlow)"
                      opacity="0.9"
                    />
                  </g>

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
                          x: { repeat: Infinity, duration: 5 }
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

                  {/* Memory Stars */}
                  {sortedEntries.map((entry, index) => {
                    const position = getStarPosition(index, sortedEntries.length);
                    const isRecentEntry = isRecent(entry);
                    
                    return (
                      <g key={entry.id}>
                        <motion.g
                          transform={`translate(${position.x}, ${position.y})`}
                          animate={
                            shouldReduceMotion ? {} : {
                              scale: [1, 1.1, 1],
                              opacity: isRecentEntry ? [0.8, 1, 0.8] : [0.6, 0.8, 0.6]
                            }
                          }
                          transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <motion.path
                            d="M0,-6 L1.8,-1.8 L6,0 L1.8,1.8 L0,6 L-1.8,1.8 L-6,0 L-1.8,-1.8 Z"
                            fill={focusedStar === entry.id ? "#EC4899" : "#FFFFFF"}
                            stroke="#EC4899"
                            strokeWidth="1"
                            filter="url(#starGlow)"
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredStar(entry.id)}
                            onMouseLeave={() => setHoveredStar(null)}
                            onClick={() => setFocusedStar(entry.id)}
                            whileHover={{ scale: 1.3 }}
                            aria-label={`Tribute for ${entry.name}: ${entry.message.substring(0, 50)}...`}
                          />
                        </motion.g>
                        
                        {/* Star tooltip */}
                        <AnimatePresence>
                          {(hoveredStar === entry.id || focusedStar === entry.id) && (
                            <motion.g
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                            >
                              <rect
                                x={position.x - 80}
                                y={position.y - 60}
                                width="160"
                                height="45"
                                fill="white"
                                stroke="#EC4899"
                                strokeWidth="1"
                                rx="6"
                                filter="url(#pinkGlow)"
                              />
                              <text
                                x={position.x}
                                y={position.y - 42}
                                textAnchor="middle"
                                fill="#EC4899"
                                fontSize="12"
                                fontWeight="bold"
                              >
                                {entry.name}
                              </text>
                              <text
                                x={position.x}
                                y={position.y - 28}
                                textAnchor="middle"
                                fill="#6B7280"
                                fontSize="10"
                              >
                                {entry.message.length > 40 
                                  ? entry.message.substring(0, 40) + "..." 
                                  : entry.message}
                              </text>
                            </motion.g>
                          )}
                        </AnimatePresence>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Legend & Actions */}
            <div className="text-center mt-8 space-y-4">
              <p className="text-sm text-gray-600">
                ⭐ = tribute • ✨ = recent
              </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {sortedEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  className="bg-white rounded-xl p-4 border border-pink-100 hover:shadow-lg hover:border-pink-200 transition-all duration-300"
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