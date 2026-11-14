
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
            lerp: 0.1,
            autoRaf: true,
            anchors: true,
        });

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
