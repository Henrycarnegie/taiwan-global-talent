import { motion, useReducedMotion } from 'framer-motion';
import {
    Building2,
    BriefcaseBusiness,
    GraduationCap,
    Users,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const stats = [
    {
        label: 'Students',
        value: 2500,
        suffix: '+',
        icon: Users,
    },
    {
        label: 'Companies',
        value: 180,
        suffix: '+',
        icon: Building2,
    },
    {
        label: 'Universities',
        value: 45,
        suffix: '+',
        icon: GraduationCap,
    },
    {
        label: 'Opportunities',
        value: 1200,
        suffix: '+',
        icon: BriefcaseBusiness,
    },
];

type AnimatedNumberProps = {
    value: number;
    suffix: string;
    shouldAnimate: boolean;
    animationRun: number;
};

const AnimatedNumber = ({
    value,
    suffix,
    shouldAnimate,
    animationRun,
}: AnimatedNumberProps) => {
    const [currentValue, setCurrentValue] = useState(0);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (!shouldAnimate) {
            return;
        }

        if (prefersReducedMotion) {
            setCurrentValue(value);

            return;
        }

        setCurrentValue(0);

        let animationFrame = 0;
        const duration = 1200;
        const startedAt = performance.now();

        const updateValue = (timestamp: number) => {
            const progress = Math.min((timestamp - startedAt) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setCurrentValue(Math.round(value * easedProgress));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(updateValue);
            }
        };

        animationFrame = requestAnimationFrame(updateValue);

        return () => cancelAnimationFrame(animationFrame);
    }, [animationRun, prefersReducedMotion, shouldAnimate, value]);

    const displayedValue =
        prefersReducedMotion && shouldAnimate ? value : currentValue;

    return (
        <>
            {new Intl.NumberFormat('en-US').format(displayedValue)}
            {suffix}
        </>
    );
};

const Stats = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const secondRunTimeoutRef = useRef<number | null>(null);
    const [animationRun, setAnimationRun] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimationRun(1);

                    secondRunTimeoutRef.current = window.setTimeout(() => {
                        setAnimationRun(2);
                    }, 30000);

                    observer.disconnect();
                }
            },
            {
                root: null,
                rootMargin: '0px 0px 180px 0px',
                threshold: 0.12,
            },
        );

        observer.observe(section);

        return () => {
            observer.disconnect();

            if (secondRunTimeoutRef.current) {
                window.clearTimeout(secondRunTimeoutRef.current);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="border-y border-[#173b8f]/10 bg-white py-10"
        >
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 md:grid-cols-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={`${stat.label}-${animationRun}`}
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={
                            animationRun > 0
                                ? { opacity: 1, y: 0, scale: 1 }
                                : undefined
                        }
                        transition={{
                            delay: i * 0.08,
                            duration: 0.65,
                            ease: 'easeOut',
                        }}
                        className="rounded-lg border border-[#173b8f]/20 bg-[#173b8f] p-6 text-center text-white shadow-[0_16px_45px_rgba(23,59,143,0.18)] transition-all hover:-translate-y-1"
                    >
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/12">
                            <stat.icon className="h-6 w-6 text-white" />
                        </div>

                        <h3 className="text-3xl font-black text-white">
                            <AnimatedNumber
                                value={stat.value}
                                suffix={stat.suffix}
                                shouldAnimate={animationRun > 0}
                                animationRun={animationRun}
                            />
                        </h3>

                        <p className="mt-1 text-sm font-black text-white/75">
                            {stat.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
