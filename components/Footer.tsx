'use client'
import { useEffect, useState } from 'react';
import ChevronUp from './icons/ChevronUp';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the button when the user scrolls down
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const showThreshold = 300;

      setIsVisible(scrollY > showThreshold);
    };

    // Attach the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <div className='flex justify-center py-2'>
          <button className="text-xs scroll-to-top-button text-center underline hover:decoration-none hover:text-white flex items-center text-gray-200" onClick={scrollToTop}>
            <ChevronUp className="h-3 w-3" />Tillbaka till toppen
          </button>
        </div>
      )}
    </>
  );
};

function Footer() {

  return (
    <>
      <ScrollToTopButton />
      <footer className="bg-black pt-10 pb-20">
        <div className="flex flex-col md:flex-row px-4 text-white text-[13px]">
          <div className="md:w-1/5 flex flex-col justify-center px-4">
            <h5 className="pb-4">EDVARDSON SWEDEN AB</h5>
            <p>Skinnargränd 2 782 75 Malungsfors</p>
            <a href="mailto:info@edvardson.se">info@edvardson.se</a>
            <a href="tel:0703158536">070-315 85 36</a>
            <a href="/villkor-and-info">Villkor & info</a>
          </div>
          <div className="md:w-1/5 px-4 gap-4 flex justify-center flex-col">
            <h5>ORG/VAT NO</h5>
            <p>SE556833383401</p>
            <a href="/faq" className="block hover:underline">FAQ</a>
            <a href="/integritetspolicy" className="block hover:underline">Integritetspolicy</a>
          </div>
          <div className="md:w-1/5 px-4 flex md:justify-center">
            <a><img src="https://themes.abicart.com/components/tws-social-icons/1.1.11/files/assets/facebook-rounded_white.svg" alt="Facebook Icon" /></a>
            <a><img src="https://themes.abicart.com/components/tws-social-icons/1.1.11/files/assets/instagram-rounded_white.svg" alt="Instagram Icon" /></a>
          </div>
          <div className="md:w-2/5 px-4 flex md:justify-center">
            <img className="max-w-[250px] object-contain" src="https://cdn.klarna.com/1.0/shared/image/generic/badge/sv_se/checkout/short-white.png?width=510" alt="Klarna Payment" />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
