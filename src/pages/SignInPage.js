import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

export default function SignInPage() {
    const [errorMessage, setErrorMessage] = React.useState("");

    function signIn(event) {
        event.preventDefault();
        const mail = event.target.mail.value;
        const password = event.target.password.value;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, mail, password)
            .then(userCredential => {
                // Signed in
                const user = userCredential.user;
                // ...
                console.log(user)
            })
            .catch(error => {
                let code = error.code;
                code = code.replaceAll("-", " ");
                code = code.replaceAll("auth/", "");
                setErrorMessage(code);
            });
    }
    return (
        <section className="page">
            <div className="signin-cntr">
            <form className="signin-form" onSubmit={signIn}>
                <h1 className="logo">Task<span>Roomies</span></h1>
                <p>Log ind</p>
                <input type="email" name="mail" placeholder="Email" />
                <input type="password" name="password" placeholder="Adgangskode" />
                <p className="text-error">{errorMessage}</p>
                <button className="signin-btn">Log ind</button>
            </form>
            <p className="text-center">
             <Link to="/signup">Opret bruger</Link>
            </p>
            </div>
        </section>
    );
}