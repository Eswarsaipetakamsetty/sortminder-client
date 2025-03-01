import ApiClient from "@/components/apiClient/ApiClient"
import { routes } from "@/lib/router"
import { useState } from "react"
import { languages } from "../constants"
import { useRouter } from "next/router"

const useChallenge = (session_id: string) => {
    const router = useRouter()
    const [code, setCode] = useState<string>("")
    const [languageId, setLanguageId] = useState<number>(92)
    const [output, setOutput] = useState<string>("")

    const getBackendLanguageId = (frontendId: number): number => {
        return languages.find(lang => lang.frontendId === frontendId)?.backendId || 71
    }

    const handleRunCode = async () => {
        const encodedCode = code
        try {
            const response = await ApiClient.postWithToken(routes.RUN_CODE, {
                session_id,
                code: encodedCode,
                language_id: getBackendLanguageId(languageId),
            })
            const result = response.results[0]
            setOutput(result.stderr ? `Error : ${result.stderr}` : result.stdout)
        }   catch (error) {
            console.error("Run code error", error)
            setOutput("Failed to run code")
        }
    }

    const handleSubmitCode = async () => {
        const encodedCode = code
        try {
            const response = await ApiClient.postWithToken(routes.SUBMIT_CODE, {
                session_id,
                code : encodedCode,
                language_id : getBackendLanguageId(languageId),
            })
            const result = response.results[0]
            setOutput(result.stderr ? `Error : ${result.stderr}` : result.stdout)
            const {message} = response
            if (message.includes("submission polling timed out.")) {
                setOutput("Time limit exceeded")
            } else if (message.includes("Some test cases failed. Try again.")) {
                setOutput("Some test cases failed. Try again.")
            } else {
                setOutput(result.stderr ? `Error : ${result.stderr}` : "Success! All test cases passed")
                //setOutput("Success! All test cases passed")
                router.push("/home")
            }
        } catch(error) {
            console.error("Submit code error", error)
        }
    }

    return { code, setCode, languageId, setLanguageId, output, handleRunCode, handleSubmitCode }
}

export default useChallenge
