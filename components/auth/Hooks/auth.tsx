import ApiClient from "@/components/apiClient/ApiClient"
import { Data } from "@/model/auth/auth"
import { useRouter } from "next/router"
import { useState } from "react"
import Cookies from "js-cookie"
import { routes } from "@/lib/router"


export const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const signup = async (userData: registerModel) => {
        setLoading(true)
        setError(null)
        try {
            const response = await ApiClient.postWithoutToken(routes.REGISTER, userData)
            console.log(response)
            console.log(response.status)
            if(response.statusCode === 200) {
                router.push("/auth/login/")
            }
        } catch(err: any) {
            if (err.statusCode === 400) {
                const errorMessage = Object.values(err.message).flat().join(" ")
                setError(errorMessage)
            } else {
                setError("An unexpected error occured.")
            } 
        } finally {
            setLoading(false)
        }
    }

    return {signup, error, loading}

}

export const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const login = async (userData: loginModel) => {
        setLoading(true)
        setError(null)

            const response: Data = await ApiClient.postWithoutToken(routes.LOGIN, userData)
            Cookies.set("access_token", response.access)
            Cookies.set("id", String(response.user_id))
            Cookies.set("username", response.username)
            Cookies.set("score", String(response.score))
            Cookies.set("is_creator", String(response.is_creator))
            Cookies.set("profile_photo", String(response.profile_photo))
            router.replace("/home")
            console.log(response)


            setLoading(false)
    }
    return {login, error, loading}
}