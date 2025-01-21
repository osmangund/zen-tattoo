"use client"
import { motion } from "framer-motion"
import { anim } from "@/utils/anim"
import Image from "next/image"

export const PRELOADER_DURATION = 2

const OVERFLOW_VARIANTS = {
  initial: { overflow: "hidden" },
  animate: {
    overflow: "visible",
    transition: {
      delay: PRELOADER_DURATION,
      ease: [0.64, 0, 0.78, 0],
    },
  },
}

const SECTION_VARIANTS = {
  initial: { y: 0, overflow: "hidden" },
  animate: {
    y: [0, 0, "-100%"], //! 0, 0.5, 1 --> 3/2 = 1.5s boyunca 0'da kalacak
    overflow: "visible",
    transition: {
      duration: PRELOADER_DURATION,
      ease: [0.64, 0, 0.78, 0],
    },
  },
}

const TEXT_VARIANTS = {
  initial: { y: "132%" },
  animate: (i) => ({
    y: ["132%", "0%", "0%", "-800%"],
    scale: [1, 1, 1, 0.8],
    transition: {
      delay: i,
      duration: PRELOADER_DURATION,
      ease: [0.35, 0, 0.35, 1],
      times: [0, 0.3, 0.84, 1],
    },
  }),
}

const onAnimationComplete = () => {
  if (window == undefined) return
  document.body.style.overflow = "visible"
  window.scrollTo(0, 0)
}

export default function PreLoader() {
  const texts = ["Zen Tattoo", "2024®"]

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[110vh] bg-black flex flex-col items-center justify-center text-center z-50 select-none w-full"
      id="loader"
      {...anim(SECTION_VARIANTS)}
      onAnimationComplete={onAnimationComplete}
    >
      <div className="absolute w-full h-full flex flex-wrap">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="relative w-1/2 h-1/2 brightness-[0.2]">
            <Image
              src="/images/patterns.png"
              alt="Preloader Japanese style pattern background"
              fill
              priority
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {texts.map((text, index) => (
        <motion.div
          key={index}
          className="overflow-hidden"
          {...anim(OVERFLOW_VARIANTS)}
        >
          <motion.p
            className="relative capitalize h1 text-neutral-100 drop-shadow-custom"
            {...anim(TEXT_VARIANTS, index * 0.1)}
          >
            {text}
          </motion.p>
        </motion.div>
      ))}
    </motion.div>
  )
}
