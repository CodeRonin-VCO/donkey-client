import BioComponent from "../../../components/bio/bio.jsx";
import styles from "./main-profile.module.css";

// Todo: exemple data user
const testDataUser = {
    _id: "64f1c2a1e4b0f1a2c3d4e001",
    firstname: "Alain",
    lastname: "Provist",
    email: "alain.provist@example.com",
    password: "Cacouette123",
    avatar: "https://example.com/avatars/alainp.jpg",
    bio: "Toujours là quand on ne s'y attend pas.",
    friends: [],
    createdAt: "2025-09-15T13:00:00.000Z",
    updatedAt: "2025-09-15T13:00:00.000Z"
};

export default function MainProfilePage() {

    return (
        <main className={styles.main}>
            <div className={styles.wrapper}>
                <hgroup className={styles.hgroup}>
                    <h2>My profile</h2>
                    <h6 className={styles.color}>Manage your personal info</h6>
                </hgroup>
                <BioComponent />
            </div>
        </main>
    )
}