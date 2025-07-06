import { useState, useEffect } from "react";

type Stats = {
    streak: number;
    lastFocusedDate: string;
    daily: Record<string, number>;
};

const STORAGE_KEY = "focuswave-stats";

const getToday = () => new Date().toISOString().split("T")[0];
const getYesterday = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
};

const defaultStats: Stats = {
    streak: 0,
    lastFocusedDate: "",
    daily: {},
};

export const useFocusStats = () => {
    const [stats, setStats] = useState<Stats>(defaultStats);

    // On mount, load the focus stats from localStorage if available
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setStats(JSON.parse(saved));
        }
    }, []);

    const completeFocus = () => {
        const today = getToday();
        const yesterday = getYesterday();
        const updatedDaily = {
            ...stats.daily,
            [today]: (stats.daily[today] || 0) + 1,
        };

        const newStreak =
            stats.lastFocusedDate === today
                ? stats.streak
                : stats.lastFocusedDate === yesterday
                    ? stats.streak + 1
                    : 1;

        const updated: Stats = {
            streak: newStreak,
            lastFocusedDate: today,
            daily: updatedDaily,
        };

        setStats(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    return {
        stats,
        completeFocus,
    };
};
