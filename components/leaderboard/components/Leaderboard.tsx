import { FC } from "react";
import { useLeaderboard } from "../hooks/useLeaderboard";
import styles from "@/components/leaderboard/styles/Leaderboard.module.css";
import LoadingSpinner from "@/components/styledComponents/LoadingSpinner";

const Leaderboard: FC = () => {
    const { users, loading, page, setPage, totalPages, ordering, setOrdering } = useLeaderboard();
    console.log(totalPages)
    return (
        <div className={styles.leaderboardContainer}>
            <h2 className={styles.title}>Leaderboard</h2>

            {/* Sorting Dropdown */}
            <div className={styles.filterContainer}>
                <label>Sort By:</label>
                <select value={ordering} onChange={(e) => setOrdering(e.target.value as "score" | "problems_solved")}>
                    <option value="score">Highest Score</option>
                    <option value="problems_solved">Problems Solved</option>
                </select>
            </div>

            {/* Leaderboard Table */}
            {loading ? (
                < LoadingSpinner />
            ) : (
                <table className={styles.leaderboardTable}>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Profile</th>
                            <th>Username</th>
                            <th>Score</th>
                            <th>Problems Solved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{(page - 1) * 10 + index + 1}</td>
                                <td><img src={user.profile_photo} alt="Profile" className={styles.profilePic} /></td>
                                <td>@{user.username}</td>
                                <td>{user.score}</td>
                                <td>{user.problems_solved}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Pagination Controls */}
            <div className={styles.paginationContainer}>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default Leaderboard;
