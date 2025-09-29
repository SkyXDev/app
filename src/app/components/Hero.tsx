"use client"

import React from 'react'
import Image from 'next/image'
import {motion, vh} from "framer-motion"
import { FaFacebook, FaMapPin } from 'react-icons/fa'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const videos = [
  "https://uemrhhfhsztcbcrqvdjd.supabase.co/storage/v1/object/public/hero-videos/6929265-hd_1920_1080_30fps.mp4",
];

export const Hero = () => {
  return (
	

  <section className="relative h-screen flex flex-col items-center justify-center text-center text-white ">
    <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
        <video
          className="min-w-full min-h-full absolute object-cover"
          autoPlay
          muted
          loop
        >
          <source
            src="https://uemrhhfhsztcbcrqvdjd.supabase.co/storage/v1/object/public/hero-videos/6929265-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>
    </div>
    <div className="video-content space-y-2 z-10">
        <h1 className="font-light text-6xl">full Hero Video</h1>
        <h3 className="font-light text-3xl">with TailwindCSS</h3>
    </div>
</section>
  )
}
