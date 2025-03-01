import ApiClient from "@/components/apiClient/ApiClient"
import { routes } from "@/lib/router"
import { UserProfile } from "@/model/profile/user"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/router"


export const useProfile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const fetchProfile = async() => {
            try {
                const response = await ApiClient.getWithToken(routes.PROFILE)
                setProfile(response)
                console.log(response)
                Cookies.set("profile_photo", response.profile_photo);
                Cookies.set("username", response.username);
                Cookies.set("email", response.email);
                Cookies.set("college", response.college || "No College Info");
            } catch (err) {
                setError("Failed to fetch profile")
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    const updateProfile = async (updatedData: Partial<UserProfile>) => {
        try {
            const response = await ApiClient.putWithToken(routes.PROFILE, updatedData);
            //setProfile(response);
            
            router.push("/user/profile")
        } catch {
            setError("Failed to update profile");
        }
    }

    const updateProfilePhoto = async (file: File) => {
        const formData = new FormData()
        formData.append("profile_photo", file)

        try {
            const response = await ApiClient.putWithTokenFormData(routes.PROFILE, formData)
            console.log(response.status)
            router.push("/user/profile")
            setProfile(response["profile_photo"])
            Cookies.set("profile_photo", response.profile_photo)
        } catch (err) {
            setError("Failed to update profile photo")
        }
    } 
    return {profile, loading, error, updateProfile, updateProfilePhoto}
}