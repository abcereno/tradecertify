import { Link } from 'react-router-dom';
import RplCtaButton from './RplCtaButton';
import logo from "../assets/logo.png";
import { useGtagConversion } from "@/hooks/useGtagConversion";
const Header: React.FC = () => {

  const { triggerConversion } = useGtagConversion();
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-[#373b40]">
              <Link to="/">
                <img loading="lazy" height={40} width={120} src={logo} alt="Trade Certify" />
              </Link>
            </div>
          </div>
          
<nav className="hidden md:flex space-x-8">
  <Link to="/#services" className="text-[#373b40] hover:text-[#D19D13] font-medium transition-colors">Services</Link>
  <Link to="/#process" className="text-[#373b40] hover:text-[#D19D13] font-medium transition-colors">How It Works</Link>
  <Link to="/#testimonials" className="text-[#373b40] hover:text-[#D19D13] font-medium transition-colors">Success Stories</Link>
  <Link to="/#contact" className="text-[#373b40] hover:text-[#D19D13] font-medium transition-colors">Contact</Link>
</nav>

          <div className="flex items-center space-x-4">
            <p>  <a
        href="tel:1300403081"
        onClick={(e) => {
          e.preventDefault();
          triggerConversion("tel:1300403081");
        }}
        className="text-blue-600 hover:underline"
      >
        📞 1300 403 081
      </a>
  </p>
            <RplCtaButton
  label="Get Started"
  size="sm"
  variant="primary"
  formSrc="https://api.leadconnectorhq.com/widget/survey/hMCYKu5d6Ir83sjyduPH"
  title="Get Started"
  height="600px"
/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;