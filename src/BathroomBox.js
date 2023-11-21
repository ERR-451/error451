import React, { useState, useEffect } from "react";
import BathroomTitle from "./BathroomTitle";
import StarRating from "./StarRating";
import Amenities from "./Amenities";
import ReviewPopup from "./ReviewPopup"; // Import the new ReviewPopup component
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function BathroomBox(props) {
  const { bathroom_id } = props;
  const [bathroomData, setBathroomData] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  useEffect(() => {
    const firestore = firebase.firestore();
    const bathroomsRef = firestore.collection('bathrooms');

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
    return <div>Loading...</div>;
  }

  const openReviewPopup = () => {
    setShowReviewPopup(true);
  };

  const closeReviewPopup = () => {
    setShowReviewPopup(false);
  };

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
      <StarRating rating={5} />
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
      <div className="review-buttons">
        <button onClick={() => setShowReviews(true)}>See Reviews</button>
        <button onClick={openReviewPopup}>Create Review</button>
      </div>
      {showReviews && (
        // Display reviews (you can create a separate Reviews component)
        <div className="reviews-section">
          {/* Render reviews here */}
        </div>
      )}
      {showReviewPopup && (
        // Display the ReviewPopup component
        <ReviewPopup
          bathroomId={roomNumber}
          onClose={closeReviewPopup}
        />
      )}
    </div>
  );
}

export default BathroomBox;
