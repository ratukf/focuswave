import { useEffect, useRef, useState } from "react";

export const usePomodoroTimer = (initialMinutes = 25) => {
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const start = () => setIsRunning(true);
    const pause = () => setIsRunning(false);
    const reset = () => {
        setIsRunning(false);
        setTimeLeft(initialMinutes * 60);
    };

    const progress = 1 - timeLeft / (initialMinutes * 60);

    // Handles the timer interval: starts countdown when running, clears interval on pause or unmount
    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current!);
                        setIsRunning(false);
                        setTimeLeft(0);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerRef.current!);
    }, [isRunning]);

    const minutes = Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");

    return { minutes, seconds, isRunning, start, pause, reset, progress };
};
