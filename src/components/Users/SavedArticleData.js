import React from "react";



const SavedArticleData = ({data,isSaved ,key}) =>{
    return(
        <>
            {isSaved ? (
            <div className="card-body">
              <h5 className="card-title">{data.title}</h5>
              <p className="card-text">This article is saved</p>
            </div>
          ) : (
            <div className="card-body">
              <h5 className="card-title">{data.title}</h5>
              <p className="card-text">This article is not saved</p>
            </div>
          )}
        </>
        
    )
}

export default SavedArticleData; 