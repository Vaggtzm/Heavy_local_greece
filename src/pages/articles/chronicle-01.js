import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import ReadMore from "../../components/ReadMore/ReadMore";
import PageWithComments from "../../components/Comments/comment";

const chronicle01 = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row  text-center">
                    <div className="col-md-12">
                        <h3>
                            Chronicles of the Underworld Vol 1: Infernal Storm's Eerie Enchantment at Psychosounds
                            Festival 2023
                        </h3>
                        <p className="lead"> By Daria aeonia </p>
                        <hr className="bg-dark"></hr>

                    </div>
                    <div className="col-md-6 main">

                        <p className="lead m-1 p-1">
                            The evening of 22.09.2023 was one full of emotions and uniqueness due to Infernal Storm’s
                            performance, a band hailing from Greece that plays an old -school form of Hellenic Black
                            Metal. Known for their atmospheric and symphonic elements blended with traditional black
                            metal aesthetics, the enthusiastic band members graced the stage at Quantic Pub during the
                            Psychosounds Festival 2023.
                        </p>
                        <h4>
                            “.:INFERNAL STORM OVER ROMANIA:.
                        </h4>
                        <p className="lead">
                            We’re off to Romania for Psychosound's Fest!
                            Tomorrow in Bucharest at Quantic Club.
                            Infernal Storm on stage 20:50.
                            Join us”, announced the band on its personal Facebook page, as soon as they received
                            official confirmation.
                        </p>
                        <p className="lead">
                            With fervor and passion, Infernal Storm captivated the audience, weaving a tapestry of
                            darkness and intensity that enveloped the venue in an aura of otherworldly allure. As their
                            haunting melodies intertwined with the thunderous rhythms, Infernal Storm transported the
                            listeners to realms shrouded in mystery and occultism, leaving an indelible mark on the
                            hearts and minds of all who bore witness to their mesmerizing performance.
                            The old adage “less is more” finds a profound resonance with the performance of the band.
                            With a repertoire well-crafted, Infernal Storm offered a concise yet potent glimpse into
                            their sonic world, inviting the listeners to savor a fragment of greatness.
                        </p>
                        <p className="lead">
                            The vocal delivery that primarily consists of high-pitched black metal screams, perfectly
                            complemented the melodic riffs that echoed in Quantic. Drawing heavily from the 90s era, the
                            music exuded a raw and nostalgic aura.
                            The usage of guitar solos and leads added a melodic flair to the show while the faster
                            sections featured tremolo picking and blast beats infused the music with an intense and raw
                            energy. Throughout the spectacle, a dynamic range of tempos kept the listeners engaged, with
                            occasional growls adding further texture to the sonic landscape.
                            And the audience replied with the same kind of energy, creating a magical moment that will
                            be remembered for so long.
                        </p>
                        <p className="lead">
                            Amazing, boys! You will remember for the rest of your life!”, exclaimed a fan, during the
                            show. Such sentiments encapsulated the profound impact of the performance, evoking emotions
                            that transcended the ephemeral confines of the event.
                            In response to the resounding cheers and unwavering support from fans at Psychosounds Fest
                            2023, the band emerged with gratitude and determination.
                            “.:UNDER THE DARK SUN:.
                            Romania!
                            We want to thank you very much for your Huge support!
                            It was the band's strongest live performance.
                            Thank you all guys from Psychosounds Fest 2023
                            Now it's time to work on the new album. We will be back in concert's with the release of our
                            new album in 2024!
                            Until then...
                            Embrace The Storm!”, wrote Infernal Storm after the show.
                            Infernal Storm's style of black metal pays homage to the 90s era while incorporating old
                            school atmospheric and symphonic elements, resulting in a sound uniquely their own. Their
                            production is dark and raw, enhancing the overall atmosphere of occultism and darkness that
                            permeates the lyrics. Infernal Storm has serious plans to release an album and then perform
                            again in Europe.

                        </p>
                        <PageWithComments/>


                    </div>
                    <div className="col-md-6 border-right-1">
                        <img alt={"Psychosounds Festival 2023"} src={"/assets/chronicles/chronicle-01/01.jpg"} className="img-fluid w-75 h-25 m-4"/>
                        <hr className="bg-dark"></hr>
                        <img alt={"Psychosounds Festival 2023"} src={"/assets/chronicles/chronicle-01/02.JPEG"} className="img-fluid w-75 h-25 m-4"/>
                        <hr className="bg-dark"></hr>
                        <img alt={"Psychosounds Festival 2023"} src={"/assets/chronicles/chronicle-01/03.JPEG"} className="img-fluid w-75 h-25 m-4"/>

                    </div>

                </div>
                <ReadMore/>
            </div>
        </>
    )
}

export default chronicle01;