import React from "react";
import Navigation from "./../../compoments/Navigation/Navigation";
import Socials from "../../compoments/SocialMedia/socials";
import './gallery.css';
import GalleryItem01 from './GalleryItems/art-item.jpg';
import GalleryItem02 from './GalleryItems/art-item02.jpg';
import GalleryItem03 from './GalleryItems/art-item-03.jpg';
import GalleryItem04 from './GalleryItems/art-item-04.jpg';
import GalleryItem05 from './GalleryItems/gallery-item05.jpg';
import GalleryItem06 from './GalleryItems/gallery-item06.jpg';

const ArtGallery = () => {
  const galleryItems = [
    { image: GalleryItem01, title: "Απο τον ριν (by rin )" , descriptionGrekk:"Περιγραφή: αφηρημένο σκίτσο ανάποδη πεντάλφα, του Ριν", descriptionEng:"Description: abstract sketch of an inverted pentagram" },
    { image: GalleryItem02,  title: "Απο τον ριν (by rin )" , descriptionGrekk:"Περιγραφή: τοπίο εμπνευσμένο από τα album cover του His Majesty at the Swamp των Varathron και του Non Serviam των Rotting Christ", descriptionEng:"Description: landscape sketch inspired by the album covers of His Majesty at the Swamp - Varathron and Non Serviam - Rotting Christ."  },
    { image: GalleryItem03,title: "Απο τον ριν (by rin )" , descriptionGrekk:"Περιγραφή: monster concept art, του Ριν", descriptionEng:"Description: monster concept art, by Rin" },
    { image: GalleryItem04, title: "Απο την βαρβαρα " , descriptionGrekk:"Περιγραφή: Artwork για το sigle του συγκροτηματος scent of thorns ", descriptionEng:"Description: Artwork cover for 'devour the will ' by scent of thorns " },
    { image: GalleryItem05,title: "Απο τον ριν (by rin )" , descriptionGrekk:"Περιγραφή: γρήγορο σκίτσο φωτογραφίας του Euronymous (Mayhem) με μολύβι, του Ριν", descriptionEng:"Description: quick sketch of a photo depicting Euronymous (Mayhem), done with pencil by Rin"  },
    { image: GalleryItem06, title: "Απο τον ριν (by rin )" , descriptionGrekk:"Περιγραφή: σκίτσο του δαίμονα Buer για αυτοκόλλητα, του Ριν", descriptionEng:"Description: Illustration of the demon Buer as a sticker design, by Rin" }
  ];

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="display-2 m-4">Art Gallery</h3>
            <hr className="bg-dark" />
            <p className="lead text-center">Metal inspired artworks by YOU</p>
            <Socials />
          </div>
          <div className="container gallery-container">
            <div className="tz-gallery">
              <div className="row">
                {galleryItems.map((item, index) => (
                  <div className="col-sm-12 col-md-4" key={index}>
                    <div className="card mb-3">
                      <a
                        className="lightbox"
                        href={item.image}
                      >
                        <img
                          src={item.image}
                          alt={item.description}
                          className="card-img-top"
                        />
                      </a>
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">
                          {item.descriptionGrekk}
                        </p>
                        <p className="card-text">
                          {item.descriptionEng}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <h3>Submit your art at </h3>
        <p>heavylocalgreece@gmail.com</p>
      </div>
    </>
  );
};

export default ArtGallery;
