import React, {useState, useEffect} from "react";
import axios from "axios";


const Facebook = () => {
    const [events, setEvents] = useState([]);


    useEffect(() => {
        const FetchEvents = async () => {
            try {
                const response = await axios.get(`https://graph.facebook.com/v12.0/bulletproductionsgr/events?access_token=EAAZCugl7ZAXegBOZCjAXzT4JLv09FsWNMLWEIUwgXXTvc0ZBGSEK8yLs2AoTx2oJ81K2C6KDPKUdZBgwrAtZB0zlcCh6nvOTMsKUGSrh17Is3XrjrZCA1oQabHPZCGFkgQsymRh10X2jiGAIqm1qRMF9AJVz98MbC9xYSgATPsp5nSTpUj6spOuQZBRXdBKMjjZCGZAk4UpilZAkNRyHIOA5vdXAQvYPhgFicD8qYJuZCWkIdbNyXy13uuVlqBbWAVcZBDygZDZD`);
                setEvents(response.data.data);
            } catch (error) {
                console.error('Error fetching events', error)
            }
        };
        FetchEvents();
    }, []); // Empty dependency array to run the effect only once
    return (
        <div>
            <h1>Facebook Events</h1>
            <div>
                {events.map(event => (
                    <div key={event.id}>
                        <h2>{event.name}</h2>
                        <p>{event.description}</p>
                        {/* Προσθέστε άλλες πληροφορίες του event που επιθυμείτε να εμφανίσετε */}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Facebook