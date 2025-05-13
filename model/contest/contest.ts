export type CodeEditorProps = {
    languageId: number;
    code: string;
    setCode: (code: string) => void;
};

export type Challenge = {
    title: string;
    description: string;
    sample_input: string;
    sample_output: string;
    input_format: string;
    output_format: string;
    constraints: string;
    difficulty: string;
};

export type ChallengeScreenProps = {
    session_id: string;
    challenge: Challenge;
};