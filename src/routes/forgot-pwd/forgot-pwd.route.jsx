import styles from "./forgot-pwd.route.module.css";
import logoDonkeyPerplex from "./../../assets/logo-donkey-perplexe.png";
import ForgotPasswordForm from "./components/form-forgot-pwd/form-forgot-pwd.jsx";
import { useTranslation } from "react-i18next";

export default function ForgotPasswordPage() {
    // trad
    const { t } = useTranslation();

    return (
        <div className="page">
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <img src={logoDonkeyPerplex} alt="logo-donkey" />
                </div>
                <h1 className={styles.title}>{t("forgotPwd.memory")}</h1>
                <h2 className={styles.title}>{t("forgotPwd.vacation")}</h2>
                <ForgotPasswordForm />
            </div>
        </div>
    )
}