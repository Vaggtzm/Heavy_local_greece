import AppNavigation from "../../components/AppNav/AppNav";
import React from "react";
import Author from "./Author/Author";

const Authors = ()=>{
    return(
        <>
            <AppNavigation />

            <div className="container">
                <h1 className="my-4">User Cards</h1>
                <div className="row">

                    <div className="col-6 m-2">
                        <Author userId={'gbK4OvgKbyYDfYCfIjboOqjA9Yv1'}/>
                    </div>
                    <div className="col-5 m-2">
                        <Author userId={'uSXH49YHlzT8vjQ94ZuJTOz351m2'}/>
                    </div>
                    <div className="col-6 m-2">
                        <Author userId={'QY7GE8irSce3f4AFKW20DAWVxhr2'}/>
                    </div>
                    <div className="col-5 m-2">
                        <Author userId={"VSGMmP7o4DWwimc0tZjHC02487B3"}/>
                    </div>
                    <div className="col-6 m-2">
                        <Author userId={"mmQTo2rdEDZ7YsnpJn15gCuaWz93"}/>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Authors;