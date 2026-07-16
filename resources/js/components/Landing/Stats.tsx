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
            return;
        }

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
            className="border-y border-[#173b8f]/10 bg-[#fbfaf7] py-10"
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
                        className="rounded-md border border-[#173b8f]/12 bg-white p-6 text-center text-[#173b8f] shadow-sm transition-colors hover:border-[#f47b20]/40"
                    >
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-[#173b8f]/8">
                            <stat.icon className="h-6 w-6 text-[#173b8f]" />
                        </div>

                        <h3 className="text-3xl font-extrabold text-[#173b8f]">
                            <AnimatedNumber
                                value={stat.value}
                                suffix={stat.suffix}
                                shouldAnimate={animationRun > 0}
                                animationRun={animationRun}
                            />
                        </h3>

                        <p className="mt-1 text-sm font-semibold text-[#173b8f]/62">
                            {stat.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
