interface MemoryEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

// Simple profanity filter
const profanityList = ['spam', 'test123', 'badword']; // Add more as needed

const isProfane = (text: string): boolean => {
  const lowerText = text.toLowerCase();
  return profanityList.some(word => lowerText.includes(word));
};

// Throttle map for spam prevention
const submitThrottle = new Map<string, number>();

const isThrottled = (identifier: string): boolean => {
  const now = Date.now();
  const lastSubmit = submitThrottle.get(identifier);
  if (lastSubmit && now - lastSubmit < 30000) { // 30 second throttle
    return true;
  }
  submitThrottle.set(identifier, now);
  return false;
};

// Supabase service
class SupabaseMemoryService {
  private supabase: any;

  constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      import('@supabase/supabase-js').then(({ createClient }) => {
        this.supabase = createClient(supabaseUrl, supabaseKey);
      });
    }
  }

  async getEntries(): Promise<MemoryEntry[]> {
    if (!this.supabase) throw new Error('Supabase not initialized');
    
    const { data, error } = await this.supabase
      .from('memory_tree')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async addEntry(name: string, message: string): Promise<MemoryEntry> {
    if (!this.supabase) throw new Error('Supabase not initialized');
    
    // Validation
    if (!name.trim() || !message.trim()) {
      throw new Error('Name and message are required');
    }
    
    if (message.length > 200) {
      throw new Error('Message must be 200 characters or less');
    }
    
    if (isProfane(name) || isProfane(message)) {
      throw new Error('Content not allowed');
    }
    
    const identifier = `${name.toLowerCase()}_${Date.now()}`;
    if (isThrottled(identifier)) {
      throw new Error('Please wait before adding another entry');
    }
    
    const entry = {
      name: name.trim(),
      message: message.trim(),
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await this.supabase
      .from('memory_tree')
      .insert([entry])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}

// LocalStorage fallback service
class LocalStorageMemoryService {
  private storageKey = 'memory_tree_entries';
  
  private getSeedData(): MemoryEntry[] {
    return [
      { id: '1', name: 'Sarah M.', message: 'Forever in our hearts, your courage inspires us daily', created_at: '2024-01-15T10:30:00Z' },
      { id: '2', name: 'David K.', message: 'Your strength and kindness touched so many lives', created_at: '2024-01-14T15:45:00Z' },
      { id: '3', name: 'Emma L.', message: 'Celebrating five years cancer-free, thank you for hope', created_at: '2024-01-13T09:20:00Z' },
      { id: '4', name: 'Michael R.', message: 'Dad, your love guides us through every challenge', created_at: '2024-01-12T14:10:00Z' },
      { id: '5', name: 'Lisa T.', message: 'Your laughter and light will never be forgotten', created_at: '2024-01-11T11:55:00Z' },
      { id: '6', name: 'James W.', message: 'Brother, your fight gave us all courage to keep going', created_at: '2024-01-10T16:30:00Z' },
      { id: '7', name: 'Anna S.', message: 'Mom, your wisdom and love live on in our hearts', created_at: '2024-01-09T08:45:00Z' },
      { id: '8', name: 'Robert M.', message: 'Your dedication to helping others continues to inspire', created_at: '2024-01-08T13:20:00Z' },
      { id: '9', name: 'Grace H.', message: 'Grandma, your stories and hugs are treasured memories', created_at: '2024-01-07T10:15:00Z' },
      { id: '10', name: 'Thomas B.', message: 'Your research work paved the way for future breakthroughs', created_at: '2024-01-06T17:40:00Z' },
      { id: '11', name: 'Maria C.', message: 'Your positive spirit lifted everyone around you', created_at: '2024-01-05T12:25:00Z' },
      { id: '12', name: 'William D.', message: 'Uncle, your jokes and warmth brightened every gathering', created_at: '2024-01-04T09:50:00Z' },
      { id: '13', name: 'Helen F.', message: 'Your teaching and mentorship shaped countless lives', created_at: '2024-01-03T14:35:00Z' },
      { id: '14', name: 'Charles G.', message: 'Your quiet strength was a beacon for our family', created_at: '2024-01-02T11:10:00Z' },
      { id: '15', name: 'Dorothy I.', message: 'Your garden and your love both continue to bloom', created_at: '2024-01-01T16:20:00Z' },
      { id: '16', name: 'Frank J.', message: 'Your service and sacrifice will always be honored', created_at: '2023-12-31T08:30:00Z' },
      { id: '17', name: 'Betty K.', message: 'Your recipes and traditions keep our family connected', created_at: '2023-12-30T13:45:00Z' },
      { id: '18', name: 'George L.', message: 'Your music and passion for life echo in our memories', created_at: '2023-12-29T10:55:00Z' },
      { id: '19', name: 'Ruth N.', message: 'Your volunteer work touched countless hearts in our community', created_at: '2023-12-28T15:15:00Z' },
      { id: '20', name: 'Arthur P.', message: 'Your stories of adventure inspire us to live fully', created_at: '2023-12-27T12:40:00Z' }
    ];
  }
  
  async getEntries(): Promise<MemoryEntry[]> {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      const seedData = this.getSeedData();
      localStorage.setItem(this.storageKey, JSON.stringify(seedData));
      return seedData;
    }
    return JSON.parse(stored);
  }
  
  async addEntry(name: string, message: string): Promise<MemoryEntry> {
    // Validation
    if (!name.trim() || !message.trim()) {
      throw new Error('Name and message are required');
    }
    
    if (message.length > 200) {
      throw new Error('Message must be 200 characters or less');
    }
    
    if (isProfane(name) || isProfane(message)) {
      throw new Error('Content not allowed');
    }
    
    const identifier = `${name.toLowerCase()}_${Date.now()}`;
    if (isThrottled(identifier)) {
      throw new Error('Please wait before adding another entry');
    }
    
    const entries = await this.getEntries();
    const newEntry: MemoryEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      created_at: new Date().toISOString()
    };
    
    const updatedEntries = [newEntry, ...entries];
    localStorage.setItem(this.storageKey, JSON.stringify(updatedEntries));
    
    return newEntry;
  }
}

// Service factory
const createMemoryService = () => {
  const hasSupabase = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;
  return hasSupabase ? new SupabaseMemoryService() : new LocalStorageMemoryService();
};

export const memoryService = createMemoryService();
export type { MemoryEntry };