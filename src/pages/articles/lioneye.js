import React from "react";
import Navigation from "../../compoments/Navigation/Navigation";
import './articles.css'
import LioneyeImg01 from './../../assets/lioneye.jpg';
import LioneyeImg02 from './../../assets/lioneye-live.jpg';
import Footer from "../../compoments/footer/footer";
import ReadMore from "../../compoments/ReadMore/ReadMore";
import Contact from "../../compoments/ContactForm/contact";
import Donate from "../../compoments/donate/donate";
const Lioneye = ()=> {
  return(
    <>
    <Navigation />
    <div className="container-fluid ">
      <div className="row">
        <div className="col-md-12">
          <h1 className="display-4 mt-4 p-2 text-center">Lioneye - S.E.X</h1>
          <div className="details text-center">
          <p className="lead">Track List:</p>
          <p className="lead">01:The game</p>
          <p className="lead">02:Sin City Blues</p>
          <p className="lead">03:GRind down</p>
          <p className="lead">04:S.E.X</p>
          <p className="lead">05:I can't miss you anymore</p>
          <p className="lead">Συνολική Ακρόαση: 20 λεπτά</p>

          </div>
        <hr className="bg-dark"></hr>
        </div>
        <div className="col-md-6 image-box">
          <img src={LioneyeImg01} className="img-fluid w-100 h-50 rounded-4 shadow-lg"></img>
          <p className="lead text-center">Ακου το S.E.X <a href="https://youtube.com/playlist?list=PLoZpVSc7Ipf_6zDhVzEvshdn4t4mVt24k&si=JLC3PhwGtymsg100">ΕΔΩ</a></p>
          <p className="lead-text-center">Βρες τους Lioneye <a href="https://www.instagram.com/lioneye_official/"><i className="bi bi-instagram"></i></a> <a href="https://web.facebook.com/LioneyeTheBand/?_rdc=1&_rdr"><i className="bi bi-facebook"></i></a></p>

        </div>
        <div className="col-md-6">
          <p className="m-2">
          Ας ταξιδέψουμε λίγο πίσω στον χρόνο, σε μια περίοδο όπου αυτό το περιοδικό βρισκόταν ακόμη στον ψηφιακό κόσμο. Ήταν εκεί που οι τοπικοί μας Glam metallers, οι Lioneye, έκαναν το εντυπωσιακό τους ποδαρικό για το 2024 με το νέο τους άλμπουμ, το S.E.X. Η μπάντα παρουσιάζει ένα EP που φέρνει στο φως πέντε κομμάτια, όπου το καθένα από αυτά αποτελεί ένα ξεχωριστό μουσικό ταξίδι με την μοναδική υπογραφή της εν λόγω μπάντας. Το tracklist περιλαμβάνει τα “The Game”, “Sin City Blues”, “Grind Down”, “S.E.X.” και “I Can’t Miss You Anymore”, προσφέροντας συνολικά 20 λεπτά ακρόασης.          </p>
          <hr className="bg-dark"></hr>
          <img src={LioneyeImg02} className=" w-100 img-fluid rounded-4 shadow-lg"></img>
          <hr className="bg-dark"></hr>
          <p className="m-2">
          Σε γενικές γραμμές το άλμπουμ είναι μια ωδή στον classic ήχο του Glam Metal της δεκαετίας του ‘80. Οι Lioneye δείχνουν τον δρόμο τους με συνθέσεις που ακολουθούν τα παραδοσιακά καλούπια του είδους, επιστρέφοντας σε αυθεντικούς ήχους που συνέθεσαν οι πατέρες του Glam όπως οι θρυλικοί Mötley Crüe . 
Με το χαρακτηριστικό τους παίξιμο και με μια σύγχρονη προσεγγιστική πινελιά φαίνεται ότι είναι έτοιμοι να κατακτήσουν την σκηνή της Glam Metal. Το S.E.X. αναμένεται να καθηλώσει τα αυτιά σας και να αφήσει μια εντυπωσιακή σφραγίδα στην πορεία της μπάντας. 

Το αν οι Lioneye ξυπνήσουν μνήμες ή αποκτήσουν νέους οπαδούς είναι ένα ερώτημα που θα απαντηθεί έπειτα από 20 λεπτά ακρόασης.
          </p>
          <hr className="bg-dark"></hr>

          <ReadMore />

        </div>
      </div>
    </div>
    </>
  )
}

export default Lioneye;