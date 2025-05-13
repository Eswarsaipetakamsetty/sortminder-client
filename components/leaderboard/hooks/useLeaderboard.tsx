import { useState, useEffect } from "react";
import ApiClient from "@/components/apiClient/ApiClient";
import { routes } from "@/lib/router";
import { User } from "@/model/leaderboard/user";

export const useLeaderboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [ordering, setOrdering] = useState<"score" | "problems_solved">("score");

    useEffect(() => {
        fetchLeaderboard();
    }, [page, ordering]);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);
            let response = await ApiClient.getWithToken(`${routes.LEADERBOARD}/?page=${page}&ordering=-${ordering}`);
            console.log(response)
            setUsers(response.results);
            console.log(response)
            setTotalPages(response.count%10 == 0? Math.floor(response.count/10): Math.floor(response.count/10 +1));
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        } finally {
            setLoading(false);
        }
    };

    return { users, loading, page, setPage, totalPages, ordering, setOrdering };
};
