import React from "react";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const ReadMore = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="container">
                <h4>Pulse Of The Undeground</h4>
                <div className="row mt-4 text-center">
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 w-100">
                            <img className="card-img-top shadow-lg img-fluid" src={"/assets/SleepDealer.webp"}
                                 alt="Dreariness"></img>
                            <div className="card-body">
                                <h4 className="card-title">Band Review: Sleep Dealer </h4>
                                <p className="card-text lead">
                                    If I were asked about the best album or song that Sleep Dealer has produced, I
                                    definitely couldn’t provide an exact or proper answer that would suit the
                                    question.You can also choose your best song or best album, but I would certainly opt
                                    for the complete discography without skipping any albums. Eventually, you wouldn’t
                                    want to skip any songs from each album either.Every single note in each song has its
                                    own charming vibration. Sleep Dealer’s music speaks volumes, resonating deeply and
                                    offering solace during dark times.How is it possible for someone to fluently
                                    communicate in complex languages like JavaScript while simultaneously nurturing our
                                    immune system with assurance and self-love? </p>
                                <a href="/article/Sleep-Dealer-review" className="btn btn-primary">{t('readMore')}</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 w-100">
                            <img className="card-img-top shadow-lg img-fluid" src={"/assets/Holler_Members.jpg"}
                                 alt="Zong"></img>
                            <div className="card-body">
                                <h4 className="card-title">Bright Rejuvenation: Terence Holler’s “Reborn” Soars into the
                                    Rock Stratosphere</h4>
                                <p className="card-text lead">
                                    Bright Rejuvenation: Terence Holler’s “Reborn” Soars into the Rock Stratosphere

                                    Terence Holler’s “Reborn” pulsates with an electrifying energy, a testament to his
                                    unyielding spirit and artistic resurgence. Under the esteemed banner of Scarlet
                                    Records, Holler’s journey through the realms of rock is accompanied by a vibrant
                                    visual narrative. The album cover, adorned with radiant hues and a cyberpunk allure,
                                    serves as a prelude to the sonic odyssey awaiting listeners.
                                    Unveiling a New Era

                                    Terence Holler, the enigmatic Brooklyn-born rock luminary, strides boldly into the
                                    limelight with his inaugural solo endeavor, “Reborn”. Departing from the
                                    labyrinthine soundscape of Eldritch, Holler charts a new course, drawing inspiration
                                    from the timeless allure of classic rock. This album marks not only a musical
                                    evolution but a deeply personal journey for Holler, whose raw emotion and unabashed
                                    influences are palpable throughout. </p>
                                <NavLink to="/article/Holler-archive" className="btn btn-primary">{t('readMore')}</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 w-100">
                            <img className="card-img-top shadow-lg img-fluid" src={"/assets/ECR_LIMF_album.jpg"}
                                 alt="Disimulator"></img>
                            <div className="card-body">
                                <h4 className="card-title">Philosophical Reverberations: ECR.LINF’s “Belluaires”
                                    Reviewed</h4>
                                <p className="card-text lead">
                                    Chaos and Melancholy Intertwined

                                    From the tumultuous depths of “Le Désespoir du Prophète” to the haunting corridors
                                    of “Tribunal de l’Âme”, ECR.LINF navigates a labyrinth of emotions with prowess. The
                                    French vocals, intense and vindictive, have an immense power of guiding the
                                    listeners through a journey that oscillates between chaos and melancholy, echoing
                                    the existential ponderings of philosophers past..
                                </p>
                                <NavLink to="/article/ECR-archive" className="btn btn-primary">{t('readMore')}</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ReadMore;