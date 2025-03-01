import { useState, useEffect } from "react"
import { useProfile } from "../hooks/UseProfile"
import styles from "@/components/profile/styles/EditProfile.module.css"
import { UserProfile } from "@/model/profile/user"


const EditProfile = () => {
    const { profile, updateProfile, updateProfilePhoto } = useProfile()
    const [formData, setFormData] = useState({
        first_name: "",
        last_name:  "",
        college:  "",
    })

    const [photo, setPhoto] = useState<File | null>(null);

    useEffect(() => {
        if (profile) {
            setFormData({
                first_name: profile.first_name,
                last_name: profile.last_name,
                college: profile.college || "",
            });
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData: Partial<UserProfile> = {};
        Object.keys(formData).forEach((key) => {
            if (formData[key as keyof typeof formData] !== profile?.[key as keyof UserProfile]) {
                updatedData[key as keyof typeof formData] = formData[key as keyof typeof formData];
            }
        });
        if (Object.keys(updatedData).length > 0) {
            await updateProfile(updatedData);
        }

        if (photo) {
            await updateProfilePhoto(photo);
        }
    };
    return (
        <div className={styles.editProfileContainer}>
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <input className={styles.input} type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="first_name" />
                <input className={styles.input} type="last_name" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="last_name" />
                <input className={styles.input} type="text" name="college" value={formData.college} onChange={handleChange} placeholder="College" />
                <input className={styles.input} type="file" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
                <button type="submit" className={styles.saveButton}>Save Changes</button>
            </form>
        </div>
    );
}

export default EditProfile