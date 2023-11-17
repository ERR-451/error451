import React, { useState, useEffect } from "react";
import Amenities from "./Amenities";
import StarRating from "./StarRating";
import BathroomTitle from "./BathroomTitle";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function BathroomBox(props) {
  const { bathroom_id } = props; // Get the bathroom_id

  const [bathroomData, setBathroomData] = useState(null);

  // Fetch bathroom data from Firebase Firestore
  useEffect(() => {
    const firestore = firebase.firestore();
    const bathroomsRef = firestore.collection('bathrooms');

    // Query the bathroom with the given bathroom_id
    const query = bathroomsRef.where('Room Number', '==', bathroom_id);

    query.get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setBathroomData(doc.data());
        });
      } else {
        console.log("No matching documents for bathroom ID: ", bathroom_id);
      }
    }).catch((error) => {
      console.error("Error getting documents:", error);
    });
  }, [bathroom_id]);

  if (!bathroomData) {
    // Data is still loading, you can display a loading message or spinner here
    return <div>Loading...</div>;
  }

  const {
    "Baby Changing Stations": babyChanging,
    "Feminine Products Dispenser": feminineProducts,
    "Floor Number": floorNumber,
    Gender: gender,
    Latitude: latitude,
    Longitude: longitude,
    "Number of Sinks": sinks,
    "Number of Stalls": stalls,
    "Number of Urinals": urinals,
    "Paper or Air Drying": drying,
    "Room Number": roomNumber,
  } = bathroomData;

  return (
    <div className="bathroom-box">
      <BathroomTitle bathroom_id={roomNumber} />
      <StarRating rating={5} /> {/* Set the rating accordingly */}
      <Amenities
        babyChanging={babyChanging}
        feminineProducts={feminineProducts}
        floorNumber={floorNumber}
        gender={gender}
        latitude={latitude}
        longitude={longitude}
        sinks={sinks}
        stalls={stalls}
        urinals={urinals}
        drying={drying}
      />
    </div>
  );
}

export default BathroomBox;