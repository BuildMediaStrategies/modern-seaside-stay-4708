import { useState } from "react";
import { Check, CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BookingForm() {
  const { t } = useLanguage();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [donationType, setDonationType] = useState("one-time");
  const [amount, setAmount] = useState("50");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the donation data to a server
    console.log("Donation submitted:", { firstName, lastName, donationType, amount });
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="glass-card p-6 space-y-6 animate-fade-in [animation-delay:200ms]"
    >
      <h3 className="text-2xl font-bold text-center mb-6">{t.bookingForm.title}</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="space-y-2">
            <label htmlFor="first-name" className="block text-sm font-medium">
              {t.bookingForm.checkIn}
            </label>
            <input
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={t.bookingForm.selectDate}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
              required
            />
          </div>
          
          {/* Last Name */}
          <div className="space-y-2">
            <label htmlFor="last-name" className="block text-sm font-medium">
              {t.bookingForm.checkOut}
            </label>
            <input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={t.bookingForm.selectDate}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Donation Type */}
          <div className="space-y-2">
            <label htmlFor="donation-type" className="block text-sm font-medium">
              {t.bookingForm.adults}
            </label>
            <Select value={donationType} onValueChange={setDonationType}>
              <SelectTrigger id="donation-type" className="w-full">
                <SelectValue placeholder="Select donation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one-time">{t.bookingForm.adult}</SelectItem>
                <SelectItem value="monthly">{t.bookingForm.child}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Amount */}
          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium">
              {t.bookingForm.children}
            </label>
            <Select value={amount} onValueChange={setAmount}>
              <SelectTrigger id="amount" className="w-full">
                <SelectValue placeholder="Select amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">£25</SelectItem>
                <SelectItem value="50">£50</SelectItem>
                <SelectItem value="100">£100</SelectItem>
                <SelectItem value="250">£250</SelectItem>
                <SelectItem value="500">£500</SelectItem>
                <SelectItem value="1000">£1000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Button type="submit" className="w-full btn-primary relative">
        {submitted ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            {t.bookingForm.bookingConfirmed}
          </>
        ) : (
          <>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {t.bookingForm.checkAvailability}
          </>
        )}
      </Button>
    </form>
  );
}