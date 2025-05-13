import { ChallengeScreenProps } from "@/model/contest/contest";
import useChallenge from "../hooks/Challenge";
import React, { useState } from "react";
import styles from "@/components/challenge/styles/Challenge.module.css";
import { languages } from "../constants";
import CodeEditor from "./CodeEditor";
import PopUp from "@/components/styledComponents/PopUp";

const ChallengeScreen: React.FC<ChallengeScreenProps> = ({ session_id, challenge }) => {
    const { code, setCode, languageId, setLanguageId, output, loading, handleRunCode, handleSubmitCode } = useChallenge(session_id);
    const [popUp, setShowPopup] = useState(false)
    console.log(challenge)
    return (
        <div className={styles.container}>
            {/* Left Panel: Challenge Details */}
            <div className={styles.leftPanel}>
                <h2>{challenge.title}</h2>
                <p>{challenge.description}</p>
                <h4>Sample Input:</h4>
                <pre className={styles.precontainer}>{challenge.sample_input}</pre>
                <h4>Sample Output:</h4>
                <pre className={styles.precontainer}>{challenge.sample_output}</pre>
                <h4>Input Format:</h4>
                <pre className={styles.precontainer}>{challenge.input_format}</pre>
                <h4>Output Format:</h4>
                <pre className={styles.precontainer}>{challenge.output_format}</pre>
                <h4>Constraints:</h4>
                <pre className={styles.precontainer}>{challenge.constraints}</pre>
            </div>
            {popUp && < PopUp message="All test cases passed!" />}
            {/* Right Panel: Code Editor and Controls */}
            <div className={styles.rightPanel}>
                <select className={styles.select} value={languageId} onChange={(e) => setLanguageId(Number(e.target.value))}>
                    {languages.map(lang => (
                        <option key={lang.frontendId} value={lang.frontendId}>{lang.name}</option>
                    ))}
                </select>
                <CodeEditor languageId={languageId} code={code} setCode={setCode} />
                <button className={styles.runButton} onClick={handleRunCode}>Run Code</button>
                <button className={styles.submitButton} onClick={() => {handleSubmitCode(setShowPopup)}}>Submit Code</button>
                {loading && <div className={styles.horizontalSpinner}></div>}
                {output && <div className={styles.output}>
                    <h4>Output:</h4>
                    <pre className={styles.precontainer}>{output}</pre>
                </div>}
            </div>
        </div>
    );
};

export default ChallengeScreen;
