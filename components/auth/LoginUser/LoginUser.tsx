import React, {useState} from "react"
import { useLogin } from "../Hooks/auth";
import InputBox from "@/components/styledComponents/InputBox";
import styles from "../Style/Auth.module.css"


const Login = () => {
    const { login, error, loading } = useLogin();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.heading}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <InputBox 
                        id="username" 
                        title="Username" 
                        type="text" 
                        name="username" 
                        placeHolder="Enter Username" 
                        onChange={(val) => handleChange("username", val)} 
                    />
                    <div className={styles.passwordcontainer}>
                        <InputBox 
                            id="password" 
                            title="Password" 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            placeHolder="Enter Password" 
                            onChange={(val) => handleChange("password", val)} 
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.passwordbutton}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <button 
                        className={styles.Button}
                        type="submit" 
                        disabled={loading}
                    >
                        Login
                    </button>
                </form>
                <p className={styles.bottom}>Don't have an account?<a className={styles.link} href="/users/register/">Signup</a></p>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default Login
