import styles from "./home.route.module.css";
import RegisterPage from "../components/register/register.jsx";
import LoginPage from "../components/login/login.jsx";
import { useState } from "react";


export default function HomePage() {

    // ==== Manage connexion ====
    const [activeForm, setActiveForm] = useState("login");


    return (
        <div className="page">
            <h1 className={styles.title}>Donkey</h1>
            <div className={styles.wrapper}>
                {activeForm === "login"
                    ? <LoginPage
                        switchForm={() => setActiveForm("register")} />
                    : <RegisterPage
                        switchForm={() => setActiveForm("login")} />
                }
            </div>
        </div>
    )
};