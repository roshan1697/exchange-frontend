"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Zap } from "lucide-react"
import { Button } from "../core/button-shadcn"

const slides = [
    {
        title: "Lend USD. Earn 3.88% APY. Get points.",
        subtitle: "Lend USD to start earning high yield while using as collateral for trading.",
        cta: "Lend USD",
        image: "dollar",
    },
    {
        title: "Trade BTC Perpetuals. Up to 20x leverage.",
        subtitle: "Access deep liquidity and tight spreads on Bitcoin perpetual contracts.",
        cta: "Trade Now",
        image: "bitcoin",
    },
    {
        title: "Earn rewards. Refer friends. Get bonuses.",
        subtitle: "Invite friends to Backpack and earn up to 40% of their trading fees.",
        cta: "Start Earning",
        image: "gift",
    },
]

export function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    return (
        <div className="relative mx-6 my-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] overflow-hidden">
            <div className="flex items-center justify-between px-12 py-16">
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors z-10"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>

                <div className="flex-1 max-w-xl">
                    <h1 className="text-4xl font-bold text-white mb-4 text-balance">{slides[currentSlide].title}</h1>
                    <p className="text-gray-400 text-lg mb-6">{slides[currentSlide].subtitle}</p>
                    <Button className="bg-white text-black hover:bg-gray-200 rounded-lg px-6 py-2 font-medium">
                        {slides[currentSlide].cta}
                    </Button>
                </div>

                <div className="relative w-96 h-60">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>

                            <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                                <div className="w-56 h-56 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" fill="white" className="w-32 h-32">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="absolute top-1/4 -right-8 animate-bounce">
                                <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                            </div>
                            <div className="absolute bottom-1/4 -left-8 animate-bounce delay-150">
                                <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                            </div>
                            <div className="absolute top-1/2 right-0 animate-bounce delay-300">
                                <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                            </div>

                            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-transparent via-green-500/30 to-transparent rounded-full blur-sm"></div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors z-10"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 pb-6">
                {[...Array(7)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i % slides.length)}
                        className={`w-2 h-2 rounded-full transition-colors ${i === 4 ? "bg-white" : "bg-gray-600"}`}
                    />
                ))}
            </div>
        </div>
    )
}   
