import styles from "@/components/discussionforum/styles/ReplyCard.module.css"
import pinklike from "@/static/icons/PinkHeart.svg"
import whitelike from "@/static/icons/Heart.svg"

type ReplyProps = {
    avatar: string
    username: string
    content: string
    timeAgo: string
    likes?: string
    isLiked?: boolean
}

function ReplyCard({avatar, username, content, timeAgo, likes, isLiked}: ReplyProps) {
    return (
        <div className={styles.Card}>
            <div className={styles.sub_container}>
                <img className={styles.avatar} src={avatar} alt="Profile" />
                <span className={styles.username}>@{username}</span>
                {isLiked?<img className={styles.like} src={pinklike} alt="" />: <img className={styles.like} src={whitelike} alt=""></img> }
            </div>
            <p className={styles.content}>{content}</p>
            <p className={styles.p}>{timeAgo}</p>
        </div>
    )
}

export default ReplyCard