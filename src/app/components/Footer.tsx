import adNoirLogoWhite from "../../imports/logo_blanco_adnoir.png";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-1">
            <ImageWithFallback src={adNoirLogoWhite} alt="AD NOIR" className="h-20 lg:h-28 mb-8 object-contain" />
            <p className="text-white/40 text-xs leading-relaxed max-w-xs font-normal">
              Private real estate investment firm specializing in institutional-grade acquisitions and development across premier U.S. markets.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase font-medium mb-8 text-white/80 tracking-wide">Navigation</h4>
            <ul className="space-y-4 text-sm font-normal text-white/50">
              <li><button className="hover:text-white transition-colors" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>Home</button></li>
              <li><button className="hover:text-white transition-colors" onClick={() => document.getElementById('about')?.scrollIntoView({behavior:'smooth'})}>About</button></li>
              <li><button className="hover:text-white transition-colors" onClick={() => document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}>Projects</button></li>
              <li><Link className="hover:text-white transition-colors" to="/portal">Investor Portal</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase font-medium mb-8 text-white/80 tracking-wide">Expertise</h4>
            <ul className="space-y-4 text-sm font-normal text-white/50">
              <li>Capital Markets</li>
              <li>Asset Management</li>
              <li>Development</li>
              <li>Underwriting</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase font-medium mb-8 text-white/80 tracking-wide">Legal</h4>
            <ul className="space-y-4 text-sm font-normal text-white/50">
              <li>Privacy Policy</li>
              <li>Terms of Use</li>
              <li>Investment Disclaimer</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/40 font-medium">
            © {new Date().getFullYear()} AD NOIR INVESTMENT GROUP. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-xs text-white/40 font-medium">
            <a href="#" className="hover:text-white transition-colors"><Linkedin size={24} /></a>
            <a href="#" className="hover:text-white transition-colors"><Instagram size={24} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
