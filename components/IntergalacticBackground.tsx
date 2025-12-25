'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Mesh Gradient Orbs Configuration
const ORBS = [
    { color: 'rgba(37, 99, 235, 0.4)', size: 600, x: 20, y: 20, duration: 25 },
    { color: 'rgba(139, 92, 246, 0.3)', size: 500, x: 70, y: 60, duration: 30 },
    { color: 'rgba(6, 182, 212, 0.25)', size: 450, x: 40, y: 80, duration: 35 },
    { color: 'rgba(236, 72, 153, 0.15)', size: 550, x: 85, y: 30, duration: 28 },
];

const IntergalacticBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Track mouse for spotlight effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Canvas Starfield
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;

        const stars: { x: number; y: number; z: number; size: number }[] = [];
        const numStars = 600;
        const speed = 0.03;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * w - w / 2,
                y: Math.random() * h - h / 2,
                z: Math.random() * w,
                size: Math.random() * 1.5
            });
        }

        let animationFrameId: number;

        const render = () => {
            ctx.fillStyle = 'rgba(3, 3, 8, 0.15)';
            ctx.fillRect(0, 0, w, h);

            // Stars
            ctx.fillStyle = '#ffffff';
            stars.forEach(star => {
                star.z -= speed * 15;
                if (star.z <= 0) {
                    star.z = w;
                    star.x = Math.random() * w - w / 2;
                    star.y = Math.random() * h - h / 2;
                }

                const k = 128.0 / star.z;
                const px = star.x * k + w / 2;
                const py = star.y * k + h / 2;

                if (px >= 0 && px <= w && py >= 0 && py <= h) {
                    const size = (1 - star.z / w) * 2;
                    const alpha = (1 - star.z / w) * 0.8;

                    ctx.globalAlpha = alpha;
                    ctx.beginPath();
                    ctx.arc(px, py, size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#030308]">
            {/* Animated Mesh Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                {ORBS.map((orb, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full blur-[100px]"
                        style={{
                            width: orb.size,
                            height: orb.size,
                            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                        }}
                        animate={{
                            x: [
                                `${orb.x}vw`,
                                `${orb.x + 15}vw`,
                                `${orb.x - 10}vw`,
                                `${orb.x}vw`
                            ],
                            y: [
                                `${orb.y}vh`,
                                `${orb.y - 20}vh`,
                                `${orb.y + 10}vh`,
                                `${orb.y}vh`
                            ],
                            scale: [1, 1.2, 0.9, 1],
                        }}
                        transition={{
                            duration: orb.duration,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Starfield Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none mix-blend-screen"
            />

            {/* Spotlight Effect Following Mouse */}
            <div
                className="pointer-events-none fixed inset-0 z-10 opacity-30 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.15), transparent 40%)`
                }}
            />

            {/* Noise Texture Overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)'
                }}
            />
        </div>
    );
};

export default IntergalacticBackground;
