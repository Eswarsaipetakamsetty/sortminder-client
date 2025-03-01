import { Data } from "@/model/auth/auth";
import Cookies from "js-cookie";
import router from "next/router";


export const handleResponse = (data:Data) => {
    Cookies.set('access_token', data.access);
    Cookies.set('id',String(data.user_id));
    Cookies.set('username',data.username);
    Cookies.set('score',String(data.score))
    Cookies.set('profile_photo', data.profile_photo)
    router.replace('/');
}