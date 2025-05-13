import ApiClient from "@/components/apiClient/ApiClient"
import { routes } from "@/lib/router"
import { Post } from "@/model/discussionforun/models"
import { useEffect, useState } from "react"


export const useDiscussForm = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)


    const fetchPosts = async (pageNumber: Number) => {
        try {
            setLoading(true)
            let response = await ApiClient.getWithToken(`${routes.DISCUSSION_FORUM}/messages/?page=${page}`)
            setPosts(response.messages)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setPosts([])
        fetchPosts(page)
    },[page])

    const sendMessage = async (content: string) => {
        try {
            let newPost = await ApiClient.postWithToken(`${routes.DISCUSSION_FORUM}/messages/`, {content})
            setPosts([newPost, ...posts])
        } catch (error) {
            console.error(error)
        }
    }

    const sendReply = async (message: number, content: string) => {
        try {
            let newReply = await ApiClient.postWithToken(`${routes.DISCUSSION_FORUM}/messages/reply/`, {
                message, 
                content
            })
            setPosts(posts.map(post=> post.id === message ? {...post, replies: [...post.replies, newReply]}: post))
        } catch (error) {
            console.error(error)
        }
    }

    /*const toggleLikePost = async (postId: number) => {
        try {
            await ApiClient.postWithToken(`${routes.DISCUSSION_FORUM}/messages/${postId}/like/`, {})
            setPosts(posts.map(post => post.id === postId ? {...post, isLiked: !post.is_liked, like: post.is_liked? post.like - 1: post.like + 1}: post))
        } catch(error) {
            console.error(error)
        }
    }*/

    return {posts, loading, sendMessage, sendReply, /*toggleLikePost,*/ setPage, page}

}