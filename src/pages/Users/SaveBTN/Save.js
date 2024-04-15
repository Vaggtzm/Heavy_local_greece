 import React , {useEffect , useState} from "react";
 import {useParams} from 'react-router-dom';
 import { app } from "../../../firebase.js";
 import {getDatabase , ref , set , push} from "firebase/database";
import { getDownloadURL} from "firebase/storage";
import { storage } from "../../../firebase.js";
 


 const SaveBTN = () =>{
  const {name} = useParams();
  const [articles , setArticles] = useState([]);


       const HandleSave = async () => {
        const db = getDatabase(app);
       const newDocRef = push(ref(db , 'articles'));
        set(newDocRef , {
          'savedName': name
        })
    }

    const getFirebaseStorageUrl = async (imageUrl) => {
      // Parse imageUrl to extract filename (assuming imageUrl is in the format "https://example.com/images/filename.jpg")
      const fileName = imageUrl.split('/').pop(); // Extract filename from imageUrl
      const storageRef = ref(storage, `images/${fileName}`); // Construct Firebase Storage reference

      // Get download URL for the Firebase Storage object
      return await getDownloadURL(storageRef);
  };


  useEffect(() => {
    const fetchData = async ()=>{
      try{
        const articleSnapshot = await getDownloadURL(ref(storage , `articles/${name}.json`));
        console.log(articleSnapshot);
        const response = await fetch(articleSnapshot);
        if(!response.ok){
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        data.img01 = await getFirebaseStorageUrl(data.img01);
        setArticles(data);
  
      } catch (error) {
          console.error('Error fetching data:' , error.message);
      }
    };
    fetchData();
  }, [name]);
     return(
      <button className="btn btn-danger" onClick={HandleSave} >Save</button>
     )
 }
 export default SaveBTN