import styles from "./home.route.module.css";
import RegisterPage from "../components/register/register.jsx";
import LoginPage from "../components/login/login.jsx";
import { useState } from "react";


export default function HomePage() {
    // TODO: ajouter DB
    // ==== Fake data ====
    const users = [
        { user_name: "vincent@donkey.com", password: "Donkey123!" },
        { user_name: "jean@peuplu.com", password: "SecurePass42!" },
    ];

    // ==== Manage connexion ====
    const [isActive, setIsActive] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [activeForm, setActiveForm] = useState("login");


    function checkUserDB(userConnect) {
        if (isConnected) {
            return { msg: "A user is already logged in.", errorCheck: true };
        }
        const userFound = users.find(user => user.user_name === userConnect.inusername && user.password === userConnect.inpassword)

        if (!userFound) {
            setIsActive(false)

            return { msg: "Unknown user.", errorCheck: true };

        } else {
            setIsActive(true);
            setIsConnected(true);
            console.log("You are logged in.");


            return { msg: "You are logged in.", errorCheck: false };
        }
    };

    return (
        <div className="page">
            <h1 className={styles.title}>Donkey</h1>
            <div className={styles.wrapper}>
                {/* // todo: Rajouter le isConnected vers la page "Fil d'actualité à créer" */}
                {activeForm === "login"
                    ? <LoginPage
                        isConnected={isConnected}
                        setIsConnected={setIsConnected}
                        checkUserDB={checkUserDB}
                        switchForm={() => setActiveForm("register")} />
                    : <RegisterPage
                        switchForm={() => setActiveForm("login")} />
                }
            </div>
        </div>
    )
};