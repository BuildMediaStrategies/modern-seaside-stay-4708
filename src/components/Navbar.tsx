import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Our Impact", path: "/apartments" },
    { name: "Research Areas", path: "/amenities" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Team", path: "/team" },
    { name: "Contact", path: "/contact" },
  ];

  const linkBase =
    "px-3 py-2 text-sm md:text-[15px] font-medium text-black no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const linkUnderline = "nav-underline nav-underline-hover after:bg-primary";
  const linkClass = (extra = "") => [linkBase, linkUnderline, extra].join(" ");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-white/80 backdrop-blur-lg py-1 md:py-0.5 shadow-md"
      )}
    >
      <nav className="container flex justify-between items-center">
        <div className="flex items-center space-x-2 ml-4">
          <Link to="/" className="flex items-center">
            <img
              src="/brand/ucl-logo@2x.png"
              alt="Cure Cancer @ UCL Logo"
              className="h-28 md:h-36 lg:h-44 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <li key={link.name} className="relative">
              <Link to={link.path} className={linkClass("md:text-base md:px-3 md:py-1.5")}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center space-x-2">
          <Button asChild className="btn-primary" size="sm">
            <Link to="/donate">Donate Now</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-black" />
            ) : (
              <Menu className="h-6 w-6 text-black" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white/80 backdrop-blur-sm md:hidden transition-opacity duration-300",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className={cn(
            "fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white shadow-xl p-6 transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex justify-between mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <ul className="space-y-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-lg font-medium text-black transition-colors hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild className="w-full btn-primary mt-6">
              <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>
                Donate Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}