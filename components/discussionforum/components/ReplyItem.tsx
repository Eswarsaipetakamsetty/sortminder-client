import { Reply } from "@/model/discussionforun/models";
import { FC } from "react";
import styles from "@/components/discussionforum/styles/ReplyItem.module.css"
import ReplyCard from "./ReplyCard";
import pinklike from "@/static/icons/PinkHeart.svg"
import whitelike from "@/static/icons/Heart.svg"
import timeAgo from "@/utils/timeAgo";



const ReplyItem: FC<{reply: Reply}> = ({reply}) => {
    let t = timeAgo(reply.created_at)
    return (
        <div className={styles.ReplyItem}>
            <ReplyCard
                avatar={reply.user_profile_photo}
                username={reply.user}
                content={reply.content}
                timeAgo={t}
            />
            {/*<button className={styles.like_btn}>{reply.isLiked ? <img src={pinklike} alt="" /> :<img src= {whitelike} alt=""></img>}</button>*/}
        </div>
    )
}

export default ReplyItem