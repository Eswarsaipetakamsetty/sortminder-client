import ApiClient from "@/components/apiClient/ApiClient";
import { routes } from "@/lib/router";
import { useState, useEffect } from "react";

interface ScoreEntry {
    challenge_title: string;
    date: string;
    score_increase: number;
}

const useScoreHistory = () => {
    const [scoreData, setScoreData] = useState<ScoreEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchScoreHistory = async () => {
            try {
                const data: ScoreEntry[] = await ApiClient.getWithToken(
                    `${routes.USER_PROFILE}`
                );

                console.log("API Response:", data);

                // Ensure the response is an array
                if (!Array.isArray(data)) {
                    throw new Error("Invalid API response format. Expected an array.");
                }

                setScoreData(data);
            } catch (err: any) {
                console.error("API Error:", err);
                setError(err.message || "Failed to fetch score history.");
            } finally {
                setLoading(false);
            }
        };

        fetchScoreHistory();
    }, []);

    return { scoreData, loading, error, isEmpty: scoreData.length === 0 };
};

export default useScoreHistory;
