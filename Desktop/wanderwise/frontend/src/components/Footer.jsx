import { Globe, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-teal-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
       
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold text-white">WanderWise</span>
            </div>
            <p className="text-teal-100 mb-4 max-w-md">
              A hackathon project designed to make travel planning smarter and more interactive. Explore new places, connect with people, and track real-time travel insights.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-teal-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-teal-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-teal-300 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-teal-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

     
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Project</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-teal-100 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-teal-100 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-teal-100 hover:text-white transition-colors">Tech Stack</a></li>
              <li><a href="#" className="text-teal-100 hover:text-white transition-colors">Contributors</a></li>
            </ul>
          </div>

          
        </div>

        <div className="pt-6 border-t border-teal-800 text-center text-sm">
          <p className="text-teal-300">
            Built with ❤️ for WiSE hackathon - {new Date().getFullYear()} WanderWise.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
