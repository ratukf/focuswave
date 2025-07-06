import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

export const BreathingCircle = () => {
    const controls = useAnimationControls();

    // This effect creates an infinite breathing animation by scaling the circle up and down
    // to simulate inhale (scale up) and exhale (scale down) in a loop.
    useEffect(() => {
        const breathe = async () => {
            while (true) {
                await controls.start({ scale: 1.3, transition: { duration: 2 } });
                await controls.start({ scale: 1, transition: { duration: 2 } });
            }
        };
        breathe();
    }, [controls]);

    return (
        <motion.div
            animate={controls}
            style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                margin: "0 auto",
                background: "radial-gradient(circle, #6C63FF 0%, #9F87FF 100%)",
                opacity: 0.15,
            }}
        />
    );
};
