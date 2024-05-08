import React , {useState , useEffect} from "react";
import { database } from "../../../firebase";
import { ref,onValue } from "firebase/database";
import AppNavigation from "../../AppNav/AppNav";
import { auth } from "../../../firebase";
import { useParams } from "react-router-dom";

const SavedArtciles = () => {
  const [data, setData] = useState(null);
  const { name } = useParams();

  useEffect(() => {
      const fetchData = async () => {
          const currentUser = auth.currentUser;
          if (currentUser) {
              const dataRef = ref(database, `users/${currentUser.uid}/savedArticles/${name}`);
              onValue(dataRef, (snapshot) => {
                  const fetchedData = snapshot.val();
                  setData(fetchedData);
              });
          } else {
              console.log("Ο χρήστης δεν είναι συνδεδεμένος");
          }
      };
      fetchData();

      return () => {
          // Εδώ μπορείτε να προσθέσετε κάποιον κώδικα για καθαρισμό (προαιρετικό)
      };
  }, [name]);
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