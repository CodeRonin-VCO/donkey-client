import styles from "./forgot-pwd.route.module.css";
import logoDonkeyPerplex from "./../../assets/logo-donkey-perplexe.png";
import ForgotPasswordForm from "./components/form-forgot-pwd/form-forgot-pwd.jsx";

export default function ForgotPasswordPage() {

    return (
        <div className="page">
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <img src={logoDonkeyPerplex} alt="logo-donkey" />
                </div>
                <h1 className={styles.title}>Your memory called.</h1>
                <h2 className={styles.title}>It’s on vacation. With Donkey.</h2>
                <ForgotPasswordForm />
            </div>
        </div>
    )
}