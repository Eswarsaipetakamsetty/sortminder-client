import React, { useEffect, useState } from "react";
import ChallengeScreen from "./Challenge";

const ChallengeSolve = () => {
    const [challengeData, setChallengeData] = useState<any>(null);

    useEffect(() => {
        // Retrieve challenge data from sessionStorage
        const storedData = sessionStorage.getItem("challengeData");
        if (storedData) {
            setChallengeData(JSON.parse(storedData));
        }
    }, []);

    if (!challengeData) return <p>Loading challenge...</p>;

    return (
        <div>
            <h1>Solving: {challengeData.challenge.title}</h1>
            <ChallengeScreen 
                session_id={challengeData.sessionId} 
                challenge={challengeData.challenge} 
            />
        </div>
    );
};

export default ChallengeSolve;
