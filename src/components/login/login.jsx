import styles from "./login.module.css";
import { useActionState, useState } from "react";
import logoDonkeyProfile from "./../../assets/logo-donkey-profile.png";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth.js";
import { useTranslation } from "react-i18next";

export default function LoginPage({ switchForm }) {
    // trad
    const { t } = useTranslation();

    // Manage auth
    const { isAuthenticated, fetchLogin, fetchLogout } = useAuth();
    const [error, setError] = useState("");

    // Styling input
    const [emptyFields, setEmptyFields] = useState({
        email: true,
        password: true,
    });
    const handleChangeField = (field) => (e) => {
        setEmptyFields(prev => ({ ...prev, [field]: e.target.value === "" }));
    };

    // Manage status disconnected
    const [logoutMsg, setLogoutMsg] = useState("");
    const handleLogout = async () => {
        try {
            await fetchLogout();
            setLogoutMsg("You have been disconnected.");

        } catch (error) {
            setError("Error during logout.")
        }
    };

    // Styling input
    const [password, setPassword] = useState("");

    // ==== Manage form ====
    async function onSubmitForm(prevState, formData) {
        const data = {
            email: formData.get("email"),
            password: formData.get("password")
        }

        // Manage errors
        const errors = {};
        if (!data.email) errors.email = "The email is required.";
        if (!data.password) errors.password = "The password is required.";

        if (Object.keys(errors).length > 0) {
            return { data: null, errors, message: "Invalid data. All fields are required." }
        }

        try {
            await fetchLogin(data.email, data.password);

            // Reset the logout message
            setLogoutMsg("")

            // Styling input
            setEmptyFields({
                email: true,
                password: true,
            });

            setPassword("");

            return {
                data: data,
                message: `Your form has been successfully submitted. 🎉`,
                errors: {}
            };

        } catch (error) {

            return {
                data: null,
                errors: {},
                message: error.message || "Connection failed. Check your credentials."
            }
        };
    }

    // Submit ActionState
    const initialData = { data: null, message: null, errors: {} }
    const [state, handleform, isPending] = useActionState(onSubmitForm, initialData)

    return (
        <form action={handleform} className={styles.form}>
            <div className={styles.logo}>
                <img src={logoDonkeyProfile} alt="logo-donkey" />
            </div>
            <h3>{t("loginPage.login")}</h3>
            <div className={styles.input_group}>
                <input type="email" name="email" onChange={handleChangeField("email")} />
                {emptyFields.email && <label htmlFor="email">{t("loginPage.email")}</label>}
                {state.errors.email && (<span className={styles.error_msg}>{state.errors.email}</span>)}
            </div>
            <div className={styles.input_group}>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                        handleChangeField("password");
                        setPassword(e.target.value);
                    }}
                />
                {password === "" && <label htmlFor="password">{t("loginPage.password")}</label>}
                {state.errors.password && (<span className={styles.error_msg}>{state.errors.password}</span>)}
            </div>

            <div className={styles.remember_forgot}>
                <label htmlFor="remember" className={styles.custom_checkbox}>
                    <input type="checkbox" id="remember" />
                    <span className={styles.checkmark}></span>
                    <span>{t("loginPage.rememberme")}</span>
                </label>
                {/* // todo: ajouter une page Link / popup button pour les mots de passe oublié  */}
                <Link to="/forgot-pwd">{t("loginPage.forgotpassword")}</Link>
            </div>

            <button type="submit" disabled={isPending}>{(isPending) ? `${t("loginPage.submitting")}` : `${t("loginPage.login")}`}</button>

            {/* //? Afficher msg si connexion validée */}
            {logoutMsg
                ? (<p className={styles.message}>{logoutMsg}</p>)
                : state.message && (
                    <p className={styles.message}>
                        {state.message} {state.data?.email && `Welcome, ${state.data.email} !`}
                    </p>
                )
            }

            <div className={styles.register_link}>
                <p>{t("loginPage.noaccount")} <button type="button" onClick={switchForm}>{t("loginPage.register")}</button></p>
            </div>
        </form>
    )
}