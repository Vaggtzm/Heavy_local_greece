import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import ReadMore from "../../components/ReadMore/ReadMore";
import PageWithComments from "../../components/Comments/comment";

const chronicle02 = () => {
    return (
        <>
            <Navigation/>
            <div className="container-fluid">
                <div className="row  text-center">
                    <div className="col-md-12">
                        <h3>
                            Chronicles of the Underworld Vol 2: Yoth Iria's Epic Odyssey at Psychosounds Festival </h3>
                        <p className="lead"> By Daria aeonian </p>
                        <hr className="bg-dark"></hr>

                    </div>
                    <div className="col-md-6 main">

                        <p className="lead m-1 p-1">
                            Yoth Iria ignited the flames they once kindled in the Greek underground as they emerged
                            triumphantly onto the stage of the Psychosounds Festival, held in Quantic Pub, Bucharest,
                            Romania. </p>
                        <p className="lead">
                            As a headliner, Yoth Iria, had the mission to provide an unique and magical show, one that
                            they had prepared meticulously.
                            “We are coming for first time in Romania for a special headline show at Psychosounds Fest
                            2023 and only a few days remaining. So our brothers and sisters, be ready!
                            Metal. Magic. Freedom”, the band announced on its official Facebook page.
                            Punctual and with an overflowing enthusiasm, the band brought to the stage a magical
                            atmosphere. The chosen repertoire, fluid and well-shaped, easily separated them from the
                            other acts of the evening. </p>
                        <p className="lead">
                        </p>
                        <p className="lead">
                            The songs “Unborn. Undead, Eternal” and “Morning of the One Thousand Golds” reverberated
                            through the event, eliciting an ecstatic response from the enraptured audience. With each
                            thunderous riff and haunting melody, Yoth Iria captivated listeners, immersing them in a
                            sonic tapestry woven with raw emotion and dark allure. The attendees, swept up in the
                            intensity of the performance, found themselves transported to realms where every note
                            carries the weight of ancient legends and untold mysteries. It was a moment of pure musical
                            transcendence, a testament to the enduring power of Yoth Iria's craft to captivate and
                            enthrall. </p>
                        <p className="lead">
                            The band’s performance was nothing short of a revelation, with unexpected passages bursting
                            forth, imbued with a vitality and momentum that electrified the evening. The chosen
                            repertoire navigated a delicate balance between harsh aggression and introspective
                            tranquility, weaving together elements of melody, occultism, and ritualistic ambiance. Yet,
                            while the band explored a range of dynamics, they never stray into truly extreme territory,
                            opting instead for a more accessible approach that aims to captivate rather than overwhelm.
                        </p>
                        <p className="lead">
                            The band's flawless performance acted as a potent elixir, revitalizing the weary audience
                            after a night of indulgence and revelry. With every note and beat executed to perfection,
                            they commanded the attention of all, their magnetic stage presence and unwavering skill
                            keeping the crowd alert and engaged despite the lateness of the hour.
                            Yoth Iria performed for the first time in Romania. The next concert will be in Poland, where
                            the band will perform alongside Shining and Samael, according to the Yoth’s Iria Instagram
                            Page. </p>

                        <PageWithComments/>

                    </div>
                    <div className="col-md-6 border-right-1">
                        <img src={"/assets/chronicles/chronicle-02/Yothiria01.jpg"}
                             className="img-fluid w-75 h-25 m-4"/>
                        <hr className="bg-dark"></hr>
                        <img src={"/assets/chronicles/chronicle-02/yothiria-02.jpg"}
                             className="img-fluid w-75 h-25 m-4"/>
                        <hr className="bg-dark"></hr>

                    </div>
                    <ReadMore/>

                </div>
            </div>
        </>
    )
}

export default chronicle02;