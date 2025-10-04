"use client";

import { Button } from "./ui/button";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

export const Hero = () => {
  const videos = [
    "https://uemrhhfhsztcbcrqvdjd.supabase.co/storage/v1/object/public/hero-videos/857251-hd_1620_1080_25fps.mp4",
    "https://uemrhhfhsztcbcrqvdjd.supabase.co/storage/v1/object/public/hero-videos/856077-hd_1920_1080_24fps.mp4",
    "https://uemrhhfhsztcbcrqvdjd.supabase.co/storage/v1/object/public/hero-videos/6929265-hd_1920_1080_30fps.mp4",
  ];

  
  const [currentVidIndex, setCurrentVidIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleEnded = () => {
    setCurrentVidIndex((prev) => (prev + 1) % videos.length); 
  };

  useEffect(() => {

    const video = videoRef.current;
    if (video) {
      // force reload the new source and play
      video.load();
      video.play().catch((err) => {
        console.warn("Autoplay prevented:", err);
      });
    }
  }, [currentVidIndex]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center text-white">
      <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
        <video
          key={currentVidIndex} // force React to remount on index change
          ref={videoRef}
          className="min-w-full min-h-full absolute object-cover"
          autoPlay
          muted
          playsInline
          onEnded={handleEnded}
        >
          <source src={videos[currentVidIndex]} type="video/mp4" />
        </video>
      </div>
      <div className="video-content z-10">
        <h1 className="font-light text-7xl">智慧角落</h1>
        <p className="opacity-0">artificial margin</p>
        <h3 className="font-light text-2xl">鳥兔玉到去位拉每，左弓說有丁</h3>
        <p className="opacity-0">artificial margin</p>
        <div className="flex gap-2 opacity-100 justify-around align-middle">
          <Button asChild variant="default" className="bg-black w-20 h-12 flex justify-center items-center">
            <Link href="/auth" className="text-xl">登入</Link>
          </Button>
          <Button asChild variant="outline" className="w-22 h-12 flex justify-center items-center">
            <Link href="/auth" className="text-xl">閱讀貼文</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
