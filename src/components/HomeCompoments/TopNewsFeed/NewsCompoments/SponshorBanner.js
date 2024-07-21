import React from "react";
import './Sponshorbanner.css';
import './ReviewsBanner.css'
import Angels from './Banners/Angels-removebg-preview.png';
import Artizans from './Banners/artisans-removebg-preview.png';
import Kingdom from './Banners/MyKingdomMusic-removebg-preview.png';
import Atomic from './Banners/logo_atomic_stuff.png';

const Sponshorbanner = ()=>{
    return(
        <>
        <div className="SponshorBanner bg-secondary rounded-2">
        <div className="container">
        
        <h3 className="text-white">Collaborators and friendly pages</h3>
                <div className="row">
                    <div className="col-md-12">
                        <div className="SponshorBox d-flex">
                            <div className="Box-Angels ">
                                <img src={Angels} className="m-2 img-fluid" />
                            </div>
                            <div className="Box-Artizans">
                                <img src={Artizans} className="m-2 img-fluid"/>
                            </div>
                            <div className="Box-Kingdom">
                                <img src={Kingdom}  className="m-2 img-fluid"/>
                            </div>
                            <div className="Box-Atomic">
                                <img src={Atomic}  className="m-2 mt-5 img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
        </>
    )
}

export default Sponshorbanner;