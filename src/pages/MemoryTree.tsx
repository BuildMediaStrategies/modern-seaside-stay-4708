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

interface TreeLeaf {
  id: string;
  name: string;
  message: string;
  x: number;
  y: number;
  angle: number;
  scale: number;
}

export default function MemoryTree() {
  const [entries, setEntries] = useState<MemoryEntry[]>([]);
  const [leaves, setLeaves] = useState<TreeLeaf[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "alphabetical">("recent");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredLeaf, setHoveredLeaf] = useState<string | null>(null);
  const [focusedLeaf, setFocusedLeaf] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [newLeafId, setNewLeafId] = useState<string | null>(null);

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

  // Generate tree leaves from entries
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

    const newLeaves: TreeLeaf[] = sortedEntries.map((entry, index) => {
      // Distribute leaves around the tree in a natural pattern
      const angle = (index / sortedEntries.length) * Math.PI * 2;
      const radius = 80 + (index % 3) * 40; // Vary distance from center
      const x = 400 + Math.cos(angle) * radius + (Math.random() - 0.5) * 30;
      const y = 300 + Math.sin(angle) * radius * 0.6 + (Math.random() - 0.5) * 30;
      
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

    setLeaves(newLeaves);
  }, [entries, searchQuery, sortBy]);

  // Handle search focus
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const matchingLeaf = leaves.find(leaf => 
        leaf.name.toLowerCase().includes(query.toLowerCase())
      );
      if (matchingLeaf) {
        setFocusedLeaf(matchingLeaf.id);
        // Center on the leaf
        setPan({
          x: 400 - matchingLeaf.x * zoom,
          y: 300 - matchingLeaf.y * zoom
        });
      }
    } else {
      setFocusedLeaf(null);
    }
  }, [leaves, zoom]);

  // Zoom controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.3));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setFocusedLeaf(null);
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
      setNewLeafId(newEntry.id);

      // Focus on new leaf after a brief delay
      setTimeout(() => {
        const newLeaf = leaves.find(leaf => leaf.id === newEntry.id);
        if (newLeaf) {
          setFocusedLeaf(newEntry.id);
          setPan({
            x: 400 - newLeaf.x * zoom,
            y: 300 - newLeaf.y * zoom
          });
        }
      }, 1000);

      setTimeout(() => {
        setSubmitSuccess(false);
        setNewLeafId(null);
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="py-12 text-center">
          <div className="container">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
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
        <section className="flex-1 relative overflow-hidden bg-gradient-to-b from-blue-50/30 to-purple-50/30">
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
                <radialGradient id="treeGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#90EE90" />
                  <stop offset="100%" stopColor="#228B22" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
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
                  y="400"
                  width="20"
                  height="150"
                  fill="#8B4513"
                  rx="10"
                />
                
                {/* Tree Crown */}
                <ellipse
                  cx="400"
                  cy="350"
                  rx="120"
                  ry="100"
                  fill="url(#treeGradient)"
                  opacity="0.8"
                />

                {/* Branches */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const x1 = 400;
                  const y1 = 350;
                  const x2 = 400 + Math.cos(angle) * 80;
                  const y2 = 350 + Math.sin(angle) * 60;
                  
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#8B4513"
                      strokeWidth="3"
                      opacity="0.6"
                    />
                  );
                })}

                {/* Memory Leaves */}
                {leaves.map((leaf) => (
                  <g key={leaf.id}>
                    <motion.circle
                      cx={leaf.x}
                      cy={leaf.y}
                      r="8"
                      fill={focusedLeaf === leaf.id ? "#FFD700" : "#90EE90"}
                      stroke={focusedLeaf === leaf.id ? "#FFA500" : "#228B22"}
                      strokeWidth="2"
                      className="cursor-pointer"
                      filter={focusedLeaf === leaf.id ? "url(#glow)" : undefined}
                      onMouseEnter={() => setHoveredLeaf(leaf.id)}
                      onMouseLeave={() => setHoveredLeaf(null)}
                      onClick={() => setFocusedLeaf(leaf.id)}
                      animate={
                        shouldReduceMotion ? {} : {
                          y: [0, -2, 0],
                          rotate: [0, 2, -2, 0]
                        }
                      }
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      initial={newLeafId === leaf.id ? { scale: 0 } : {}}
                      whileHover={{ scale: 1.2 }}
                    />
                    
                    {/* Leaf tooltip */}
                    <AnimatePresence>
                      {(hoveredLeaf === leaf.id || focusedLeaf === leaf.id) && (
                        <motion.g
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                        >
                          <rect
                            x={leaf.x - 60}
                            y={leaf.y - 50}
                            width="120"
                            height="35"
                            fill="rgba(0, 0, 0, 0.8)"
                            rx="4"
                          />
                          <text
                            x={leaf.x}
                            y={leaf.y - 38}
                            textAnchor="middle"
                            fill="white"
                            fontSize="10"
                            fontWeight="bold"
                          >
                            {leaf.name}
                          </text>
                          <text
                            x={leaf.x}
                            y={leaf.y - 25}
                            textAnchor="middle"
                            fill="white"
                            fontSize="8"
                            opacity="0.9"
                          >
                            {leaf.message.length > 30 
                              ? leaf.message.substring(0, 30) + "..." 
                              : leaf.message}
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
              <h2 className="text-2xl font-bold mb-4">Add a Name</h2>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
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
                  className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/50"
                >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter name"
                        required
                        maxLength={50}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message * (max 200 characters)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Share a message of love, support, or remembrance..."
                        required
                        maxLength={200}
                        className="min-h-[100px]"
                      />
                      <div className="text-right text-xs text-gray-500 mt-1">
                        {formData.message.length}/200
                      </div>
                    </div>

                    {submitError && (
                      <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                        {submitError}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.name.trim() || !formData.message.trim()}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
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
              className="fixed top-24 right-4 bg-white/95 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-green-200 z-50"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-800">Added to the Memory Tree</p>
                  <p className="text-sm text-green-600">Your tribute is now part of our living memorial</p>
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