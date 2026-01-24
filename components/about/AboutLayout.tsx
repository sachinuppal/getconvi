export default function AboutLayout() {
    return (
        <div className="min-h-screen bg-white pt-32 pb-24">

            {/* Intro */}
            <section className="px-6 mb-24">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-8">
                        We execute.
                    </h1>
                    <p className="text-2xl text-gray-500 font-light leading-relaxed max-w-3xl mx-auto">
                        Getconvi is not an agency. It is an operating company that builds, scales, and monetizes systems for the internet economy.
                    </p>
                </div>
            </section>

            {/* Image / Banner Placeholder */}
            <section className="px-6 mb-24">
                <div className="max-w-6xl mx-auto aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 font-mono">Team/Office Image Placeholder</span>
                </div>
            </section>

            {/* Principles */}
            <section className="bg-black text-white py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xs font-mono uppercase tracking-widest text-electric-blue mb-12">Operating Principles</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Systems &gt; Goals</h3>
                            <p className="text-gray-400">We don't believe in heroic sprints. We believe in building boring, reliable loops that compound over time.</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Proof &gt; Slides</h3>
                            <p className="text-gray-400">We never pitch what we haven't built. Our "Studios" exist to prove our technology works before we sell it.</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Speed is Safety</h3>
                            <p className="text-gray-400">In the AI era, moving slow is the biggest risk. We deploy daily, test in production, and iterate live.</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Own the Outcome</h3>
                            <p className="text-gray-400">We aren't advisors. We are operators. We tie our incentives to the performance of the systems we build.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team / Credibility */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-heading font-medium mb-12">Built by builders.</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
                        Founded by engineers, product leaders, and growth architects who have scaled products to 100M+ users.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {/* Placeholders for team logos/faces */}
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-square bg-surface-50 rounded-full flex items-center justify-center text-gray-300">
                                Img
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
