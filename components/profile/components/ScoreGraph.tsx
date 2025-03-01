import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import useScoreHistory from "@/components/profile/hooks/UseScoreHistory";
import styles from "@/components/profile/styles/ScoreGraph.module.css";

const ScoreGraph: React.FC = () => {
    const { scoreData, loading, error } = useScoreHistory();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    // Transform data for cumulative score progression
    const processedData = scoreData.reduce((acc, entry, index) => {
        const previousScore = index === 0 ? 0 : acc[index - 1].score;
        acc.push({
            date: entry.date,
            score: previousScore + entry.score_increase, // Cumulative sum
        });
        return acc;
    }, [] as { date: string; score: number }[]);

    // Handle Empty Data Case
    if (processedData.length === 0) {
        processedData.push(
            { date: "2025-02-27", score: 10 },
            { date: "2025-02-28", score: 10 },
            { date: "2025-03-01", score: 10 }
        );
    }

    return (
        <div className={styles.graphContainer}>
            <h2>Score Progression Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={processedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: "Score", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ScoreGraph;
