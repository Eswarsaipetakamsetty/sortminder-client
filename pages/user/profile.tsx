import Profile from "@/components/profile/components/Profile";
import NavBar from "@/components/styledComponents/Navbar";
import ScoreGraph from "@/components/profile/components/ScoreGraph";
import styles from "@/styles/Profile.module.css"

function ProfilePage() {
    return (
        <>
            < NavBar />
            <div className={styles.container}>
            <div className={styles.profile}>
                < Profile />
            </div>
            <div className={styles.scoregraph}>
                <ScoreGraph />
            </div>
            </div>
        </>
    )
}
export default ProfilePage