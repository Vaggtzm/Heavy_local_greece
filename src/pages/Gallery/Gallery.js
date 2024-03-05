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
                <div className="col-sm-12 col-md-4">
                  <a
                    className="lightbox"
                    href={GalleryItem01}
                  >
                    <img
                      src={GalleryItem01}
                      alt="Bridge"
                      className="img-fluid w-100 h-100"
                    />
                  </a>
                </div>
                <div className="col-sm-6 col-md-4">
                  <a
                    className="lightbox"
                    href={GalleryItem02}
                  >
                    <img
                      src={GalleryItem02}
                      alt="Park"
                      className="img-fluid w-100 h-100"
                    />
                  </a>
                </div>
                <div className="col-sm-6 col-md-4">
                  <a
                    className="lightbox"
                    href={GalleryItem03}
                  >
                    <img
                      src={GalleryItem03}
                      alt="Tunnel"
                      className="img-fluid w-100 h-100"
                    />
                  </a>
                </div>
                <hr className="bg-dark" />
                <div className="col-sm-12 col-md-8">
                  <a
                    className="lightbox"
                    href={GalleryItem04}
                  >
                    <img
                      src={GalleryItem04}
                      alt="Traffic"
                      className="img-fluid w-100 h-100"
                    />
                  </a>
                </div>
                <div className="col-sm-6 col-md-4">
                  <a
                    className="lightbox"
                    href={GalleryItem05}
                  >
                    <img
                      src={GalleryItem05}
                      alt="Coast"
                      className="img-fluid w-100 h-100"
                    />
                  </a>
                </div>
                <div className="col-sm-6 col-md-4">
                  <a
                    className="lightbox"
                    href={GalleryItem06}
                  >
                    <img
                      src={GalleryItem06}
                      alt="Rails"
                      className="img-fluid w-100 h-100"
                    />
                  </a>
                </div>
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
