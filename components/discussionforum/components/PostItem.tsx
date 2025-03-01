import { Post } from "@/model/discussionforun/models";
import { FC } from "react";
import { useDiscussForm } from "../hooks/UseDiscussionForum";
import ReplyItem from "./ReplyItem";
import styles from "@/components/discussionforum/styles/PostItem.module.css"
import { time } from "console";
import { useState } from "react";
import timeAgo from "@/utils/timeAgo";

const PostItem : FC<{post: Post}> = ({post }) => {
    //const {toggleLikePost} = useDiscussForm()
    const { posts, loading, sendReply } = useDiscussForm();
    const [reply, setReply] = useState<{ [key: number]: string }>({});
    const [visibleReplies, setVisibleReplies] = useState<{ [key: number]: boolean }>({});

    const toggleReplies = (postId: number) => {
        setVisibleReplies(prev => ({
            ...prev,
            [postId]: !prev[postId] // Toggle visibility
        }));
    };


    const handleSendReply = (postId: number) => {
        if (reply[postId]?.trim()) {
            sendReply(postId, reply[postId]);
            setReply((prev) => ({ ...prev, [postId]: "" })); // Clear reply input
        }
    };
    let t = timeAgo(post.created_at)
    return (
        <div className={styles.postCard}>
            <div className={styles.card_top}>
                <img className={styles.profilepic} src={post.user_profile_photo} alt="User Profile" />
                <span className={styles.username}>@{post.user}</span>
                <p className={styles.timeAgo}>{t}</p>
            </div>
            <p className={styles.postContent}>{post.content}</p>

            {/* Reply Input & Send Button */}
            <div className={styles.replyInputContainer}>
                <input
                    type="text"
                    value={reply[post.id] || ""}
                    onChange={(e) => setReply((prev) => ({ ...prev, [post.id]: e.target.value }))}
                    placeholder="Write a reply..."
                    className={styles.replyInput}
                />
                <button onClick={() => handleSendReply(post.id)} className={styles.replyButton}>
                    Send
                </button>
            </div>

            {/* Toggle Replies Button */}
            <button onClick={() => toggleReplies(post.id)} className={styles.toggleRepliesButton}>
                {visibleReplies[post.id] ? "Hide Replies" : `View ${post.replies.length} Replies`}
            </button>

            {/* Replies Section (Hidden by default) */}
            {visibleReplies[post.id] && (
                <div className={styles.repliesContainer}>
                    {post.replies.length > 0 ? (
                        post.replies.map(reply => <ReplyItem key={reply.id} reply={reply} />)
                    ) : (
                        <p className={styles.noReplies}>No replies yet.</p>
                    )}
                </div>
            )}

            <hr className={styles.divider} />
        </div>
    )
}

export default PostItem