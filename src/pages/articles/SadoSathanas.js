import React from "react";
import Navigation from "../../compoments/Navigation/Navigation";
import './articles.css'
import ScentOfThorns01 from './../../assets/Sado2.jpg';
import ScentOfThornsLogo from './../../assets/sado-sathanasLogo.jpg';
import sado from './../../assets/sado03.jpg';
import Contact from "../../compoments/ContactForm/contact";
import Donate from "../../compoments/donate/donate";
import ReadMore from "../../compoments/ReadMore/ReadMore";
import Footer from "../../compoments/footer/footer";
import PageWithComments from "../../compoments/Comments/comment";

const SadoStathanas = ()=>{
    return(
        <>
        <Navigation />
           <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-evenly">
                    <h3 className="display-4">Sado Sathanas: A Journey Through the Abyss of Black Metal
                    <hr className="bg-dark"></hr>
                    
                    <h4>Review</h4> <p className="lead">By Daria Aeonia</p>
                   </h3>
                </div>
                <hr className="bg-dark"></hr>
                <div className="col-md-6 credits-box">
                    <img src={ScentOfThornsLogo} className="img-fluid w-100 shadow-lg rounded-4"></img>
                    <p className="lead"> 
                    Line-up:
                         </p>
                         <p className="lead"> 
                         Martin "Lord Skull" Krell (vocals);
                         </p>
                         <p className="lead"> 
                         Giacomo "Omoziakk" Lehmann (vocals);
                         </p>
                         <p className="lead"> 
                         Stefan "Demonizer" Jähne (keyboards);
                         </p>
                         <p className="lead"> 
                         Martin Himstedt (guitars);
                         </p>
                         <p className="lead"> 
                         Sebastian "Lord Sador" Schröer (drums);
                         </p>
                         <p className="lead"> 
                         Ronny Schmidt (bass).
                         </p>



                         
                         <p className="lead-text-center"> find  Sado Sathans <a href="https://web.facebook.com/p/SADO-SATHANAS-100053281063983/?paipv=0&eav=AfblmTJunRqtImV4eTZjOUY7NnWW8CpEqmOrTV-7Pvhh2mWf_GNUG-4456euetqOfYo&_rdc=1&_rdr"><i className="bi bi-facebook"></i></a> </p>
                </div>
                <div className="col-md-6">
                    <p className="lead">
                    In the dimly lit corners of Germany’s underground music scene, amidst the swirling mist of darkness and esotericism, Sado Sathanas emerges as a titan of black metal, wielding their releases like blasphemous anthems echoing through the void.
                    </p>
                  <p className="text-center"> <img src={ScentOfThorns01} className=" img-fluid W-100 m-2 shadow-lg rounded-4"></img></p> 
                    <p className="lead">
                    While guitarists Martin K. and Martin H. serve as the primary architects of Sado Sathanas' sonic landscape, the band's collaborative spirit shines through, with each member contributing to the infernal tapestry with their creative essence. In their sanctuary, there is no leader.
“There is no leader. We have Krell and Martin, the two main composers, then there is me, who came up with some ideas, and then there is Giacomo who did his own interpretation of the vocals. Of course this causes chaos and sometimes some serious discussions, but that’s the way it is. And we record step by step, beginning with the drums and finishing with the vocals. And the final fight starts with the mix”, revealed Sado Sathanas in an interview for the blog Black Metal Spirit.
                    </p>
                    <hr className="bg-dark" />
                    <p className="lead">
                    Sado Sathanas – The Past and the Present
                    </p>
                    <hr className="bg-dark" />
                    <img src={sado} className="img-fluid w-100 shadow-lg rounded-4"></img>

                    <p className="lead">
                    Sado Sathanas started its journey with the split called “Diabolische Inquisition” and continued with the demos “Vernichtungsschlag!” and “Bellum Omnia versus Omnes - Reich Anti I.N.R.I.”. In 2010 they released their first album entitled “Opus Diaboli”. 
In the shadowy realm of black metal, where darkness reigns supreme and the air is thick with the scent of brimstone, Sado Sathanas’ debut album, “Opus Diaboli” stands as a testament to the band’s mastery of the infernal arts. Intimidatingly satanic, the album is a successful one. Yet beneath its sinister veneer lies a tapestry of emotional depth and melodic intricacy that defies conventional expectations. From the haunting melodies of acoustic guitars to the thunderous roar of blast beats, “Opus Diaboli” weaves a spellbinding tale of darkness and redemption, drawing listeners into its nocturnal embrace with each hypnotic riff and infernal chant. 
As the time unfurled its dark wings, Sado Sathanas found themselves evolving, shedding the constraints of dogma in order to embrace a broader spectrum of influences. Yet, the essence remains there, locked, untouched. Their roots are still in the 1990s, but nowadays they are much more into exploring other sounds and styles. Thus, the band offers, through the album called “Nomos Hamartia”, the experience of listening to a classic black metal album, while integrating the mysterious and atmospheric keyboards. 
Even with a dedicated keyboardist such as Stefan J., Sado Sathanas diverges from the exaggerated orchestrations and intricate keyboard arrangements found in other bands. The keyboards provide a subdued accompaniment to the sinister and malevolent black metal atmosphere.
In their latest album, lyrically, Sado Sathanas offers poignant reflections on morbidity and occult themes, delivered with a poetic flair. 
                    </p>
                    <ReadMore />

                    <PageWithComments />

                </div>
            </div>
           </div>

        </>
    )
}
export default SadoStathanas;