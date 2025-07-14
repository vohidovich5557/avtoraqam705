import { useRef } from 'react';
import { IntroSection } from "../../modules/intro-section/index.jsx";
import { ServiceSection } from "../../modules/service-section/index.jsx";

export const MainPage = () => {
    const serviceRef = useRef(null);

    const scrollToServiceSection = () => {
        serviceRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="w-full flex flex-col items-center gap-[20px] h-full">
            <div className="w-full h-full">
                <IntroSection onServiceClick={scrollToServiceSection} />
            </div>
            <div className="w-full h-full" ref={serviceRef}>
                <ServiceSection />
            </div>
        </div>
    );
};
