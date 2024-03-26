import React from "react";
import { FacebookShareButton } from "react-share";

const SocialBar = ()=>{
    const CurrentPage = typeof window !== 'undefined' ? window.location.href : '';
    return(
       <FacebookShareButton url={CurrentPage}>
        Share To Facebook
       </FacebookShareButton>
    );
};

export default SocialBar;