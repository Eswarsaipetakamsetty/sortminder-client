import dynamic from "next/dynamic";
import { CodeEditorProps } from "@/model/contest/contest";
import { languages } from "../constants";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });


const CodeEditor: React.FC<CodeEditorProps> = ({ languageId, code, setCode }) => {
    return (
        <MonacoEditor
            width="100%"
            height="300px"
            language={languages.find(lang => lang.frontendId === languageId)?.name.toLowerCase() || "plaintext"}
            theme="vs-dark"
            value={code}
            onChange={(newValue) => setCode(newValue || "")}
            options={{
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: "line",
                automaticLayout: true,
            }}
        />
    );
};

export default CodeEditor