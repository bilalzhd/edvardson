'use client'
import { useEffect, useState } from 'react';
import ChevronUp from './icons/ChevronUp';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const showThreshold = 300;
      setIsVisible(scrollY > showThreshold);
    };
    window.addEventListener('scroll', handleScroll);
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
        <div className='flex justify-center py-2 fixed right-5 z-30 bottom-5'>
          <button className="text-xs rounded-[50%] p-1 bg-black scroll-to-top-button text-center underline hover:decoration-none text-[#fff] flex items-center" onClick={scrollToTop}>
            <ChevronUp className="h-8 w-8" />
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
      <footer className="bg-black pt-8 pb-4">
        <div className='border-b border-white pb-8 mx-4 mb-10 pl-6 flex items-center'>
          <img src="/images/edvardsonlogow.png" alt="Edvardson" className='w-52' />
        </div>
        <div className="border-b border-white pb-12 flex flex-col items-center md:flex-row px-4 mx-4 text-white text-[13px]">
          <div className="md:w-1/4 flex flex-col justify-center px-4">
            <h5 className="pb-4">EDVARDSON SWEDEN AB</h5>
            <p>Skinnargränd 2 782 75 Malungsfors</p>
            <a href="mailto:info@edvardson.se">info@edvardson.se</a>
            <a href="tel:0703158536">070-315 85 36</a>
            <a href="/villkor-and-info">Villkor & info</a>
          </div>
          <div className="md:w-1/4 px-4 gap-4 flex justify-center flex-col">
            <h5>ORG/VAT NO</h5>
            <p>SE556833383401</p>
            <a href="/faq" className="block hover:underline">FAQ</a>
            <a href="/integritetspolicy" className="block hover:underline">Integritetspolicy</a>
          </div>
          <div className="md:w-1/4 px-4 flex gap-3 md:justify-center items-center">
            <a><img src="https://themes.abicart.com/components/tws-social-icons/1.1.11/files/assets/facebook-rounded_white.svg" alt="Facebook Icon" /></a>
            <a><img src="https://themes.abicart.com/components/tws-social-icons/1.1.11/files/assets/instagram-rounded_white.svg" alt="Instagram Icon" /></a>
          </div>
          <div className="md:w-1/4 px-4 flex md:justify-center">
            <img className="max-w-[250px] object-contain" src="https://cdn.klarna.com/1.0/shared/image/generic/badge/sv_se/checkout/short-white.png?width=510" alt="Klarna Payment" />
          </div>
        </div>
        <p className='text-white pt-4 text-center text-[13px]'>Copyright © 2024 Edvardson. Drivs av <a href='https://merakommunikation.se' className='hover:underline' rel='nofollow' target='_blank'>Merakommunikation</a></p>
      </footer>
    </>
  );
}

export default Footer;
