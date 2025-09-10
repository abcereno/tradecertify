import React, { useState, useEffect, useRef } from 'react';
import { Users, ShieldCheck } from 'lucide-react';
import useInView from '@/hooks/useInView'; // Import the new reusable hook

// --- The Reusable Animated Counter ---
const AnimatedCounter = ({ targetValue, duration = 2000, startAnimation }: { targetValue: number, duration?: number, startAnimation: boolean }) => {
        const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref);

    useEffect(() => {
        if (!startAnimation) return; // Only start when the parent is in view
        
        // ... (the rest of the counter animation logic remains the same)
       let start = 0;
        const end = targetValue;
        const incrementTime = 20; // Update every 20ms
        const totalSteps = duration / incrementTime;
        const increment = end / totalSteps;
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, 20);

        return () => clearInterval(timer);
    }, [startAnimation, targetValue, duration]);

    return <span className="elementor-counter-number">{count.toLocaleString()}</span>;
};


// --- The Main Component ---
const Stats: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { triggerOnce: true }); // Use the hook here

    return (
        // Apply the animation classes
        <section 
            ref={sectionRef} 
            className={`py-12 sm:py-16 bg-[#FDB715] animate-on-scroll ${isInView ? 'is-visible' : ''}`}
        >
            <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                    CUSTOMER SATISFACTION
                </h2>
                <p className="mt-4 text-lg text-slate-800 max-w-3xl mx-auto">
                    Our promise to you is that we will refund you the full amount if the RTOs deem your application incompetent.
                </p>
                
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-8">
                    {/* Stat 1 */}
                    <div className="flex flex-col items-center">
                        <ShieldCheck className="w-12 h-12 text-slate-900 mb-4" />
                        <div className="text-5xl font-bold text-slate-900">
                           {/* Pass the isInView boolean to the counter */}
                           <AnimatedCounter targetValue={3459} startAnimation={isInView} />+
                        </div>
                        <p className="mt-2 text-lg text-slate-800 font-semibold">
                           Skilled Workers Recognised
                        </p>
                    </div>

                    {/* Stat 2 */}
                    <div className="flex flex-col items-center">
                        <Users className="w-12 h-12 text-slate-900 mb-4" />
                        <div className="text-5xl font-bold text-slate-900">
                           <AnimatedCounter targetValue={4000} startAnimation={isInView} />+
                        </div>
                        <p className="mt-2 text-lg text-slate-800 font-semibold">
                           Successful Outcomes
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;