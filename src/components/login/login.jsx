import styles from "./login.module.css";
import { useActionState, useState } from "react";
import logoDonkeyProfile from "./../../assets/logo-donkey-profile.png";
import { Link } from "react-router";

// todo: connecter au server
// ==== Fake server ====
async function fakeSendToServer(data) {
    await (new Promise((resolve) => setTimeout(resolve, 1_000)));
    console.log('Data sent!');
};



export default function LoginPage({ isConnected, setIsConnected, checkUserDB, switchForm }) {
    // Styling input
    const [emptyFields, setEmptyFields] = useState({
        email: true,
        password: true,
    });
    const handleChangeField = (field) => (e) => {
        setEmptyFields(prev => ({ ...prev, [field]: e.target.value === "" }));
    };

    // Manage status : connected/disconnected
    const [logoutMsg, setLogoutMsg] = useState("");
    const handleLogout = () => {
        setIsConnected(false);
        setLogoutMsg("You have been disconnected.");
    };

    // Styling input
    const [password, setPassword] = useState("");

    // Manage form
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

        const result = checkUserDB({
            inusername: data.email,
            inpassword: data.password
        });

        if (result.errorCheck) {
            return { data: null, errors, message: result.msg };
        }

        // todo: connecter au server?
        // Connection to fake server
        await fakeSendToServer(data);

        // Reset the logout message
        setLogoutMsg("")

        // Styling input
        setEmptyFields({
            email: true,
            password: true,
        });

        setPassword("");

        return { data: data, message: "Your form has been successfully submitted. 🎉", errors }
    }

    // Submit ActionState
    const initialData = { data: null, message: null, errors: {} }
    const [state, handleform, isPending] = useActionState(onSubmitForm, initialData)

    return (
        <form action={handleform} className={styles.form}>
            <div className={styles.logo}>
                <img src={logoDonkeyProfile} alt="logo-donkey" />
            </div>
            <h3>Log in</h3>
            <div className={styles.input_group}>
                <input type="email" name="email" onChange={handleChangeField("email")} />
                {emptyFields.email && <label htmlFor="email">Email</label>}
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
                {password === "" && <label htmlFor="password">Password</label>}
                {state.errors.password && (<span className={styles.error_msg}>{state.errors.password}</span>)}
            </div>

            <div className={styles.remember_forgot}>
                <label htmlFor="remember" className={styles.custom_checkbox}>
                    <input type="checkbox" id="remember" />
                    <span className={styles.checkmark}></span>
                    <span>Remember me</span>
                </label>
                {/* // todo: ajouter une page Link / popup button pour les mots de passe oublié  */}
                <Link to="/forgot-pwd">Forgot password?</Link>
            </div>

            <button type="submit" disabled={isPending}>{(isPending || isConnected) ? "Submitting..." : "Log in"}</button>

            {/* //? Afficher msg si connexion validée */}
            {logoutMsg
                ? (<p className={styles.message}>{logoutMsg}</p>)
                : state.message && (
                    <p className={styles.message}>
                        {state.message} {state.data?.email && `Welcome, ${state.data.email} !`}
                    </p>
                )
            }

            {/* //? Bouton déconnexion */}
            {isConnected && (
                <button onClick={handleLogout}>Se déconnecter</button>
            )}

            <div className={styles.register_link}>
                <p>Don't have an account? <button type="button" onClick={switchForm}>Register</button></p>
            </div>
        </form>
    )
}