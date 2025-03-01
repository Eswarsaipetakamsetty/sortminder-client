
import DiscussForum from "@/components/discussionforum/components/DiscussForum";
import Leaderboard from "@/components/leaderboard/components/Leaderboard";
import NavBar from "@/components/styledComponents/Navbar";
import styles from "@/styles/Home.module.css"

function Home() {
    return (
        <>
            < NavBar />
            <div className={styles.homecenter}>
                <div className={styles.discuss_forum}>
                    < DiscussForum />
                </div>
                <div className={styles.leaderboard}>
                    < Leaderboard />
                </div>
            </div>
        </>
    )
}

export default Home