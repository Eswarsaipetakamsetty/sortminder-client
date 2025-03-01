import { FC } from "react";
import { useDiscussForm } from "../hooks/UseDiscussionForum";
import PostItem from "./PostItem";
import Pagination from "./Pagination";
import { useState } from "react";
import styles from "@/components/discussionforum/styles/DiscussForum.module.css";

const DiscussForum: FC = () => {
    const { posts, loading, setPage, page, sendMessage } = useDiscussForm();
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            sendMessage(message);
            setMessage(""); // Clear input field after sending
        }
    };

    return (
        <div className={styles.DiscussForumContainer}>
            <h1>Discussion Forum</h1>
            <hr />
            <div>
                <input
                    className={styles.input}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a message..."
                />
                <button className={styles.submit_button} onClick={handleSendMessage}>Send</button>
            </div>
            <hr />

            {/* Wrap posts in a scrollable container */}
            <div className={styles.PostsContainer}>
                {loading ? <p>Loading...</p> : posts.map(post => <PostItem key={post.id} post={post} />)}
            </div>

            <Pagination page={page} setPage={setPage} />
        </div>
    );
};

export default DiscussForum;
