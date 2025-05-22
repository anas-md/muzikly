'use client';

import { Button } from "@/components/shadcn/ui/button";
import Link from "next/link";
import Image from "next/image";
import { MdNightsStay, MdOutlineLightMode } from "react-icons/md";
import userStore from "@/store/user.store"; 
import { useSnapshot } from "valtio";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function LandingPage() {
  const { theme } = useSnapshot(userStore);
  const imageRef = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end end'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <section
      className={`relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 py-12 text-center sm:min-h-screen sm:px-6 lg:px-8 ${
        theme === 'light'
          ? 'bg-gradient-to-b from-slate-50 to-slate-100 text-zinc-900'
          : 'bg-gradient-to-b from-zinc-900 to-zinc-950 text-white'
      }`}
    >
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <Button
          asChild
          variant="outline"
          className={`hover:text-white ${
            theme === 'light'
              ? 'border-sky-600 text-sky-600 hover:bg-sky-600'
              : 'border-sky-500 text-sky-500 hover:bg-sky-500'
          }`}
        >
          <Link href="/login">Login</Link>
        </Button>
        <button
          onClick={() => userStore.toggleTheme()}
          className={`flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full text-2xl ${
            theme === 'light'
              ? 'bg-slate-200 hover:bg-slate-300 text-zinc-800'
              : 'bg-black/20 hover:bg-black/30 text-white'
          }`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <MdOutlineLightMode /> : <MdNightsStay />}
        </button>
      </div>
      <div className="mx-auto max-w-3xl pt-16">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Dive into <span className={`${theme === 'light' ? 'text-sky-600' : 'text-sky-400'}`}>Your Sound.</span>
        </h1>
        <p
          className={`mt-6 text-lg sm:text-xl md:text-2xl ${
            theme === 'light' ? 'text-zinc-700' : 'text-zinc-300'
          }`}
        >
          Discover, stream, and share the music that moves you. Muzikly is your
          ultimate audio adventure.
        </p>
        <div className="mt-10">
          <Button
            asChild
            size="lg"
            className={`text-lg font-semibold ${
              theme === 'light'
                ? 'bg-sky-600 text-white hover:bg-sky-700'
                : 'bg-sky-500 text-white hover:bg-sky-600'
            }`}
          >
            <Link href="/signup">Explore Muzikly</Link>
          </Button>
        </div>
      </div>
      <div className="mt-12 w-full max-w-4xl px-4">
        <motion.div
          style={{
            opacity,
            rotateX,
            transformPerspective: '800px',
          }}
          ref={imageRef}
        >
          <Image
            src="/muzikly-dashboard.png"
            alt="Muzikly Dashboard Showcase"
            width={1200}
            height={675}
            className={`mx-auto rounded-lg shadow-2xl ${
              theme === 'light' ? 'border-2 border-slate-300' : ''
            }`}
          />
        </motion.div>
      </div>
    </section>
  );
} 