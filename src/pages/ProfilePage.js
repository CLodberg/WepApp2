import { usersRef } from "../firebase-config";
import { useState, useEffect } from "react";
import { getAuth, signOut, deleteUser, EmailAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import placerholder from "../assets/profile-picture.jpg";


export default function ProfilePage({ currentUser }) {
    const [user, setUser] = useState({
        image: placerholder,
    });
    const auth = getAuth();

    useEffect( () => {
        async function getUser() {
        // if (auth.currentUser) {
            // setUser(auth.currentUser);
            const docRef = doc(usersRef, auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.data()) {
                setUser(prevUser => ({ ...prevUser, ...docSnap.data() }));
            }
        }
        getUser();
    }, [auth.currentUser]);

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setUser(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            };
        });
    }

    async function submitEvent(event) {
        event.preventDefault();

        const userToUpdate = { name: user.name, email: user.email, image: user.image };
            console.log(userToUpdate);
        const docRef = doc(usersRef, user.uid);

        await setDoc(docRef, userToUpdate);
    }

    // Sign out
    function handleSignOut() {
        signOut(auth);
    }

    // Delete user handler
    function handleUserDelete() {
        const auth = getAuth();
        const user = auth.currentUser;
    
        // If session expired, reauthenticate user credentials 
        const credentials = EmailAuthProvider.credential(
        user.email,
        'yourpassword'
        );
        user.reauthenticateWithCredential(credentials);
    
        deleteUser(user).then(() => {
        }).catch((error) => {
        // ...
        });
    }

    console.log(user.uid, auth.currentuser, user.name)

    return (
        <section className="page profile-page">
            <h1>Profil</h1>
           
            <form onSubmit={submitEvent}>
                <div className="profile-avatar">
                    <div className="user-img">
                        <img src={user?.image} alt={user.id} />
                    </div>
                    <label for="profilbillede">Profil billede</label>   
                </div>             
                <label for="name">Navn</label>
                    <input type="text" value={user?.name} onChange={handleChange} name="name" placeholder={`${user?.name}`} />
                <label for="email">Email</label>
                    <input type="email" value={user?.email} onChange={handleChange} name="email" placeholder={`${user?.email}`} />
                <button>Gem</button>
            </form>
            <button className="btn-outline" onClick={handleSignOut} data-id={user.id}>Log ud</button>
            <button className="btn-outline" onClick={handleUserDelete} data-id={user.id}>Slet bruger</button>

        </section>
    );
}

