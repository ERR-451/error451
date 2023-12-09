// Import necessary dependencies and components
import React, { useState, useEffect } from "react";
import BathroomTitle from "./BathroomTitle";
import StarRating from "./StarRating";
import Amenities from "./Amenities";
import ReviewPopup from "./ReviewPopup";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import CommentsPage from "./CommentsPage";

// BathroomBox component displays detailed information about a specific bathroom
function BathroomBox(props) {
  // Extract bathroom_id and reviews from props
  const { bathroom_id, reviews } = props;

  // Initialize state variables
  const [bathroomData, setBathroomData] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);

  // Fetch bathroom data from Firestore when component mounts
  useEffect(() => {
    const firestore = firebase.firestore();
    const bathroomsRef = firestore.collection("bathrooms");

    // Query Firestore for bathroom with matching ID
    const query = bathroomsRef.where("Room Number", "==", bathroom_id);

    // Execute query and update bathroomData state with result
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

  // Fetch reviews data from Firestore when component mounts
  useEffect(() => {
    const firestore = firebase.firestore();
    const reviewsRef = firestore.collection("reviews");

    // Query Firestore for reviews with matching bathroom ID
    const query = reviewsRef.where("bathroomId", "==", bathroom_id);

    // Execute query and update reviewsData state with result
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

  // Display loading message if bathroom data is not yet loaded
  if (!bathroomData) {
    return <div>Loading...</div>;
  }

  // Define functions to control the visibility of the review popup
  const openReviewPopup = () => setShowReviewPopup(true);
  const closeReviewPopup = () => setShowReviewPopup(false);

  // Destructure bathroom data for easier access in the component
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

  // Render the BathroomBox component
  return (
    <div className="bathroom-box">
      {/* Display bathroom title and star rating */}
      <BathroomTitle bathroom_id={roomNumber} />
      <StarRating reviews={reviews} />

      {/* Display amenities details */}
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

      {/* Conditionally render the CommentsPage component */}
      {showReviews && (
        <CommentsPage
          comments={reviewsData}
          onPopupClose={() => setShowReviews(false)}
        />
      )}

      {/* Render buttons for controlling reviews visibility and creation */}
      <div className="review-buttons">
        <button onClick={() => setShowReviews(!showReviews)}>
          {showReviews ? "Close" : "See Reviews"}
        </button>
        <button onClick={openReviewPopup}>Create Review</button>
      </div>

      {/* Conditionally render the ReviewPopup component */}
      {showReviewPopup && (
        <ReviewPopup bathroomId={roomNumber} onClose={closeReviewPopup} />
      )}
    </div>
  );
}

export default BathroomBox;
