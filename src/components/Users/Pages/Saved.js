import React , {useState , useEffect} from "react";
import { database } from "../../../firebase";
import { ref,onValue } from "firebase/database";
import AppNavigation from "../../AppNav/AppNav";
import { auth } from "../../../firebase";
import { useParams } from "react-router-dom";

const SavedArtciles = () => {
  const [data, setData] = useState(null);
  const [ currentUser,setCurrentUser] = useState();

  
  auth.onAuthStateChanged( async (user) =>{
    if (user) {
      setCurrentUser(user)
      console.log(user , "User logged in ");
        const dataRef = ref(database, `users/${user.uid}/savedArticles/`);
        onValue(dataRef, (snapshot) => {
            const fetchedData = snapshot.val();
            console.log(fetchedData , "Fetched data");
            setData(fetchedData);

        });
    } else {
        console.log("Ο χρήστης δεν είναι συνδεδεμένος");
    }
});
    return(
        <>
        <AppNavigation />
        <div className="container">
        <div className="row">
          {data ? (
            Object.keys(data).map((key) => (
              <div className="col-md-4" key={key}>
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{data[key].title}</h5>
                    <p className="card-text">{data[key].description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

        </>
    )
}
export default SavedArtciles;