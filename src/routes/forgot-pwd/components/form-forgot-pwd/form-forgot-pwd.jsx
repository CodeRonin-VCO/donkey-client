import { useState } from "react";
import styles from "./form-forgot-pwd.module.css";

export default function ForgotPasswordForm() {
    // Styling input
    const [emptyFields, setEmptyFields] = useState({
        email: true,
        password: true,
    });
    const handleChangeField = (field) => (e) => {
        setEmptyFields(prev => ({ ...prev, [field]: e.target.value === "" }));
    };

    return (
        <form action="" className={styles.form}>
            <h3 className={styles.title}>Reset your password</h3>
            <div className={styles.input_group} >
                <input type="email" />
                {emptyFields.email && <label htmlFor="email">Email</label>}
                {/* {state.errors.email && (<span className={styles.error_msg}>{state.errors.email}</span>)} */}

            </div>
            {/* // todo: Activer un bouton qui envoie un mail pour reset le password */}
            <button type="submit">Send link</button>
        </form>
    )
};