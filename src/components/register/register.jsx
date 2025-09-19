import styles from "./register.module.css";
import { useActionState, useState } from "react";
import { nanoid } from "nanoid";
import logoDonkey from "./../../assets/logo-donkey.jpg";
import useAuth from "../../hooks/useAuth.js";

export default function RegisterPage({ switchForm }) {
    // Manage auth
    const { fetchRegister, fetchLogin } = useAuth();

    // Styling input
    const [emptyFields, setEmptyFields] = useState({
        firstname: true,
        lastname: true,
        email: true,
        password: true,
    });
    const handleChangeField = (field) => (e) => {
        setEmptyFields(prev => ({ ...prev, [field]: e.target.value === "" }));
    };

    // Manage password
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    function validatePassword(value) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        return passwordRegex.test(value);
    }

    const handleChangePassword = (value) => {
        if (!validatePassword(value)) {
            setPasswordError("The password must contain at least 8 characters, one uppercase letter, one number, and one special character.");
        } else {
            setPasswordError("");
        }
    }

    // ==== Manage form ====
    async function onSubmitForm(prevState, formData) {
        const requiredFields = ["firstname", "lastname", "email", "password"];
        const data = {};


        const errors = {};
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

        for (const field of requiredFields) {
            // Get data
            const value = formData.get(field);
            data[field] = value;

            // Add errors
            if (!value) {
                errors[field] = "This field must be completed.";
            } else if (field === "password" && !passwordRegex.test(value)) {
                errors.password = "The password must contain at least 8 characters, one uppercase letter, one number, and one special character.";
            };
        };

        if (Object.keys(errors).length > 0) {
            return { data: null, errors, message: "Invalid data. All fields are required." }
        };

        try {
            console.log("Data sent to backend:", data);
            const result = await fetchRegister(data.firstname, data.lastname, data.email, data.password);

            // Styling input
            setEmptyFields({
                firstname: true,
                lastname: true,
                email: true,
                password: true,
            });
            setPassword("");
            setPasswordError("");

            // Go to login page
            await fetchLogin(data.email, data.password);


            return {
                data: result.user,
                message: "Your account has been created successfully 🎉",
                errors: {}
            };

        } catch (error) {
            
            return {
                data: null,
                errors: {},
                message: error.message || "Registration failed."
            };
        };
    };

    // Submit ActionState
    const initialData = { data: null, message: null, errors: {} }
    const [state, handleform, isPending] = useActionState(onSubmitForm, initialData)

    return (
        <form action={handleform} className={styles.form}>
            <div className={styles.logo}>
                <img src={logoDonkey} alt="logo-donkey" />
            </div>
            <h3>Register</h3>
            <div className={styles.input_group}>
                <input type="text" name="firstname" onChange={handleChangeField("firstname")} />
                {emptyFields.firstname && <label htmlFor="firstname">Firstname</label>}

                {/* Error message */}
                {state.errors.firstname && (<span className={styles.error_msg}>{state.errors.firstname}</span>)}
                {/* ------------- */}
            </div>
            <div className={styles.input_group}>
                <input type="text" name="lastname" onChange={handleChangeField("lastname")} />
                {emptyFields.lastname && <label htmlFor="lastname">Lastname</label>}

                {/* Error message */}
                {state.errors.lastname && (<span className={styles.error_msg}>{state.errors.lastname}</span>)}
                {/* ------------- */}
            </div>
            <div className={styles.input_group}>
                <input type="email" name="email" onChange={handleChangeField("email")} />
                {emptyFields.email && <label htmlFor="email">Email</label>}

                {/* Error message */}
                {state.errors.email && (<span className={styles.error_msg}>{state.errors.email}</span>)}
                {/* ------------- */}
            </div>
            <div className={styles.input_group}>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                        handleChangeField("password");
                        setPassword(e.target.value);
                        handleChangePassword(e.target.value);
                    }}
                />
                {password === "" && <label htmlFor="password">Password</label>}

                {/* Error message */}
                {state.errors.password
                    ? (<span className={styles.error_msg}>{state.errors.password}</span>)
                    : (passwordError && <span className={styles.error_msg + " " + styles.check_password}>{passwordError}</span>)
                }
                {/* ------------- */}
            </div>

            <button type="submit" disabled={isPending}>{(isPending) ? "Validation in progress..." : "Register"}</button>
            {state.message && (<p className={styles.message}>{state.message}</p>)}

            <div className={styles.register_link}>
                <p>Already have an account? <button type="button" onClick={switchForm}>Login</button></p>
            </div>
        </form>
    )
}