import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../../../public/logoweb.jpeg';

export const IntroSection = ({ onServiceClick }) => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [cubes, setCubes] = useState([]);

    useEffect(() => {
        // Generate random cubes on mount
        const newCubes = Array.from({ length: 100 }).map((_, index) => ({
            id: index,
            xMul: (Math.random() - 0.5) * 60,
            yMul: (Math.random() - 0.5) * 60,
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: 10 + Math.random() * 40,
            shape: Math.random() > 0.5 ? 'rounded-xl' : 'rounded-full',
            opacity: (Math.random() * 0.3 + 0.05).toFixed(2),
            rotate: Math.random() > 0.7 ? 'rotate-45' : '',
        }));
        setCubes(newCubes);
    }, []);

    // 👇 Auto-move offset over time
    useEffect(() => {
        let frameId;
        let angle = 0;

        const animate = () => {
            angle += 0.01; // 🔥 Faster speed
            const x = Math.sin(angle);
            const y = Math.cos(angle);
            setOffset({ x, y });
            frameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <motion.section
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="relative overflow-hidden min-h-screen w-full flex flex-col justify-center items-center text-white text-center px-4"
            style={{
                backgroundColor: 'hsl(181, 56%, 34%)',
                fontFamily: 'Poppins, sans-serif',
            }}
        >
            {/* Parallax Cubes */}
            {cubes.map((cube) => (
                <div
                    key={cube.id}
                    className={`absolute z-0 ${cube.shape} ${cube.rotate}`}
                    style={{
                        width: `${cube.size}px`,
                        height: `${cube.size}px`,
                        backgroundColor: `rgba(255,255,255,${cube.opacity})`,
                        top: `${cube.top}%`,
                        left: `${cube.left}%`,
                        transform: `translate3d(${offset.x * cube.xMul}px, ${offset.y * cube.yMul}px, 0)`,
                        transition: 'transform 0.2s linear',
                    }}
                />
            ))}

            {/* Foreground Content */}
            <div className="relative flex flex-col items-center z-10">
                <img
                    src={logo}
                    alt="Avtoraqam logo"
                    className="w-32 h-32 rounded-[10px] md:w-40 md:h-40 mb-6 drop-shadow-xl"
                />

                <h1 className="text-xl md:text-3xl font-semibold font-poppins max-w-xl mb-8">
                    Avtoraqam705 siz bizning xizmatdan foydalangan holda ishingizni osonlashtirasiz
                </h1>

                <button
                    onClick={onServiceClick}
                    className="px-6 py-3 bg-white text-[#258385] font-semibold rounded-full shadow-md hover:bg-gray-100 transition"
                >
                    Xizmatlar
                </button>
            </div>
        </motion.section>
    );
};
