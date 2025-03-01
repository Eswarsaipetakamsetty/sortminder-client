import { useState } from "react";
import { useSignup } from "../Hooks/auth";
import styles from "../Style/Auth.module.css";
import InputBox from "@/components/styledComponents/InputBox";


const Signup = () => {
    const {signup, error, loading} = useSignup()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (field: string, value: string) => {
        setFormData({...formData, [field]: value})
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        signup(formData)
    }

    return (
        <div className={styles.container}>
            <div className ={styles.card}>
                <h2 className={styles.heading}>SignUp</h2>
                <form onSubmit={handleSubmit}>
                    <InputBox
                        id="username"
                        title="Username"
                        type="text"
                        name="username"
                        placeHolder="Enter a unique username"
                        onChange={(val) => handleChange("username", val)}
                    />

                    <InputBox 
                        id="email"
                        title="Email"
                        type="email"
                        name="email"
                        placeHolder="Enter your Email"
                        onChange={(val) => handleChange("email", val)}
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
                            {showPassword ? "Hide": "Show"}
                        </button>
                    </div>
                    <button 
                        type="submit"
                        className={styles.Button}
                        disabled={loading}
                    >
                        Signup
                    </button>
                </form>
                <span className={styles.bottom}>Already have an account? <a className={styles.link} href="/auth/login/">SignIn</a></span>
                {error ? <p className={styles.error}>{error}</p>: <p className={styles.error}> </p> }
            </div>
        </div>
    )
}

export default Signup