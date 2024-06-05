import {useEffect, useState} from "react";
import {auth} from "../../firebase";
import UserNav from "./../Users/UserNav";
import Navigation from "./Navigation";

const AppNavigation = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setLoggedIn(!!user); // Ελέγχει αν υπάρχει χρήστης και ενημερώνει την κατάσταση εισόδου
        });

        // Καθαρίζει την συνδρομή όταν το component ξεφορτώνεται
        return () => unsubscribe();
    }, []);

    // Επιστρέφει το ανάλογο Navbar ανάλογα με την εισαγωγή του χρήστη
    return loggedIn ? <UserNav/> : <Navigation/>;
};

export default AppNavigation;
