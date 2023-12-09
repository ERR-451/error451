// Import React, useState, and useEffect from React library
import React, { useState, useEffect } from "react";

// Import components for rendering bathrooms and maps
import BathroomBox from "./BathroomBox";
import Maps from "./Maps";

// Import Firebase and Firestore for data retrieval
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Functional component for the Homepage
function Homepage(props) {
  // State variables for selected floor, bathrooms data, and reviews data
  const [selectedFloor, setSelectedFloor] = useState("All"); // Initial selection is "All."
  const [bathroomsData, setBathroomsData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);

  // Fetch data from Firebase Firestore to build bathrooms and reviews
  useEffect(() => {
    const firestore = firebase.firestore();
    const bathroomsRef = firestore.collection("bathrooms");
    const reviewsRef = firestore.collection("reviews");

    // Fetch bathrooms data
    bathroomsRef
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setBathroomsData(data); // Set the bathrooms data
      })
      .catch((error) => {
        console.error("Error getting documents:", error);
      });

    // Fetch reviews data
    reviewsRef
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setReviewsData(data); // Set the reviews data
      })
      .catch((error) => {
        console.error("Error getting documents:", error);
      });
  }, []);

  // Function to render BathroomBox components based on selected floor
  const renderBathroomBoxes = () => {
    // Filter bathrooms based on the selected floor
    const filteredBathrooms =
      selectedFloor === "All"
        ? bathroomsData
        : bathroomsData.filter(
            (bathroom) => bathroom["Floor Number"] === parseInt(selectedFloor)
          );

    // Map through filtered bathrooms and create BathroomBox components
    return filteredBathrooms.map((bathroom, index) => {
      // Filter reviews for this bathroom
      const bathroomReviews = reviewsData.filter(
        (review) => review.bathroomId === bathroom["Room Number"]
      );

      // Render BathroomBox component for each bathroom
      return (
        <BathroomBox
          key={index}
          bathroom_id={bathroom["Room Number"]}
          reviews={bathroomReviews} // Pass the reviews as a prop
        />
      );
    });
  };

  // Render the Homepage with maps, floor selection, and BathroomBoxes
  return (
    <div>
      <h1>Welcome to the Home Page</h1>

      {/* Render Maps component with selected floor value */}
      <Maps selectedValue={selectedFloor} />

      {/* Floor selection dropdown */}
      <div id="floor-select">
        <label>Select Floor: </label>
        <select
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(e.target.value)}
        >
          <option value="All">All</option>
          <option value="1">Floor 1</option>
          <option value="2">Floor 2</option>
          <option value="3">Floor 3</option>
        </select>
      </div>

      {/* Container for rendering BathroomBox components */}
      <div className="bathroom-boxes-container">{renderBathroomBoxes()}</div>


    </div>
  );
}

// Export the Homepage component as the default export
export default Homepage;
