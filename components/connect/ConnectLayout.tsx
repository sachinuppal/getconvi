"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function ConnectLayout() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Integrate form backend here
    };

    return (
        <div className="pt-20 min-h-screen flex flex-col lg:flex-row">

            {/* Left: Value Prop */}
            <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-surface-50 border-b lg:border-b-0 lg:border-r border-gray-200">
                <h1 className="text-4xl md:text-6xl font-heading font-medium tracking-tight mb-8">
                    Start a project.
                </h1>
                <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-lg">
                    We operate as a partner, not a vendor. Tell us what you're building, and we'll tell you if we're the right engine to power it.
                </p>

                <div className="space-y-6">
                    <div className="flex gap-4">
                        <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs shrink-0">1</span>
                        <div>
                            <h3 className="font-bold">24hr Analysis</h3>
                            <p className="text-sm text-gray-500">We review briefs daily. No multi-week sales calls.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs shrink-0">2</span>
                        <div>
                            <h3 className="font-bold">System Architecture</h3>
                            <p className="text-sm text-gray-500">We don't just quote price; we propose a system.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs shrink-0">3</span>
                        <div>
                            <h3 className="font-bold">Execution Sprint</h3>
                            <p className="text-sm text-gray-500">If we agree, we start building immediately.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Form */}
            <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-white">
                {!submitted ? (
                    <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto space-y-6">
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Name</label>
                            <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded focus:border-black focus:ring-0 outline-none transition-colors" placeholder="Jane Doe" required />
                        </div>
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Work Email</label>
                            <input type="email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded focus:border-black focus:ring-0 outline-none transition-colors" placeholder="jane@company.com" required />
                        </div>
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">What are you building?</label>
                            <textarea rows={4} className="w-full p-4 bg-gray-50 border border-gray-200 rounded focus:border-black focus:ring-0 outline-none transition-colors" placeholder="Describe the outcome you need..." required />
                        </div>

                        <button type="submit" className="w-full py-4 bg-electric-blue text-white font-bold rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group">
                            Send Brief <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <p className="text-xs text-center text-gray-400">
                            Protected by reCAPTCHA. Privacy Policy applies.
                        </p>
                    </form>
                ) : (
                    <div className="text-center max-w-md mx-auto">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Received.</h3>
                        <p className="text-gray-500">
                            We've got your brief. Our team will review it and reply within 24 hours.
                        </p>
                    </div>
                )}
            </div>

        </div>
    );
}
