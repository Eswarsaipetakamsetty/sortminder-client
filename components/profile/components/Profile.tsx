import { useProfile } from "../hooks/UseProfile"
import styles from "@/components/profile/styles/Profile.module.css"
import { useRouter } from "next/router";

const Profile = () => {
    const { profile, loading, error } = useProfile()
    const router = useRouter();

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!profile) return <p>Profile not found</p>;

    return (
        <div className={styles.profileContainer}>
            <img src={profile.profile_photo} alt="Profile" className={styles.profilePhoto} />
            <div className={styles.profile_fields_wrapper}>
                <div className={styles.label}>Email:</div>
                <div className={styles.value}>{profile.email}</div>
                <div className={styles.label}>Username:</div>
                <div className={styles.value}>{profile.username}</div>
                <div className={styles.label}>First Name:</div>
                <div className={styles.value}>{profile.first_name}</div>
                <div className={styles.label}>Last Name:</div>
                <div className={styles.value}>{profile.last_name}</div>
                <div className={styles.label}>College:</div>
                <div className={styles.value}>{profile.college || "No College Info"}</div>
            </div>
            <button onClick={() => router.push("/user/editprofile")} className={styles.editButton}>Edit Profile</button>
        </div>
    );
};
export default Profile;