import React from 'react';

const Header = ({ setLanguage, language }) => {
  return (
    <header className="py-4 mb-10 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md flex md:hidden w-full">
      <div className="flex justify-between items-center w-full max-w-5xl mx-auto px-4">
        {/* Logo Section */}
        <div className="text-xl font-extrabold text-white tracking-wide">MyLogo</div>

        {/* Language Selection */}
        <div className="flex space-x-2">
          {['uz', 'eng', 'ru'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`relative py-2 px-4 rounded-md text-base font-semibold transition-all duration-300 border-2 overflow-hidden 
                ${language === lang ? 'bg-yellow-500 text-black border-yellow-600 shadow-lg' : 'bg-transparent text-white border-white hover:bg-white hover:text-blue-700'}
                active:scale-95`}
            >
              {lang === 'uz' ? "O'zbek" : lang === 'eng' ? "English" : "Русский"}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
