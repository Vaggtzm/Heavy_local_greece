import React from "react";
import { NavLink } from "react-router-dom";
import SpotifyBannger from './../../SpotifyBanner/SpotifyBanner'
import './ReviewsBanner.css'

const ReviewsBanner = () => {
   return(
    <>
    <div className="jumbotron jumbotron-fluid ReviewsBanner">
    <div className="container ">
    <h2 className="display-4 text-white m-2">Latest Reviews:</h2>
        <div className="row">
        <div className="col-md-6">
        <div className="CollageBox d-flex flex-wrap">
            <div className="Img-box m-1">
                <img src="https://storage.googleapis.com/heavy-local-12bc4.appspot.com/images/a2851302924_16_800x800.jpg?GoogleAccessId=firebase-adminsdk-asgq1%40heavy-local-12bc4.iam.gserviceaccount.com&Expires=1740787200&Signature=W0t%2FM0I7L58NecCnfvWM2bOOWuN82IdOHO87WXdnp8vJ%2FvuL10j%2BLdYn%2BEyM2SMvXkyL%2B30W%2BYV4MNCrOnWNc9b6XlMCajOJs3T5CBZoXGpEWClJuWkJ0qYUv5ie9d06Q3P5m3e1bRfUZ70XqVQL4gWvVBFLZNi7q3mjsgKyD39DttfTnOiw6ldrGt1LzLwJ9tIW9C457PLOVng1t0lDfkco0fuUlcomSNMHHfpGuQwCPCdoiLotEanexMM1COwyYGgB2lcNE%2F87u4Moj9Or0orPvxLieJzHGZNtebXqsA4Zyw%2B43wmo%2B01bfdwJxIDge95tjoYo9Ooi6r%2Bof616ow%3D%3D" />
            </div>
            <div className="Img-box">
            <img src="https://storage.googleapis.com/heavy-local-12bc4.appspot.com/images/Of_the_Muses_800x800.jpeg?GoogleAccessId=firebase-adminsdk-asgq1%40heavy-local-12bc4.iam.gserviceaccount.com&Expires=1740787200&Signature=QCT9pAPG5UgdkZpHfoGOwDT6Ij2BgDY30UxuEcRhwxeSDsWHJyQKTZr4Tvz6SBkOCmATSRgAXKW7UztUj5Bt7oavA24vc8pQCl%2F09UUnWt%2B3G%2B1PYsJYr9RxRfbzQqO6vZALLBlckcdN4pJEFvHevCFqJSYoAYqp6Jozj1vVEi4z%2FmTzLyj1bhxhP0z2949x7MMQpdSSW0c1TpVmEQeFzS%2BPzLLqviBBd69X2Dh51B4oxMGsjGMTmHI9Y6cBbsVfYH1vlr1IrWPId8ITjmubCsyBJxXG4XM3Pnu7%2F9MTHoXPR6o55GLMLKi4YCH17wLu5IlESQrPirtL2vgKKUBvdw%3D%3D" />

            </div>
            <div className="Img-box">
            <img src="https://storage.googleapis.com/heavy-local-12bc4.appspot.com/images/Acyl_800x800.webp?GoogleAccessId=firebase-adminsdk-asgq1%40heavy-local-12bc4.iam.gserviceaccount.com&Expires=1740787200&Signature=VeGLmUhQrJUc4jb8mYgF%2Bm0M10M8BKCe9eu63CusW5YsObWCSc3aqeeHBGdnPhu%2FirGszbrpA0GS6RtXyxjqTd%2BN3iz0o%2BDcP%2FajegJKn53h6Rv5%2BpDYI5ZThhMbUyXm%2F9zAB3Ssh9n%2FW9%2Bn%2BzBRPRnxCA7onmkT7oXjZsTOud9n%2Fa7CeCPeOTEijI5afUumvwt9ijKGIv8Es3DDQoYE4R6HKYZnddNS0zdKhOMmYv%2Fl0wGphFK%2FQtwvmBmZNVUoU%2FueoX%2FGzJlJAkOAzNExDnsk30WG%2FjJZd4mtspyJmoycRuzIUjk8ign5quqMxay15YdjyJj1QZDcHzBf5rbz0A%3D%3D" />
            </div>

        </div>
     </div>
     <div className="col-md-6">
     <div className="ExpolreBox">
     <h3 className="text-white text-center">
     Take a look  at our  <span className="text-danger">latest</span>  reviews </h3>
     <p className="lead text-white text-center">
     new bands , singles and albums every week !

     </p>
     <div className="Button Box d-flex justify-content-center align-items-center">
     <NavLink to="/articles-page" className="btn btn-danger">
      Explore 
     </NavLink>
     </div>

     </div>
     <h2 className=" text-white m-2 pb-4 text-center">Spotify Latest Releases:</h2>
    <SpotifyBannger  className="m-3"/>
     </div>
     <div className="col-md-4">

     </div>

        </div>
    </div>
    </div>
    
    </>
   )
}

export default ReviewsBanner