"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function PageTransitionWrapper({ children }) {
  const pathname = usePathname();
  const [route, setRoute] = useState(pathname);

  useEffect(() => {
    setRoute(pathname);
  }, [pathname]);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div key={route} initial="initial" animate="animate" exit="exit" variants={pageTransition}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
