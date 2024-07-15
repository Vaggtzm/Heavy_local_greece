/*
 * Copyright (c) 2024. MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
// PartyAnnouncement.js
import React from 'react';
import './PartyAnnouncement.css';
import AthensImage from './assets/athens.jpg';
import IoanninaImage from './assets/ioannina.jpg';
import LocationMap from "../../components/party/LocationMap";

const PartyAnnouncement = () => {
    return (
        <div className="party-announcement bg-dark text-white">
            <h1>Πάρτι Επέτειος - Anniversary Party!</h1>
            <p>
                Ένα πάρτι επέτειος των πρώτων μηνών λειτουργίας μας! Ένα πάρτι που θα γίνει σε δύο ταυτόχρονα μέρη
                (Αθήνα και Γιάννενα στο Θυμωμένο Πορτραίτο). Γενικότερα είναι ένα πάρτι ευγνωμοσύνης προς όλα τα άτομα
                και τους καλλιτέχνες που βρήκαμε αλλά και μας βρήκαν από μόνοι τους και είχαμε και έχουμε μια αγαστή
                συνεργασία η οποία μας βοήθησε σε ένα τόσο σύντομο χρονικό διάστημα να βρεθούμε εδώ που είμαστε σήμερα!
                Σας περιμένουμε λοιπόν, καλλιτέχνες, μπάντες, συνεργάτες και αναγνώστες στο Θυμωμένο Πορτραίτο στα
                Γιάννενα και στο Θρυλικό Rock Dragon στην Αθήνα σε 13 μέρες για να γιορτάσουμε όλοι μαζί αυτή την
                επιτυχία που χωρίς όλους εσάς δεν θα υπήρχε σήμερα!
            </p>
            <p>
                An anniversary party of our first months of operation! A party that will take place in two places at
                the same time (Athens and Ioannina in the Angry Portrait). In general, it is a party of gratitude to
                all the people and artists that we found but also found us on their own and we had and have a lovely
                collaboration that helped us in such a short time to be where we are today! So we are waiting for you,
                artists, bands, collaborators and readers at the Angry Portrait in Ioannina and at the Legendary Rock
                Dragon in Athens in 13 days to celebrate this success together that without all of you would not exist
                today!
            </p>
            <div className="row d-flex justify-content-evenly">
                <div className="col-12 col-md-6 m-2">
                    <h2 className={"text-center"}>Ioannina</h2>
                    <img className={"img-fluid"} src={IoanninaImage} alt="Ioannina Venue" />
                </div>
                <div className="col-12 col-md-5 m-2">
                    <h2 className={"text-center"}>Athens</h2>
                    <img className={"img-fluid"} src={AthensImage} alt="Athens Venue" />
                </div>
            </div>
            <LocationMap style={{width:"80%", height:"300px"}} className={"m-5"}/>
        </div>
    );
};

export default PartyAnnouncement;

