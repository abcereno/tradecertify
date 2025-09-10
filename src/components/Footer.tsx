import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Instagram } from "lucide-react"; // Import social icons
import logo from "../assets/logo.png";
import { TRADE_PAGE_CONTENT } from "@/data/trades"; // Import your single source of truth for trades

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1: Brand and Social */}
          <div>
            <Link to="/" className="mb-4 inline-block">
              <img 
                loading="lazy" 
                height={60} // Adjusted for better proportion
                width={180}
                src={logo} 
                alt="Trade Certify Logo" 
              />
            </Link>
            <p className="text-slate-400 mb-6">
              Helping tradies get qualified through Recognition of Prior Learning.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/tradecertifyau" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-400 hover:text-amber-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/company/trade-certify/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-amber-500 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/tradecertify/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-amber-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Column 2: Services (Dynamically Generated) */}
          <div>
            {/* ACCESSIBILITY: Changed <h4> to <h3> */}
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {TRADE_PAGE_CONTENT.slice(0, 6).map(trade => ( // Show first 4 trades
                <li key={trade.slug}>
                  <Link
                    to={`/services/${trade.slug}`}
                    className="hover:text-amber-500 transition-colors"
                  >
                    {trade.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/whats-rpl" className="hover:text-amber-500 transition-colors">What is RPL?</Link></li>
              <li><Link to="/faq" className="hover:text-amber-500 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <div className="space-y-2">
              <p>📞 1300 403 081</p>
              <p>✉️ info@tradecertify.com.au</p>
              <p>📍 Unit 6, 178 Princess Highway<br /> Arncliffe NSW 2205</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400 text-sm">
           <p className="mb-4">
 All qualifications are nationally recognised and are issued by Registered Training Organisations (RTOs) in accordance with regulatory requirements.          </p>
          <p>
            &copy; {new Date().getFullYear()} Trade Certify. All rights reserved. | 
            <Link to="/privacy" className="hover:text-amber-500 underline-offset-2 hover:underline mx-2">Privacy Policy</Link> |
            <Link to="/terms" className="hover:text-amber-500 underline-offset-2 hover:underline ml-2">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;