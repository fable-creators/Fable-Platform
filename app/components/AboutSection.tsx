import React from 'react';
import Image from 'next/image';

const AboutSection: React.FC = () => {
  return (
    <div className="w-full bg-[#0f0620]" style={{minHeight: '100vh'}}>
      <div className="about-section py-4 w-full">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="about-section__content text-center">
            <div className="about-section__content__title-wrap mb-8">
              <h1 className="about-section__content__title title-h1 font-sans text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                About
              </h1>
              <div className="w-full">
                <Image
                  src="/devider_v2.png"
                  alt="Decorative divider"
                  width={1920}
                  height={20}
                  className="w-full h-auto"
                />
              </div>
              <div className="line opacity-100 visible w-24 h-px bg-white mx-auto"></div>
            </div>
            <div className="text-left md:text-center">
              <p className="about-section__content__text desc-2 text-white mb-8">
                Welcome to Fable, a revolutionary platform where imagination meets blockchain technology. 
                Dive into a world where your stories come to life, powered by cutting-edge NFTs and 
                decentralized narratives. Create, trade, and experience tales like never before, as you 
                become part of an ever-evolving tapestry of digital storytelling. With Fable, every 
                choice you make shapes the narrative, every character you craft becomes a unique asset, 
                and every adventure you embark upon leaves an indelible mark on our shared digital realm.
              </p>
              <p className="about-section__content__text desc-2 text-white">
                Join us in redefining the boundaries of interactive storytelling, where your creativity 
                is the currency and the possibilities are limitless. Welcome to Fable - where your 
                stories truly belong to you.
              </p>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
};

export default AboutSection;