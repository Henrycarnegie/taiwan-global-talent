const stats = [
    ['2,500+', 'global talents'],
    ['180+', 'hiring partners'],
    ['45+', 'universities'],
    ['1,200+', 'open opportunities'],
];

export default function Stats() {
    return (
        <section className="bg-[#173b36] px-5 py-7 text-[#fffaf0] sm:px-8">
            <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/15 md:grid-cols-4">
                {stats.map(([value, label]) => (
                    <div key={label} className="px-4 py-5 text-center">
                        <p className="font-serif text-3xl font-black sm:text-5xl">
                            {value}
                        </p>
                        <p className="mt-1 text-xs font-bold tracking-widest text-[#b7d0c8] uppercase">
                            {label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
