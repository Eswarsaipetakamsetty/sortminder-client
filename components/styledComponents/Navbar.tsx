import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import styles from "../../styles/NavBar.module.css"
import profile from "@/static/icons/profile.svg"


function NavBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [profilePic, setProfilePic] = useState(profile)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const router = useRouter()

    const checkAuthStatus = () => {
        const token = Cookies.get("access_token")
        const userPic = Cookies.get("profile_photo")
        if (token) {
            setIsLoggedIn(true)
            if (userPic) setProfilePic(userPic)
        }
    }

    useEffect( () => {
        
        checkAuthStatus()

        const handleRouteChange = () => checkAuthStatus()
        router.events.on("routeChangeComplete", handleRouteChange)
        
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange)
        }
    }, [])

    const handleLogout = () => {
        Cookies.remove("access_token")
        Cookies.remove("profile_photo")
        setIsLoggedIn(false)
        router.push("/auth/signup")
    }

    return (
        <nav className={styles.container}>
            {/* Left Side - Logo */}
            <div className={styles.navbar_left}>
                <Link href="/">SortMinder</Link>
            </div>

            {/* Right Side - Menu */}
            <div className={styles.navbar_right}>
                <Link href="/home" className={styles.menu_item}>Home</Link>
                <Link href="/challenge/startchallenge" className={styles.menu_item}>Challenge</Link>
                <Link href="/careers" className={styles.menu_item}>Careers</Link>
                <Link href="/about" className={styles.menu_item}>About</Link>

                {isLoggedIn ? (
                    <div className={styles.dropdown_container}>
                        {/* Profile Picture */}
                        <button className={styles.dropdown_wrap} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <img
                                src={profilePic} // Replace with actual profile image
                                alt="Profile"
                                width={40}
                                height={40}
                                className={styles.dropdoen_button}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className={styles.dropdown}>
                                <Link href="/settings" className={styles.dropdown_item}>Settings</Link>
                                <Link href="/user/profile" className={styles.dropdown_item}>Profile</Link>
                                <button 
                                    onClick={handleLogout} 
                                    className={styles.dropdown_item}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link href="/auth/signup" className={styles.menu_item}>Join</Link>
                )}
            </div>
        </nav>
    )
}

export default NavBar