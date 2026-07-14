import { motion, useInView, useReducedMotion } from 'framer-motion';
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
};

const AnimatedNumber = ({
    value,
    suffix,
    shouldAnimate,
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
    }, [prefersReducedMotion, shouldAnimate, value]);

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
    const isInView = useInView(sectionRef, {
        once: true,
        margin: '0px 0px 160px 0px',
    });

    return (
        <section
            ref={sectionRef}
            className="border-y-4 border-[#173b8f] bg-[#173b8f] py-10"
        >
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 md:grid-cols-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 28 }}
                        animate={isInView ? { opacity: 1, y: 0 } : undefined}
                        transition={{
                            delay: i * 0.08,
                            duration: 0.55,
                            ease: 'easeOut',
                        }}
                        className="rounded-lg border-2 border-white/20 bg-white p-6 text-center shadow-[5px_5px_0_#ffcb05] transition-all hover:-translate-y-1"
                    >
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#fff7d7]">
                            <stat.icon className="h-6 w-6 text-[#f47b20]" />
                        </div>

                        <h3 className="text-3xl font-black text-[#173b8f]">
                            <AnimatedNumber
                                value={stat.value}
                                suffix={stat.suffix}
                                shouldAnimate={isInView}
                            />
                        </h3>

                        <p className="mt-1 text-sm font-black text-[#173b8f]/65">
                            {stat.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
