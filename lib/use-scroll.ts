'use client'
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

export default function useScrollThreshold(threshold: number) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    // console.log(latest)
    if (latest > threshold) setScrolled(true)
    else setScrolled(false)
  })

  return scrolled;
}
