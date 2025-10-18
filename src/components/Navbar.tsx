"use client";
import { motion } from "framer-motion";
import { supabase } from "@/supabase-client";
import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js"
import { handleSignOut } from "@/lib/toolbox";

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

export const Navbar = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data?.user) setUser(data?.user ?? null)
    }
    fetchUser()

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null)
    })

    return () => subscription.subscription.unsubscribe()
  }, [])

  
  return (
    <motion.nav
      className="navbar fixed top-0 right-0 left-0 flex items-center justify-around py-6 bg-black/60 backdrop-blur-md z-50 shadow-2xl shadow-black/60 h-16"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.a
	  	href="/"
        className="logo text-2xl text-white shadow-white/60"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        智慧角落
      </motion.a>

      <motion.ul
        className="nav-links flex gap-8 mx-2"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.li
          variants={fadeInUp}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <a className="relative cursor-pointer" href="/blog"> 部落格</a>
        </motion.li>
        <motion.li
          variants={fadeInUp}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <a className="relative cursor-pointer" href="/create"> 論壇</a>
        </motion.li>
        {user ? <motion.li
          variants={fadeInUp}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSignOut()}
        >
          <div className="relative cursor-pointer text-red-700"> 登出</div>
        </motion.li> : <motion.li
          variants={fadeInUp}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <a className="relative cursor-pointer" href="/auth"> 登入</a>
        </motion.li> }
      </motion.ul>
    </motion.nav>
  );
};