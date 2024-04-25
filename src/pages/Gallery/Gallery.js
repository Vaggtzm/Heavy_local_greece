import React from "react";
import Navigation from "./../../compoments/Navigation/Navigation";
import Socials from "../../compoments/SocialMedia/socials";
import './gallery.css';

const ArtGallery = () => {
  const galleryItems = [
    { image: "/assets/gallery/art-item.jpg", title: "Απο τον ριν (by rin )" , descriptionGrekk:"Περιγραφή: αφηρημένο σκίτσο ανάποδη πεντάλφα, του Ριν", descriptionEng:"Description: abstract sketch of an inverted pentagram" },
    { image: "'/assets/gallery/art-item02.jpg'",  title: "Απο τον ριν (by rin )" , descriptionGrekk:"Περιγραφή: τοπίο εμπνευσμένο από τα album cover του His Majesty at the Swamp των Varathron και του Non Serviam των Rotting Christ", descriptionEng:"Description: landscape sketch inspired by the album covers of His Majesty at the Swamp - Varathron and Non Serviam - Rotting Christ."  },
    { image: "/assets/gallery/art-item-03.jpg",title: "Απο τον ριν (by rin )" , descriptionGrekk:"Περιγραφή: monster concept art, του Ριν", descriptionEng:"Description: monster concept art, by Rin" },
    { image: '/assets/gallery/art-item-04.jpg', title: "Απο την βαρβαρα " , descriptionGrekk:"Περιγραφή: Artwork για το sigle του συγκροτηματος scent of thorns ", descriptionEng:"Description: Artwork cover for 'devour the will ' by scent of thorns " },
    { image: '/assets/gallery/gallery-item05.jpg',title: "Απο τον ριν (by rin )" , descriptionGrekk:"Περιγραφή: γρήγορο σκίτσο φωτογραφίας του Euronymous (Mayhem) με μολύβι, του Ριν", descriptionEng:"Description: quick sketch of a photo depicting Euronymous (Mayhem), done with pencil by Rin"  },
    { image: '/assets/gallery/gallery-item06.jpg', title: "Απο τον ριν (by rin )" , descriptionGrekk:"Περιγραφή: σκίτσο του δαίμονα Buer για αυτοκόλλητα, του Ριν", descriptionEng:"Description: Illustration of the demon Buer as a sticker design, by Rin" },
    { image: '/assets/gallery/Goth01.png', title: " Απο την Goth lady (by goth Lady  )" },
    { image: '/assets/gallery/goth02.png', title: "Απο την Goth lady  Απο την Goth lady (by goth Lady )"  },
    { image: '/assets/gallery/goth03.png', title: " Απο την Goth lady (by goth Lady )"  },
    { image: '/assets/gallery/goth04.png', title: " Απο την Goth lady (by goth Lady )"  }

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
