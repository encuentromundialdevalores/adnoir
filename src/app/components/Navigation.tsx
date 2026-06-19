import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X, User } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import adNoirLogo from "../../imports/logo_negro_adnoir.png";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/#" + id);
      return;
    }
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-6 bg-white/90 backdrop-blur-md border-b border-black/5" : "py-12 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 h-12 lg:h-16 overflow-visible">
            <ImageWithFallback
              src={adNoirLogo}
              alt="AD NOIR"
              className="h-[120%] lg:h-[160%] w-auto object-contain scale-[1.1] lg:scale-[1.3] origin-left"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-16">
            {["About", "Projects"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-sm uppercase font-semibold tracking-widest hover:text-black/60 transition-colors duration-300"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="text-sm uppercase font-semibold tracking-widest text-white bg-black px-10 py-5 rounded-full hover:bg-black/80 transition-all duration-300 shadow-xl"
            >
              Contact
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-black"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden bg-white ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-10">
          {["About", "Projects"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-2xl uppercase font-semibold"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="mt-4 text-sm uppercase font-semibold text-white bg-black rounded-full px-10 py-5"
          >
            Contact
          </button>
        </div>
      </div>
    </>
  );
}
