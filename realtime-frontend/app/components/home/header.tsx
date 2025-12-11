import { Search } from "lucide-react"
import { Button } from "../core/button-shadcn"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../core/dropdown-menu"
import { ChevronDown } from "lucide-react"

export function Header() {
    return (
        <div className="bg-bgbasebackground10 sticky top-0 z-20 w-full">

        <header className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a1a]">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-500 rounded-sm flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M12 2L4 10H20L12 2Z"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path d="M8 22V15C8 13.9 8.9 13 10 13H14C15.1 13 16 13.9 16 15V22" stroke="white" strokeWidth="2" />
                        </svg>
                    </div>
                    <span className="text-white font-semibold text-lg">Backpack</span>
                </div>
                <nav className="flex items-center gap-6">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Spot
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Futures
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Lend
                    </a>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 text-gray-400 hover:cursor-pointer hover:text-white transition-colors">
                            More <ChevronDown className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                            <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white focus:bg-[#2a2a2a]">
                                Rewards
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white focus:bg-[#2a2a2a]">
                                Referrals
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white focus:bg-[#2a2a2a]">
                                API
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search markets"
                        className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-10 pr-8 py-2 text-sm text-gray-300 placeholder:text-gray-500 w-64 focus:outline-none focus:border-[#3a3a3a]"
                        />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">/</span>
                </div>
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-transparent">
                    Log in
                </Button>
                <Button className="bg-white text-black hover:bg-gray-200 rounded-lg px-4">Sign up</Button>
            </div>
        </header>
                        </div>
    )
}
