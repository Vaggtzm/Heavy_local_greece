import React, { useState, useEffect } from "react";
import axios from "axios";

const Concerts = () => {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    const fetchMetalConcerts = async () => {
      try {
        const response = await axios.get(
          'https://www.eventbriteapi.com/v3/events/search',
          {
            params: {
                token:  'KLBSMZY5NKNWZWINBV' ,
                q: 'metal' ,
                categories: '103' , 
                location: 'Greece' ,
                sort_by: "date" ,
                price: "free , paid" ,
                expand: 'venue'
            }
          }
        );
        setConcerts(response.data._embedded.events);
      } catch (error) {
        console.error('Error Fetching metal concerts', error);
      }
    };
    fetchMetalConcerts();
  }, []);

  return (
    <div>
      <h2>Metal Concerts</h2>
      <ul>
        {concerts.map((concert) => (
          <li key={concert.id}>
            <h3>{concert.name.text}</h3>
            <p>Date: {concert.start.local}</p>
            <p>Location: {concert.venue.address.address_1} , {concert.venue.address.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Concerts;
