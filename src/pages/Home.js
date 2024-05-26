import React from "react";
import AppNavigation from "../components/AppNav/AppNav";
import "./home.css";
import Footer from "../components/footer/footer";
import Socials from "../components/SocialMedia/socials";
import SocialBar from "../components/ShareBtns/SocialMediaBar";
import SpotifyBanner from "../components/SpotifyBanner/SpotifyBanner";
import Youtube from "../components/YoutubeAPI/Youtube";
import PrimaryCarousel from "../components/PrimaryCarousel/PrimaryCarousel";
import SecondaryCarousel from "../components/carousel/carousel";
import CasterFmPlayer from "../components/Users/CasterFmPlayer";
import {NavLink} from "react-router-dom";
const Home = () => {
  
  return (
    <>   
   <AppNavigation />
      <header>

        <div className="container mt-4 main ">
          <div className="row text-center  p-3 m-2 shadow-lg">
            <div className="col-md-12">
              <div className="jumbotron jumbotron-fluid">
                <div className="container-fluid">
                  <h1 className="display-4">
                    Welcome to <span className="font-1">Pulse Of The Underground</span>{" "}
                  </h1>
                  <PrimaryCarousel />
                  <p className="lead">
                    Stay brutal and explore the unknown metal news, reviews, and
                    features!
                  </p>
                  <hr className="bg-dark" />
                  <Socials />
                  
                  <SocialBar/>
                  <hr className="bg-dark" />
                  <h5>Help us to grow </h5>
                   <a href="https://www.buymeacoffee.com/tzimasvagg7" className="btn btn-primary w-50">Donate</a>
                  <hr className="bg-dark" />
                </div>
              </div>
            </div>
            <div className="col-md-12">
            <h3>Top realeases</h3>
              <SpotifyBanner />
              <hr className="bg-dark" />
            </div>

            <h3>Artworks Gallery</h3>
            <SecondaryCarousel />
          </div>
        </div>
        {/**reviews */}
        <hr className="bg-dark" />
        <div className="container materialcontainer shadow-lg  p-5 rounded-4">
          <div className="row">
            <hr className="bg-white"/>
            <Youtube/>
            <div className="jumbotron">
              <h1 className="display-1">Sponsored By Angels PR </h1>
              <hr className="bg-white"/>
            </div>
            <h2>ENG:</h2>
            <hr className="bg-white"/>

            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img className="card-img-top shadow-lg img-fluid w-100"
                     src={"https://heavy-local.com/assets/a1146581693_10.jpg"} alt="Disimulator"></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Gather Round Everyone, and Step Inside Pete Rafael’s “Elysian Citadel”(ENG VERSION)</h4>
                  <NavLink to="/article/Gather-Round-Everyone,-and-Step-Inside-Pete-Rafael’s-“Elysian-Citadel”"
                           className="btn btn-primary">Read More</NavLink>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img className="card-img-top shadow-lg img-fluid"
                     src={"https://heavy-local.com/assets/A Lil Louder EP3000.jpg"} alt="Disimulator"></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Aaron Kusterer’s “A Little Louder”: Where Guitar Magic Happens(ENG VERSION)</h4>
                  <NavLink to="/article/Aaron-Kusterer’s-“A-Little-Louder”:-Where-Guitar-Magic-Happens"
                           className="btn btn-primary">Read More</NavLink>
                </div>
              </div>
            </div>

            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img className="card-img-top shadow-lg img-fluid"
                     src={"https://heavy-local.com/assets/8f7067ea-e3cf-491b-b15e-c81460440c04.jpg"}
                     alt="Disimulator"></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Resilience in Sound: Dark Sky’s Latest Artistic Statement “Signs of the Time” Unveiled(ENG
                    VERSION)</h4>
                  <NavLink
                      to="/article/Resilience-in-Sound:-Dark-Sky’s-Latest-Artistic-Statement-“Signs-of-the-Time”-Unveiled"
                      className="btn btn-primary">Read More</NavLink>
                </div>
              </div>
            </div>


            <div className="col-md-6 p-3">
              <div className="card h-100 w-100">
                <img className="card-img-top shadow-lg img-fluid w-100"
                     src={"https://heavy-local.com/assets/COVER FINAL.jpg"} alt="Disimulator"></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Panic Chaos War - Medusa’s Wrath - Pavor Exilium Mors (album review - ENG VERSION)</h4>
                  <NavLink to="/article/Panic-Chaos--War---Medusa’s-Wrath---Pavor-Exilium-Mors-(album-review)"
                           className="btn btn-primary">Read More</NavLink>
                </div>
              </div>
            </div>


            <div className="col-md-6 p-3">
              <div className="card h-100 w-100">
                <img className="card-img-top shadow-lg img-fluid w-100"
                     src={"https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2Fimg_3_1716221383584.webp?alt=media&token=ee0160a5-01fc-4dac-86ab-f96e929a2de9"}
                     alt="Disimulator"></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Meden Agan - My name is Katherine(ENG VERSION)
                  </h4>
                  <NavLink to="/article/Meden-Agan"
                           className="btn btn-primary">Read More</NavLink>
                </div>
              </div>
            </div>
            <hr className="bg-white"/>

            <h2>GREEK:</h2>
            <hr className="bg-white"/>

            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img className="card-img-top shadow-lg img-fluid w-100"
                     src={"https://heavy-local.com/assets/COVER FINAL.jpg"} alt="Disimulator"></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Πανικός Χάος Πόλεμος - Medusa’s Wrath - Pavor Exilium Mors (album review - GREEK VERSION)</h4>
                  <NavLink to="/article/Πανικός-Χάος--Πόλεμος---Medusa’s-Wrath---Pavor-Exilium-Mors-(album-review)"
                           className="btn btn-primary">Read More</NavLink>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img className="card-img-top shadow-lg img-fluid w-100"
                     src={"https://firebasestorage.googleapis.com/v0/b/heavy-local-12bc4.appspot.com/o/images%2Fimg_3_1716221383584.webp?alt=media&token=ee0160a5-01fc-4dac-86ab-f96e929a2de9"}
                     alt="Disimulator"></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Meden Agan – My name is Katherine: Η ιστορία μιας αθώας ψυχής που κοίταξε στα μάτια τους δαίμονες
                    του παρελθόντος της(GREEK VERSION)</h4>
                  <NavLink
                      to="/article/Meden-Agan-–-My-name-is-Katherine -Η-ιστορία-μιας-αθώας-ψυχής-που-κοίταξε-στα-μάτια-τους-δαίμονες-του-παρελθόντος-της"
                      className="btn btn-primary">Read More</NavLink>
                </div>
              </div>
            </div>

            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img className="card-img-top shadow-lg img-fluid w-100"
                     src={"https://heavy-local.com/assets/a1146581693_10.jpg"} alt="Disimulator"></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Gather Round Everyone, and Step Inside Pete Rafael’s “Elysian Citadel”(GREEK VERSION)</h4>
                  <NavLink to="/article/Gather-Round-Everyone,-and-Step-Inside-Pete-Rafael’s-“Elysian-Citadel”-Greek"
                           className="btn btn-primary">Read More</NavLink>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img className="card-img-top shadow-lg img-fluid"
                     src={"https://heavy-local.com/assets/A Lil Louder EP3000.jpg"} alt="Disimulator"></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Aaron Kusterer’s “A Little Louder”: Where Guitar Magic Happens(GREEK VERSION)</h4>
                  <NavLink to="/article/Aaron-Kusterer’s-“A-Little-Louder”:-Where-Guitar-Magic-Happens-Greek"
                           className="btn btn-primary">Read More</NavLink>
                </div>
              </div>
            </div>

            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img className="card-img-top shadow-lg img-fluid"
                     src={"https://heavy-local.com/assets/8f7067ea-e3cf-491b-b15e-c81460440c04.jpg"}
                     alt="Disimulator"></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Resilience in Sound: Dark Sky’s Latest Artistic Statement “Signs of the Time” Unveiled(GREEK
                    VERSION)</h4>
                  <NavLink
                      to="/article/Resilience-in-Sound:-Dark-Sky’s-Latest-Artistic-Statement-“Signs-of-the-Time”-Unveiled(GREEK-VERSION)"
                      className="btn btn-primary">Read More</NavLink>
                </div>
              </div>
            </div>


            <div className="col-md-4 p-3">
              <div className="card h-100 w-100">
                <img className="card-img-top shadow-lg img-fluid"
                     src={"https://pulse-of-the-underground.com/assets/SOCIAL.jpg"}
                     alt="Disimulator"></img>
                <div className="card-body">
                  <h4 className="card-title">
                    Μια φουτουριστική άγρια γη - Project Renegade - Ultra Terra (album review)</h4>
                  <NavLink
                      to="https://pulse-of-the-underground.com/article/%CE%9C%CE%B9%CE%B1-%CF%86%CE%BF%CF%85%CF%84%CE%BF%CF%85%CF%81%CE%B9%CF%83%CF%84%CE%B9%CE%BA%CE%AE-%CE%AC%CE%B3%CF%81%CE%B9%CE%B1-%CE%B3%CE%B7---Project-Renegade---Ultra-Terra-(album-review)"
                      className="btn btn-primary">Read More</NavLink>
                </div>
              </div>
            </div>


            <hr className="bg-white"/>
            <div className="jumbotron">
              <h1 className="display-3">Pulse Of The Undeground:Web Radio <span><CasterFmPlayer/></span></h1>
            </div>
            <hr className="bg-white"/>
            <h3>Interviews:</h3>
            <div className="col-md-4">
              <div className="card h-100 w-100">
                <img className="card-img-top shadow-lg h-100" src={"https://pulse-of-the-underground.com/assets/Animamortua Band Photo.jpg"}
                     alt="Disimulator"></img>
                <div className="card-body">
                  <h4 className="card-title">
                  Animamortua:Interview</h4>
                  <a href="/article/Animamortua" className="btn btn-primary">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 w-100">
                <img className="card-img-top shadow-lg h-100" src={"https://pulse-of-the-underground.com/assets/hemplifier.jpg"}
                     alt="Disimulator"></img>
                <div className="card-body">
                  <h4 className="card-title">INTERVIEW: A Discussion with Hemplifier</h4>
                  <a href="/article/INTERVIEW:-A-Discussion-with-Hemplifier" className="btn btn-primary">Read More</a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 w-100">
                <img className="card-img-top shadow-lg h-100" src={"https://pulse-of-the-underground.com/assets/435569225_813204937499166_5120930457689830732_n.jpg"}
                     alt="Disimulator"></img>
                <div className="card-body">
                  <h4 className="card-title">Exclusive Interview with Lethargy UA: Harmonizing Resilience and Melodic Might</h4>
                  <a href="/article/Exclusive Interview with Lethargy UA: Harmonizing Resilience and Melodic Might" className="btn btn-primary">Read More</a>
                </div>
              </div>
            </div>

            <div className="col-md-12 p-3">
              <div className="card h-100 w-100">
                <img className="card-img-top shadow-lg h-100" src={"https://pulse-of-the-underground.com/assets/images.jpg"}
                     alt="Disimulator"></img>
                <div className="card-body">
                  <h4 className="card-title">INTERVIEW: Get to Know Thy Legion</h4>
                  <a href="/article/INTERVIEW -Get-to-Know-Thy-Legion" className="btn btn-primary">Read More</a>
                </div>
              </div>
            </div>


          </div>
          <h4> Reviews(ENG)</h4>
          <div className="row mt-4 text-center">
            <div className="col-md-4 mb-4">
              <div className="card h-100 w-100">
                <img className="card-img-top  h-100"
                     src={"https://pulse-of-the-underground.com/assets/Crest_of_Darkess.png"} alt="Dreariness"></img>
                <div className="card-body">
                  <h4 className="card-title">Crest of Darkness Unveils New Single “Call of the Moon” </h4>
                  <a href="/article/Crest-of-Darkness-Unveils-New-Single-“Call-of-the-Moon”" className="btn btn-primary">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 w-100">
                 <img className="card-img-top shadow-lg h-100" src={"https://pulse-of-the-underground.com/assets/Slicer_Stalking_the_Night.jpg"} alt="Zong"></img>
        <div className="card-body">
          <h4 className="card-title">Midnight Carnage: Examining Slicer’s Album “Stalking the Night” </h4>
          <a href="/article/Midnight-Carnage:-Examining-Slicer’s-Album-“Stalking-the-Night”-" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-4">
              <div className="card h-100 w-100">
                 <img className="card-img-top shadow-lg h-100" src={"https://pulse-of-the-underground.com/assets/Forever_Falling_Second_Album.png"} alt="Zong"></img>
        <div className="card-body">
          <h4 className="card-title">Doomed Reverie: Forever Falling’s Album “The Determinism of Essence in Matter” Spotlighted </h4>
          <a href="/article/Doomed-Reverie:-Forever-Falling’s-Album-“The-Determinism-of-Essence-in-Matter”-Spotlighted" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>


    <h4>Reviews (GR)</h4>
    <div className="col-md-4">
    <div className="card h-100 w-100 review-card">
        <img className="card-img-top shadow-lg h-100" src={"https://heavy-local.com/assets/korrection.webp"} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Παλαιάς κοπής ανταρσία - KorrectioN - Having Fun (single review + info)</h4>
          <a href="/article/korrection-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>

    <div className="col-md-4">
    <div className="card h-100 w-100 review-card">
        <img className="card-img-top shadow-lg h-100" src={'https://heavy-local.com/assets/Degenerate.jpg'} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Μια αμφίρροπη μάχη - Degenerate Mind - Nothing Left (single review)</h4>
          <a href="/article/degenerate-mind-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>



    <div className="col-md-4">
    <div className="card h-100 w-100 review-card">
        <img className="card-img-top shadow-lg  h-100" src={"https://heavy-local.com/assets/Herc.jpg"} alt="Disimulator"></img>
        <div className="card-body">
          <h4 className="card-title">Βουτιά στην περιπέτεια του Silmarillion- Herc - “Of Light and Darkness” (album review)</h4>
          <a href="/article/Silmarillion-archive" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>



    <h3 className="m-2 p-3">Into the Darkness: A Chronicle of Underground for the Masses </h3>
    <hr className="bg-white"></hr>
      <div className='col-md-6'>
<img src={"https://heavy-local.com/assets/Astronomica_response.jpg"} className="img-fluid"></img>
      </div>

      <div className='col-md-6'>
        <p className="lead">
        In the depths of Quantic Pub, on the 5th and 6th of April 2024, the inaugural edition of the festival dedicated to Black Metal unfolded its wings: “Underground for the Masses”. Over the course of two nights, thirteen diverse bands from across Europe and beyond took to the stage, bringing with them a spectrum of Black Metal styles, from Classic to Suicidal, Atmospheric to Melodic, and Black Death Metal, among others. The air was thick with anticipation as the clock struck 18:00, marking the commencement of an auditory journey into the abyss.
        </p>
        <a className="btn btn-danger" href="/article/Undeground-for-the-masses_archive">Read More</a>
      </div>
    <hr className="bg-white"/>
    <h3 className="m-2 p-3">Anormoi X EN STIGMA</h3>
    <hr className="bg-white"></hr>
      <div className='col-md-6'>
      <img src={"https://heavy-local.com/assets/ANORMOI01.jpg"} className="img-fluid" />
      </div>

      <div className='col-md-6'>
        <p className="lead">
        Γενικώς για τη συγκεκριμένη βραδιά ένα έχω να πω: ενώ πίστευα πως είχα προετοιμαστεί σχετικά καλά για το τι θα παιζόταν, και πάλι αιφνιδιάστηκα.

Τη συναυλία άνοιξαν οι En-Stigma, μία folk progressive metal μπάντα με έδρα τα Ιωάννινα, που μας εντυπωσίασαν με τα ηλεκτρικά μπουζούκια τους και τα φωνητικά της Αίγλης.        </p>
        <a className="btn btn-danger" href="/article/Anorimoi-response-archive">Read More</a>
      </div>

  </div>
</div>
      </header>
      <section className="live-chornicles">
        <div className="container">
          <h4>Live Chronicles by Daria (ENG)</h4>
          <div className="row text-center mt-4">
            <div className="col-md-6">
              <img src={"https://heavy-local.com/assets/chronicles/chronicle-02/yothiria-02.jpg"} className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h3>
                Chronicles of the Underworld Vol 2: Yoth Iria's Epic Odyssey at
                Psychosounds Festival
              </h3>
              <a
                href="/Chronicles_of_the_underworld_vol-2_archive"
                className="btn btn-primary"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>
      <hr className="bg-dark"></hr>
      <section className="MetalLegends">
        <div className="container-fluid">
          <div className="row mt-4 text-center">
            <div className="col-md-12 mt-4">
              <h3 className="display-3 mt-5 p-5 text-white">
                Σήμερα Στο Legends
              </h3>
              <p className="lead text-white">
              Γιώργος Κόλλιας - Από τα “αλώνια” της Κορινθίας στην κορυφή της Extreme Metal
                        </p>
              <p className="lead text-white">
              Σήμερα στο Legends θα γίνει μια ιδιαίτερη μνεία για έναν drummer, έναν Έλληνα drummer που έχει φτάσει να ανήκει στο πάνθεον της μέταλ και δη της death, τον Γιώργο Κόλλια! Παρόλο που πρόκειται για έναν βετεράνο καλλιτέχνη και λίαν καταξιωμένο, πασίγνωστο σε όλη την υφήλιο στους χώρους της Extreme Metal 
              </p>
              <a href="/legends-5-archive" className="btn btn-primary">
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;