import React from "react";
import Navigation from "./../../../compoments/Navigation/Navigation";
import './../articles.css'
import PageWithComments from "./../../../compoments/Comments/comment";

const KhavarInterview = ()=>{
    return(
        <>
        <Navigation />
           <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-evenly">
                    <h3 className="display-4"> Interview: Khavar
                    <p className="lead">By Rawya</p>

                </h3>
                </div>
                <hr className="bg-dark"></hr>
                <div className="col-md-6 credits-box">
                    <img src={"/assets/review_picture.webp"} className="img-fluid w-100 ScentAlbumCover shadow-lg rounded-4"></img>
                 <p> <a href="https://web.facebook.com/Khavarband/?show_switched_toast=0&show_invite_to_follow=0&show_switched_tooltip=0&show_podcast_settings=0&show_community_review_changes=0&show_community_rollback=0&show_follower_visibility_disclosure=0"><i className="bi bi-facebook"></i></a> <a href="https://www.instagram.com/khavarband"><i className="bi bi-instagram"></i></a>  <a href="https://open.spotify.com/artist/76MFD0uvmSIc6I4U2F9uG5?si=RFSivU_YQ7S7Dt1Om8Wc_g&nd=1&dlsi=8b6898faa227400c"><i className="bi bi-spotify"></i></a></p>  
                </div>

                <div className="col-md-6">
                    <p className="lead">
                    Welcome to our web magazine!  Today we have the pleasure of speaking with Khavar, a prominent figure in the world of death metal in Lebanon!  Thank you for joining us!
                    <br></br>
                    1. How did the band come together, and what inspired you to create Death metal music?
Hello, my name is Garo Gdanian, guitarist and founder of Khavar. Alongside my brothers, we were previously known as The Weeping Willow, the first Death Metal band in the Middle East with more than 40 songs and 5 albums climbing to the 6th in a few months.                  <br></br>
<br></br>
<br></br>
Can you describe the musical style and themes that your band explores in your songs?
It was in 2017 when I met our brother Derek Roddy, previous bands he contributed in such as Nile, Hate Eternal, and more. He came to Beirut for a drum clinic, and we automatically clicked as friends and death metal music lovers. We decided to form a band and have some fun, which turned out to be something unique and heavy
<br></br>
<br></br>
What drew you to death metal specifically, and how would you describe its appeal to those unfamiliar with the genre?
Death metal music is an extreme form of music with complexity of chords, riffs, and solos. As music lovers, we always loved the extra mile of heaviness and unpopularity of it. It’s like jazz chords for radio music lovers; this is how we put it for non-death metal listeners.
<br></br>
<br></br>
 Who are your biggest musical influences, both within the death metal genre and outside of it?
Biggest influences are everywhere and everything could be a musical form of a band or angry nature, multiple genres of music and even sometimes not listening to any music where the melodies come from.

<br></br>
<br></br>
 How do you think death metal has evolved over the years, and what trends do you see shaping its future?
It did evolve with sound layering and experimentation, definitely better quality but some bands need real drummers and not just written sampled sounds. The future is more computerized music and no human involvement more like USB metal bands.

<br></br>
<br></br>
How do you navigate the balance between staying true to the core of death metal while also innovating and incorporating new elements into your music?
There’s nothing called staying true; you cannot keep doing '90s stuff over and over. You need to put that taste and not be afraid with new approach in the same time keeping it dark and heavy.
<br></br>
<br></br>
 Can you share any insights into your upcoming projects or future plans for the band?
Our new album is almost done writing; 6 of them done, 1 or 2 more and we will be ready to mix and master. Meanwhile, our artwork is being prepared by Marco, our bassist, and definitely future live shows when the time is right.

<br></br>
<br></br>
Could you tell us about your creative process when writing death metal music? How do you come up with lyrics, riffs, and overall compositions that capture the essence of the genre?
It’s a long process; first of all, we have to be in that certain mood. It could be simply a rainy day or late at night. It’s you and your guitar making that noise that you want to share, and definitely the lyrics come from the heart of Kamal, our vocalist, imagining the story behind those notes and melodies, and the rest just flows.

<br></br>
<br></br>
How do you feel about the current state of the Death Metal scene, and what do you think sets your band apart?
Nowadays, there’s different kinds of death metal; we have the American, European, melodic, extreme, etc. The difference in Khavar is that we don’t follow any rules or anything. We never know where the song starts or ends if it’s clean vocal parts or growling, and it works perfectly for us.

<br></br>
<br></br>
Lastly, what message or impact do you hope your music leaves on listeners, especially those who may be new to death metal?
We would love to leave a mark on every listener since we put lots of effort into what we do, but still, music is a choice either it speaks to you or it doesn’t.

                    </p>

                    <PageWithComments />

                </div>
            </div>
           </div>
        </>
    )
}
export default KhavarInterview;