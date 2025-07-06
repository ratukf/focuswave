import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useFocusStats } from "../hooks/useFocusStats";

const getLast7Days = (): { date: string; label: string }[] => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const result: { date: string; label: string }[] = [];

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const date = d.toISOString().split("T")[0];
        const label = days[d.getDay()];
        result.push({ date, label });
    }

    return result;
};

export const FocusSummaryChart = () => {
    const { stats } = useFocusStats();
    const data = getLast7Days().map(({ date, label }) => ({
        name: label,
        focus: stats.daily[date] || 0,
    }));

    return (
        <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="focus" fill="#6C63FF" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
