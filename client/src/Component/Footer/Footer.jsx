import React from 'react';
import { Heart, Dumbbell } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-purple-500/20 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Dumbbell className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              GymPro
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-400">
            Md Mirajul Islam
          </div>
          
          <div className="text-gray-400 text-sm mt-4 md:mt-0">
            © 2024 GymPro. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;