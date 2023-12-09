// Import necessary dependencies and components from React and other modules
import React, { useState, useEffect } from "react";
import BathroomTitle from "./BathroomTitle";
import StarRating from "./StarRating";
import Amenities from "./Amenities";
import ReviewPopup from "./ReviewPopup"; // Import the new ReviewPopup component
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import CommentsPage from "./CommentsPage";

// Functional component for displaying bathroom details
function BathroomBox(props) {
  // Destructure props for easier access
  const { bathroom_id, reviews } = props;

  // State to store bathroom data, show reviews, and show review popup
  const [bathroomData, setBathroomData] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [reviewsData, setReviewsData] = useState([]); // Add state for reviews data

  // Fetch bathroom data from Firestore using useEffect hook
  useEffect(() => {
    const firestore = firebase.firestore();
    const bathroomsRef = firestore.collection("bathrooms");

    // Query the Firestore collection for the specific bathroom ID
    const query = bathroomsRef.where("Room Number", "==", bathroom_id);

    // Execute the query and update state with the retrieved data
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

  // Fetch reviews data from Firestore using useEffect hook
  useEffect(() => {
    const firestore = firebase.firestore();
    const reviewsRef = firestore.collection("reviews");

    // Query the Firestore collection for reviews for the specific bathroom ID
    const query = reviewsRef.where("bathroomId", "==", bathroom_id);

    // Execute the query and update state with the retrieved data
    query
      .get()
      .then((querySnapshot) => {
        const reviewsArray = [];
        querySnapshot.forEach((doc) => {
          reviewsArray.push(doc.data());
        });
        setReviewsData(reviewsArray);
      })
      .catch((error) => {
        console.error("Error getting documents:", error);
      });
  }, [bathroom_id]);

  // If bathroom data is not yet loaded, display a loading message
  if (!bathroomData) {
    return <div>Loading...</div>;
  }

  // Function to open the review popup
  const openReviewPopup = () => {
    setShowReviewPopup(true);
  };

  // Function to close the review popup
  const closeReviewPopup = () => {
    setShowReviewPopup(false);
  };

  // Destructure bathroom data for easier access
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

  // Render the bathroom details and associated components
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
      {/* Show Comments box if selected */}
      {showReviews ? (
        <CommentsPage
          comments={reviewsData}
          onPopupClose={() => setShowReviews(false)}
        />
      ) : null}
      <div className="review-buttons">
        {showReviews ? (
          <button onClick={() => setShowReviews(false)}>Close</button>
        ) : (
          <button onClick={() => setShowReviews(true)}>See Reviews</button>
        )}

        <button onClick={openReviewPopup}>Create Review</button>
      </div>
      {showReviewPopup && (
        // Display the ReviewPopup component
        <ReviewPopup bathroomId={roomNumber} onClose={closeReviewPopup} />
      )}
    </div>
  );
}

// Export the BathroomBox component as the default export
export default BathroomBox;
