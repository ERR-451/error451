import React, { useState, useEffect } from "react";
import BathroomTitle from "./BathroomTitle";
import StarRating from "./StarRating";
import Amenities from "./Amenities";
import ReviewPopup from "./ReviewPopup"; // Import the new ReviewPopup component
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import CommentsPage from "./CommentsPage";

function BathroomBox(props) {
  const { bathroom_id, reviews } = props;
  const [bathroomData, setBathroomData] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  useEffect(() => {
    const firestore = firebase.firestore();
    const bathroomsRef = firestore.collection("bathrooms");

    const query = bathroomsRef.where("Room Number", "==", bathroom_id);

    query
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setBathroomData(doc.data());
          });
        } else {
          console.log("No matching documents for bathroom ID: ", bathroom_id);
        }
      })
      .catch((error) => {
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
      <StarRating reviews={reviews} />
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
      {showReviews ? (
        <CommentsPage onPopupClose={() => setShowReviews(false)} />
      ) : null}
      <div className="review-buttons">
        {showReviews ? (
          <button onClick={() => setShowReviews(false)}>Close</button>
        ) : (
          <button onClick={() => setShowReviews(true)}>See Reviews</button>
        )}

        <button onClick={openReviewPopup}>Create Review</button>
      </div>
      {showReviews && (
        // Display reviews (you can create a separate Reviews component)
        <div className="reviews-section">{/* Render reviews here */}</div>
      )}
      {showReviewPopup && (
        // Display the ReviewPopup component
        <ReviewPopup bathroomId={roomNumber} onClose={closeReviewPopup} />
      )}
    </div>
  );
}

export default BathroomBox;
