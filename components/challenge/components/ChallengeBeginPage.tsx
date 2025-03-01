import React, { useState } from "react";
import { useRouter } from "next/router";
import ApiClient from "@/components/apiClient/ApiClient";
import { routes } from "@/lib/router";
import styles from "@/components/challenge/styles/Challenge.module.css";

const ChallengePage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSelectDifficulty = async (difficulty: string) => {
        try {
            setLoading(true);
            const response = await ApiClient.postWithToken(routes.START_CHALLENGE, { difficulty });

            if (response.session_id && response.challenge) {
                // Store challenge data in sessionStorage
                console.log(response)
                sessionStorage.setItem(
                    "challengeData",
                    JSON.stringify({
                        sessionId: response.session_id,
                        challenge: response.challenge,
                        difficulty: difficulty, // Pass selected difficulty
                    })
                );

                // Redirect to the Challenge Solve page
                router.push("/challenge/solve");
            } else {
                console.error("Invalid response:", response);
            }
        } catch (error) {
            console.error("Error fetching challenge:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <h1>Choose Your Challenge</h1>

            {/* Difficulty Selection Buttons */}
            <div className={styles.difficultySelector}>
                <button className={styles.difficultyButton} onClick={() => handleSelectDifficulty("beginner")} disabled={loading}>
                    Beginner
                </button>
                <button className={styles.difficultyButton} onClick={() => handleSelectDifficulty("intermediate")} disabled={loading}>
                    Intermediate
                </button>
                <button className={styles.difficultyButton} onClick={() => handleSelectDifficulty("advanced")} disabled={loading}>
                    Advanced
                </button>
            </div>

            {/* Show loading state */}
            {loading && <p>Fetching challenge...</p>}
        </div>
    );
};

export default ChallengePage;
