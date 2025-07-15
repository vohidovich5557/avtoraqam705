import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AvtoraqamForm } from './components/AvtoraqamForm.jsx';
import { TanirovkaForm } from './components/TanirovkaForm.jsx';

const generateCubes = (count = 12) => {
    return new Array(count).fill(0).map((_, i) => ({
        id: i,
        size: Math.floor(Math.random() * 30) + 20,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5,
    }));
};

export const ServiceSection = () => {
    const [activeTab, setActiveTab] = useState('avtoraqam');
    const [cubes, setCubes] = useState([]);

    useEffect(() => {
        setCubes(generateCubes(100));
    }, []);

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden">
            {/* 🟩 Green Animated Background Cubes */}
            {cubes.map((cube) => (
                <motion.div
                    key={cube.id}
                    initial={{ y: 0 }}
                    animate={{ y: [0, 20, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5 + cube.delay,
                        ease: 'easeInOut',
                        delay: cube.delay,
                    }}
                    className="absolute z-0 rounded-lg opacity-10"
                    style={{
                        width: `${cube.size}px`,
                        height: `${cube.size}px`,
                        backgroundColor: '#258385',
                        top: `${cube.top}%`,
                        left: `${cube.left}%`,
                    }}
                />
            ))}

            <div className="w-[90%] md:w-[50%] flex flex-col items-center gap-[10px] h-[80%] border rounded-[10px] border-[#258385]/50 shadow-md shadow-[#258385] p-[20px] bg-white relative z-10">
                {/* Toggle Header */}
                <div className="w-full flex justify-between p-1 rounded-[10px] border border-[#258385]/50 bg-white">
                    <button
                        onClick={() => setActiveTab('avtoraqam')}
                        className={`w-1/2 py-2 rounded-[8px] font-semibold transition-all ${
                            activeTab === 'avtoraqam'
                                ? 'bg-[#258385] text-white shadow'
                                : 'text-[#258385] hover:bg-[#258385]/10'
                        }`}
                    >
                        Avtoraqam
                    </button>
                    <button
                        onClick={() => setActiveTab('tanirovka')}
                        className={`w-1/2 py-2 rounded-[8px] font-semibold transition-all ${
                            activeTab === 'tanirovka'
                                ? 'bg-[#258385] text-white shadow'
                                : 'text-[#258385] hover:bg-[#258385]/10'
                        }`}
                    >
                        Tanirovka
                    </button>
                </div>

                {/* Animated Form Content */}
                <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {activeTab === 'avtoraqam' ? (
                            <motion.div
                                key="avtoraqam"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.4 }}
                                className="absolute w-full h-full flex justify-center items-center text-[#258385] font-medium"
                            >
                                <AvtoraqamForm />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="tanirovka"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                                className="absolute w-full h-full flex justify-center items-center text-[#258385] font-medium"
                            >
                                <TanirovkaForm />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
