import BioComponent from "../../../components/bio/bio.jsx";
import styles from "./main-profile.module.css";

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