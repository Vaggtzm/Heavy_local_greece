import React , {useState , useEffect} from "react";
import Navigation from "../Navigation/Navigation";
import UserNav from "../Users/UserNav";
import { auth } from "../../firebase";


const AppNav = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=> {
        auth.onAuthStateChanged((user) => {
            if(user) {
                setLoggedIn(true)
            }
            else {
                setLoggedIn(false)
            }
        });
    } , [] );

    return( loggedIn ? <UserNav/>: <Navigation />)
}
export default AppNav;