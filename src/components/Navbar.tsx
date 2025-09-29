"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; 


export const Navbar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav>
      <nav className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md text-white z-50">
		<div className="max-w-6xl mx-auto flex justify-around items-center h-16 px-6">
			<div className="opacity-0 flex-1">spacing</div>
			<Link href="/" className="text-xl w-32 flex-none">
				智慧角落
			</Link>
			<div className="opacity-0 flex-4">spacing</div>
			<div className="hidden md:flex">
				<Link href="/" className="text-xl w-32 flex-none">
					部落格
				</Link>
				<Link href="/" className="text-xl w-32 flex-none">
					論壇
				</Link>
			</div>
			<button
			className="md:hidden p-2 rounded hover:bg-white/10 focus:outline-none"
			onClick={() => setIsOpen(!isOpen)}
			>
			{isOpen ? <X size={28} /> : <Menu size={28} />}
			</button>
		</div>
		{isOpen && (
			<div className="md:hidden absolute top-16 left-0 w-full bg-black/90 flex flex-col items-center space-y-6 py-6">
			<Link href="/" onClick={() => setIsOpen(false)} className="hover:text-gray-300">
				部落格
			</Link>
			<Link href="/" onClick={() => setIsOpen(false)} className="hover:text-gray-300">
				論壇
			</Link>
			</div>
		)}
	  </nav>
    </nav>
  );
};