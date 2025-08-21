
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white text-slate-900 pt-16 pb-8 border-t">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="animate-fade-in [animation-delay:100ms]">
            <h4 className="text-xl font-bold mb-4">MareSereno</h4>
            <p className="text-muted-foreground mb-4">
              Cure Cancer @ UCL funds cutting-edge research into Non-Hodgkin's Lymphoma, supporting world-class researchers and driving innovation in cancer diagnostics and therapies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          
          <div className="animate-fade-in [animation-delay:200ms]">
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Our Impact", path: "/apartments" },
                { name: "Research Areas", path: "/amenities" },
                { name: "Wishlist", path: "/wishlist" },
                { name: "Contact", path: "/contact" },
                { name: "Donate Now", path: "/booking" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-fade-in [animation-delay:300ms]">
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 text-primary" />
                <span className="text-muted-foreground">
                  123 Seaside Boulevard<br />
                  Costa Bella, 12345<br />
                  Italy
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                <span className="text-muted-foreground">+39 123 4567 890</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                <span className="text-muted-foreground">info@maresereno.com</span>
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in [animation-delay:400ms]">
            <h4 className="text-xl font-bold mb-4">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for research updates and charity news.
            </p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="rounded-md px-4 py-2 bg-muted text-foreground"
                required 
              />
              <button 
                type="submit" 
                className="btn-primary mt-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 mt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} MareSereno. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
