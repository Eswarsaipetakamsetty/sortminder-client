import { routes } from "@/lib/router";
import { data } from "autoprefixer";
import Cookies from "js-cookie";

class ApiClient {
    async getAccessToken(): Promise<string | null> {
        const accessToken: string | undefined = Cookies.get("access_token");
        if (!accessToken) {
            window.location.href = "/auth/login";
            return null;
        }
        return accessToken;
    }

    async request(endpoint: string, options: RequestInit = {}): Promise<any> {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
            ...options.headers,
        };
        const response: Response = await fetch(endpoint, { ...options, headers });

        if (!response.ok) {
            const errorData: any = await response.json();
            throw {
                statusCode: response.status,
                message: errorData.error || "An unexpected error occurred",
            };
        }
        return response.json()
    }

    async requestForm(endpoint:string,options:RequestInit){
        const headers ={
            ...options.headers
        };
        const response = await fetch(endpoint,{
            ...options,
            headers
        });
        if(!response.ok){
            throw new Error("Failed to fetch results");
        }
        const res = await response.json();
        return res;
    }

    async getWithToken(endpoint: string, options: RequestInit = {}): Promise<any> {
        const token: string | null = await this.getAccessToken();
        if (!token) return;
        return this.request(endpoint, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async getWithoutToken(endpoint: string, options: RequestInit = {}): Promise<any> {
        return this.request(endpoint, options);
    }

    async putWithToken(endpoint: string, data: object, options: RequestInit = {}): Promise<any> {
        const token: string | null = await this.getAccessToken()
        if(!token) return;
        return this.request(endpoint, {
            ...options,
            method: "PUT",
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
    }

    async putWithTokenFormData(endpoint: string, formData: FormData, options: RequestInit = {}): Promise<any> {
        const token: string | null = await this.getAccessToken()
        if(!token){
            console.log("no token")
            return
        }
        return this.requestForm(endpoint, {
            ...options,
            method: "PUT",
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`
            },
            body: formData,
        })
    }
    async postWithToken(endpoint: string, data: object, options: RequestInit = {}): Promise<any> {
        const token: string | null = await this.getAccessToken();
        if (!token) return;
        return this.request(endpoint, {
            ...options,
            method: "POST",
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
    }

    async postWithoutToken(endpoint: string, data: object, options: RequestInit = {}): Promise<any> {
        return this.request(endpoint, {
            ...options,
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async postWithTokenFormData(endpoint: string, formData: FormData, options: RequestInit = {}): Promise<any> {
        const token: string | null = await this.getAccessToken();
        if (!token) return;
        return this.request(endpoint, {
            ...options,
            method: "POST",
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
    }
}

export default new ApiClient();
