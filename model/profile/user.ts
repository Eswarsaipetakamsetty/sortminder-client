
export interface UserProfile {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    college: string;
    is_creator: boolean;
    address: string;
    problems_solved: number;
    favourite_language: string | null;
    score: number;
    is_active_contest: string;
    math_score: string;
    profile_photo: string;
}

export interface EditProfilePhotoProps {
    profile_photo: string;
    on_upload: (file: File) => void;
}

export interface EditProfileProps {
    profile: UserProfile
    onSave: (updatedData: Partial<UserProfile>) => void
}

export interface ScoreData {
    date: string;
    score_increase: number;   
    rate?: number;    
}