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
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ArrowLeft, 
  Send, 
  Check,
  Filter,
  X
} from "lucide-react";
import { memoryService, type MemoryEntry } from "@/lib/memoryTreeService";

interface TreeStar {
  id: string;
  name: string;
  message: string;
  x: number;
  y: number;
  angle: number;
  scale: number;
}

interface SymbolicElement {
  id: string;
  type: 'heart' | 'ribbon' | 'butterfly' | 'dove';
  x: number;
  y: number;
  opacity: number;
}

export default function MemoryTree() {
  const [entries, setEntries] = useState<MemoryEntry[]>([]);
  const [stars, setStars] = useState<TreeStar[]>([]);
  const [symbolicElements, setSymbolicElements] = useState<SymbolicElement[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "alphabetical">("recent");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const [focusedStar, setFocusedStar] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [newStarId, setNewStarId] = useState<string | null>(null);

  const treeRef = useRef<SVGSVGElement>(null);
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

  // Generate tree stars from entries
  useEffect(() => {
    if (entries.length === 0) return;

    const filteredEntries = entries.filter(entry => 
      entry.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedEntries = [...filteredEntries].sort((a, b) => {
      if (sortBy === "alphabetical") {
        return a.name.localeCompare(b.name);
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    const newStars: TreeStar[] = sortedEntries.map((entry, index) => {
      // Position stars around the heart canopy in a natural pattern
      const angle = (index / sortedEntries.length) * Math.PI * 2;
      const radius = 60 + (index % 4) * 25; // Vary distance from heart center
      const heartCenterX = 400;
      const heartCenterY = 200;
      
      const x = heartCenterX + Math.cos(angle) * radius + (Math.random() - 0.5) * 20;
      const y = heartCenterY + Math.sin(angle) * radius * 0.7 + (Math.random() - 0.5) * 20;
      
      return {
        id: entry.id,
        name: entry.name,
        message: entry.message,
        x,
        y,
        angle: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4
      };
    });

    setStars(newStars);
  }, [entries, searchQuery, sortBy]);

  // Generate symbolic elements periodically
  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      const elementTypes: SymbolicElement['type'][] = ['heart', 'ribbon', 'butterfly', 'dove'];
      const newElement: SymbolicElement = {
        id: Date.now().toString(),
        type: elementTypes[Math.floor(Math.random() * elementTypes.length)],
        x: 300 + Math.random() * 200,
        y: 150 + Math.random() * 200,
        opacity: 0.3 + Math.random() * 0.4
      };

      setSymbolicElements(prev => [...prev, newElement]);

      // Remove element after animation
      setTimeout(() => {
        setSymbolicElements(prev => prev.filter(el => el.id !== newElement.id));
      }, 4000);
    }, 3000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Handle search focus
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const matchingStar = stars.find(star => 
        star.name.toLowerCase().includes(query.toLowerCase())
      );
      if (matchingStar) {
        setFocusedStar(matchingStar.id);
        // Center on the star
        setPan({
          x: 400 - matchingStar.x * zoom,
          y: 300 - matchingStar.y * zoom
        });
      }
    } else {
      setFocusedStar(null);
    }
  }, [stars, zoom]);

  // Zoom controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.3));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setFocusedStar(null);
  };

  // Pan controls
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const newEntry = await memoryService.addEntry(formData.name, formData.message);
      setEntries(prev => [newEntry, ...prev]);
      setFormData({ name: "", message: "" });
      setShowForm(false);
      setSubmitSuccess(true);
      setNewStarId(newEntry.id);

      // Focus on new star after a brief delay
      setTimeout(() => {
        const newStar = stars.find(star => star.id === newEntry.id);
        if (newStar) {
          setFocusedStar(newEntry.id);
          setPan({
            x: 400 - newStar.x * zoom,
            y: 300 - newStar.y * zoom
          });
        }
      }, 1000);

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

  // Scroll to form
  useEffect(() => {
    if (window.location.hash === '#add') {
      setShowForm(true);
      setTimeout(() => {
        document.getElementById('add-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 via-white to-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-20">
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

              {/* Right controls */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600 min-w-[60px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <Button variant="outline" size="sm" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleResetView}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tree Canvas */}
        <section className="flex-1 relative overflow-hidden bg-gradient-to-b from-pink-50/30 to-gray-50/30">
          <div className="w-full h-[70vh] relative">
            <svg
              ref={treeRef}
              className="w-full h-full cursor-move"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
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

              <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
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
                    d="M0,-30 C-20,-50 -50,-50 -50,-20 C-50,0 0,40 0,40 C0,40 50,0 50,-20 C50,-50 20,-50 0,-30 Z"
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
                        duration: 4, 
                        ease: "easeInOut",
                        y: { repeat: Infinity, duration: 3 },
                        x: { repeat: Infinity, duration: 4 }
                      }}
                    >
                      <text
                        x={element.x}
                        y={element.y}
                        textAnchor="middle"
                        fontSize="20"
                        opacity={element.opacity}
                      >
                        {getSymbolicEmoji(element.type)}
                      </text>
                    </motion.g>
                  ))}
                </AnimatePresence>

                {/* Memory Stars */}
                {stars.map((star) => (
                  <g key={star.id}>
                    <motion.g
                      transform={`translate(${star.x}, ${star.y})`}
                      animate={
                        shouldReduceMotion ? {} : {
                          scale: [1, 1.1, 1],
                          opacity: [0.8, 1, 0.8]
                        }
                      }
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.path
                        d="M0,-8 L2.4,-2.4 L8,0 L2.4,2.4 L0,8 L-2.4,2.4 L-8,0 L-2.4,-2.4 Z"
                        fill={focusedStar === star.id ? "#EC4899" : "#FFFFFF"}
                        stroke="#EC4899"
                        strokeWidth="1"
                        filter="url(#starGlow)"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredStar(star.id)}
                        onMouseLeave={() => setHoveredStar(null)}
                        onClick={() => setFocusedStar(star.id)}
                        whileHover={{ scale: 1.3 }}
                        aria-label={`Tribute for ${star.name}: ${star.message.substring(0, 50)}...`}
                      />
                    </motion.g>
                    
                    {/* Star tooltip */}
                    <AnimatePresence>
                      {(hoveredStar === star.id || focusedStar === star.id) && (
                        <motion.g
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                        >
                          <rect
                            x={star.x - 80}
                            y={star.y - 60}
                            width="160"
                            height="45"
                            fill="white"
                            stroke="#EC4899"
                            strokeWidth="1"
                            rx="6"
                            filter="url(#pinkGlow)"
                          />
                          <text
                            x={star.x}
                            y={star.y - 42}
                            textAnchor="middle"
                            fill="#EC4899"
                            fontSize="12"
                            fontWeight="bold"
                          >
                            {star.name}
                          </text>
                          <text
                            x={star.x}
                            y={star.y - 28}
                            textAnchor="middle"
                            fill="#6B7280"
                            fontSize="10"
                          >
                            {star.message.length > 40 
                              ? star.message.substring(0, 40) + "..." 
                              : star.message}
                          </text>
                        </motion.g>
                      )}
                    </AnimatePresence>
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </section>

        {/* Add Name Form */}
        <section id="add" className="py-16 bg-white">
          <div className="container max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Add a Name</h2>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white"
              >
                {showForm ? "Cancel" : "Add Name to Tree"}
              </Button>
            </div>

            <AnimatePresence>
              {showForm && (
                <motion.div
                  id="add-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-pink-100"
                >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter name"
                        required
                        maxLength={50}
                        className="border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-700">Message * (max 200 characters)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Share a message of love, support, or remembrance..."
                        required
                        maxLength={200}
                        className="min-h-[100px] border-gray-200 focus:border-pink-300 focus:ring-pink-200"
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
                      className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white"
                    >
                      {isSubmitting ? (
                        "Adding..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Add Name
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

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