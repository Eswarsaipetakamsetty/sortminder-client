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
    const [loading, setLoading] = useState(false)

    const getBackendLanguageId = (frontendId: number): number => {
        return languages.find(lang => lang.frontendId === frontendId)?.backendId || 71
    }

    const handleRunCode = async () => {
        const encodedCode = code
        setLoading(true)
        try {
            let response = await ApiClient.postWithToken(routes.RUN_CODE, { //chanegd
                session_id,
                code: encodedCode,
                language_id: getBackendLanguageId(languageId),
            })
            console.log(response)
            const result = response.results[0]
            setOutput(result.stderr ? `Error : ${result.stderr}` : result.stdout)
        }   catch (error) {
            console.error("Run code error", error)
            setOutput("Failed to run code")
        }   finally {
            setLoading(false)
        }
    }

    const handleSubmitCode = async (setShowPopup: (val: boolean) => void) => {
        const encodedCode = code
        setLoading(true)
        try {
            let response = await ApiClient.postWithToken(routes.SUBMIT_CODE, { //changed
                session_id,
                code : encodedCode,
                language_id : getBackendLanguageId(languageId),
            })
            const result = response.results[0]
            setOutput(result.stderr ? `Error : ${result.stderr}` : result.stdout)
            const {message} = response
            console.log(message)
            if (message.includes("submission polling timed out.") && !result.stderr) {
                setOutput("Time limit exceeded")
            } else if (message.includes("some test cases failed. Try again.") && !result.stderr) {
                setOutput("Some test cases failed. Try again.")
            } else {
                setOutput(result.stderr ? `Error : ${result.stderr}` : "Success! All test cases passed")
                if(!result.stderr) {
                    setShowPopup(true)
                }
            }
        } catch(error) {
            console.error("Submit code error", error)
        }   finally {
            setLoading(false)
        }
    }

    return { code, setCode, languageId, setLanguageId, output, loading, handleRunCode, handleSubmitCode }
}

export default useChallenge
