import React , {useState , useEffect} from "react";
import { database , storage } from "../../../firebase";
import { ref,onValue } from "firebase/database";
import AppNavigation from "../../AppNav/AppNav";
import { auth } from "../../../firebase";
import SavedArticleData from "../SavedArticleData";
import { useParams } from "react-router-dom";
import { getDownloadURL} from "firebase/storage";



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

const getFirebaseStorageUrl = async (imageUrl) => {
  const fileName = imageUrl.split("/").pop();
  const storageRef = ref(storage, `images/${fileName}`);
  return await getDownloadURL(storageRef);
};


const fetchData = async (link) => {
  const isEarlyAccess = false;

  try {
    let articleSnapshot;
    if (isEarlyAccess) {
      articleSnapshot = await getDownloadURL(
        ref(storage, `early_releases/${link}.json`)
      );
    } else {
      articleSnapshot = await getDownloadURL(
        ref(storage, `articles/${link}.json`)
      );
    }

    const response = await fetch(articleSnapshot);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    data.img01 = await getFirebaseStorageUrl(data.img01);
    return  data
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

    return(
        <>
    <AppNavigation />
    <div className="container">
      <h1>Saved Articles</h1>
      <div className="row">
        {data ? (
          Object.entries(data).map(([key, isSaved]) => (
            <div className="col-md-4 mb-4" key={key}>
            
              <div className="card">
              <SavedArticleData data={fetchData(key)} key={key} isSaved={isSaved}/>
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