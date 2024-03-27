import React from "react";
import Navigation from "../../compoments/Navigation/Navigation";
import './articles.css'
import ReadMore from "../../compoments/ReadMore/ReadMore";
import AutumnMachineryImg from './../../assets/Primordial.webp'
import PageWithComments from "../../compoments/Comments/comment";

const Primordial = ()=>{
    return(
        <>
        <Navigation />
           <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-evenly">
                    <h3 className="display-4">Interview: Primordial Black 
                    <p className="lead">By Rawya</p>

                </h3>
                </div>
                <hr className="bg-dark"></hr>
                <div className="col-md-6 credits-box">
                    <img src={AutumnMachineryImg} className="img-fluid w-100 ScentAlbumCover shadow-lg rounded-4"></img>
                 <p> <a href="https://open.spotify.com/album/29KcWYOHirrxy6ppb3ivRL?referral=labelaffiliate&utm_source=1101lyjANX6D&utm_medium=Indie_Believe&utm_campaign=labelaffiliate"><i className="bi bi-spotify"></i></a> <a href="https://music.youtube.com/playlist?list=OLAK5uy_m5sUODrKQ-Xv69PUQuAsoAqy1CuP3I18I "><i className="bi bi-youtube"></i></a></p>  
                </div>

                <div className="col-md-6">
                    <p className="lead">
                    From the shadows of Carthage, Tunisia emerges Primordial Black, a band that defies convention and embraces the depths of darkness within their music. Since their inception in 2022, this enigmatic ensemble has carved a path through the metal landscape, melding Black, Heavy, and Groove Metal into a haunting symphony that resonates with themes of death, history, literature, and eldritch horrors. As they continue to captivate audiences with their ominous melodies and profound lyricism, we delve into the abyss with Primordial Black to uncover the essence of their sound and the infernal forces that drive them forward.
                    </p>
                    <p className="lead fw-bold">
                    How did the band members first come together, and what inspired you to start a
                    Metal band?
                    </p>
                    <p className="lead">
                    I created the band in 2022, with a primary concept in mind: I aimed to blend elements of HP Lovecraft, Celtic Frost, and John Dee's philosophy. I wanted to create and compose music that challenges and questions certain fundamentals. At times, Extreme Metal tackles weighty subjects in a manner that can seem almost exaggerated or caricatured. I aimed to separate Primordial Black from this approach.
                    </p>
                    <p className="lead fw-bold">
                    Can you describe the musical style and themes that your band explores in your
songs?
                    </p>
                    <p className="lead">
                    As mentioned earlier, Metal frequently delves into profound subjects such as death with a tendency towards exaggeration, sometimes bordering on the cartoonish. With Primordial Black, we sought to establish a departure from this trend. 
Our approach involved addressing weighty themes with a nuanced aesthetic—sometimes delicate and intimate. 
We purposefully avoided the clichés often embraced by many Metal bands, steering clear of overly theatrical presentations and instead opting for subtlety and implication.
Extreme Metal, inherently, embodies a feeling, an abyss, or a void nestled within the soul. This genre serves as a poignant reminder of the tumultuous moments, forever burning, in our existence, and fundamentally, that's why we gravitate towards it—to recollect painful experiences.                    </p>

                    <p className="lead fw-bold">
                    Who are your biggest musical influences, both within the Metal genre and outside
of it?
                    </p>
                    <p className="lead">
                    Describing what comes instinctively to us is challenging. Our music encompasses a myriad of sensitivities. In addition to Death and Black influences, we fuse together elements that can evoke intense emotions.
There's a common inclination to link music and art, in general, to deliberate, meaningful concepts. Yet, sometimes, creation occurs spontaneously. Ideas emerge unexpectedly.
Consider David Lynch as an example; his works often provoke extensive analysis, yet perhaps he simply enjoyed crafting things in his own unique manner.

                    </p>
                    <p className="lead fw-bold">
                    What themes or messages do you aim to convey through your music and lyrics?
                    </p>
                    <p className="lead">
                    I perceive our music as the testament of a person awakening to the unavoidable nature of life's challenges. 
For instance, we all undergo the process of growing up, aging, and eventually facing the passing of our parents. While losing one's parents is an ordeal nobody wishes for, it stands as one of the most difficult experiences we encounter, yet an inevitable one.
A typical existence, characterized by daily routines, inevitably leads us toward tragic events that lie ahead. We will inevitably confront illness, the departure of family members or close companions. These realities are far from pleasant, yet they are unavoidable.
It is precisely these realities that we aim to capture and convey through our music.
                    </p>
                    <p className="lead fw-bold">
                    How do you see the Metal music scene evolving, and where do you think your
band fits into that evolution?
                    </p>
                    <p className="lead">
                    I don't know if I have the necessary authority to say what I'm about to say: Metal music emerged as a means to challenge societal cultural norms, providing an outlet for individuals who felt they didn't fit in elsewhere. It wasn't created with the intention of gaining popularity but rather to resonate with open-minded, accepting individuals who felt marginalized. 
But I sincerely believe that the surge of "sub-genres" has transformed a once cohesive and robust scene into one that is highly fragmented and divisive. 
The Metal community, which was once united, has now splintered into numerous small factions.
From a musical standpoint, I believe we don't neatly fit into any particular trend. We possess an Old School sound infused with an urban and icy sensibility. The amalgamation of our influences renders us somewhat unique, and most notably, impossible to categorize within a specific genre.
                    </p>
                    <p className="lead fw-bold">
                    Can you share any insights into your upcoming projects or future plans for the
band?
                    </p>
                    <p className="lead">
                    At present, we are fully immersed in the creation of our debut album, which commands our utmost focus. I've already introduced four demos, and the band has made remarkable progress with them. We aim to develop a few more before commencing recording sessions in the studio.

                    </p>
                    <p className="lead fw-bold">
                    How do you prepare for live performances, and what do you hope your audience
takes away from your shows?
                    </p>
                    <p className="lead">
                    Up to this point, we haven't had the chance to perform our songs live. That was our initial objective – to release an EP, present it on stage, and then proceed with creating our debut album. Regrettably, circumstances beyond our control prevented this from happening. However, we remain hopeful and eager to step onto the stage in the near future.
                    </p>
                    <p className="lead fw-bold">
                    What are your thoughts on the current state of the Metal music scene, and where
do you see it heading in the future?
                    </p>
                    <p className="lead">
                    Let’s say that Metal has transitioned into more of a niche or subgenre.
Metal has always held a special allure for individuals often referred to as outcasts or those who felt they didn't quite fit in.
One prevalent misconception about Metal is that its absence from radio airplay or chart visibility implies it lacks popularity. Quite the contrary, it thrives as a subculture, flourishing away from the mainstream spotlight. Despite being outside the public eye, Metal has not only survived but also outlasted many other mainstream music styles.
I'm not too worried about the future; this genre will endure long after we're gone.
I would like to refer you to a book titled "Metal Rules the Globe: Heavy Metal Music around the World" by Jeremy Wallach, Harris M. Berger, and Paul D. Greene.
                    </p>
                    <p className="lead fw-bold">
                    Finally, what advice would you give to aspiring musicians looking to pursue a
career in Metal music or artistic projects in general ?
                    </p>
                    <p className="lead">
                    I'll be straightforward: Make writing a DAILY HABIT. There's no need to play clever on social media and create a persona; people want music they can later associate with imagery. No one wants to know about your project if there isn't a musical component to accompany it. Don't focus on creating exceptional songs right away; simply write for the sake of writing. It doesn't have to be perfect. The more you write, even if it's not great, the more you'll improve.
                    </p>

                    <PageWithComments />

                </div>
            </div>
           </div>
        </>
    )
}
export default Primordial;