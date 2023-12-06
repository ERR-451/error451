import React, { useState, useEffect } from "react";
import BathroomBox from "./BathroomBox";
import Maps from "./Maps";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function Homepage(props) {
  const [selectedFloor, setSelectedFloor] = useState("All"); // Initial selection is "All."
  const [bathroomsData, setBathroomsData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);

  // Fetch data from Firebase Firestore to build bathrooms
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
        setBathroomsData(data);
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

  const renderBathroomBoxes = () => {
    // Filter bathrooms based on the selected floor
    const filteredBathrooms =
      selectedFloor === "All"
        ? bathroomsData
        : bathroomsData.filter(
            (bathroom) => bathroom["Floor Number"] === parseInt(selectedFloor)
          );

    return filteredBathrooms.map((bathroom, index) => {
      // Filter reviews for this bathroom
      const bathroomReviews = reviewsData.filter(
        (review) => review.bathroomId === bathroom["Room Number"]
      );

      return (
        <BathroomBox
          key={index}
          bathroom_id={bathroom["Room Number"]}
          reviews={bathroomReviews} // Pass the reviews as a prop
        />
      );
    });
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Maps selectedValue={selectedFloor} />

      <div>
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

      <div className="bathroom-boxes-container">{renderBathroomBoxes()}</div>
    </div>
  );
}

export default Homepage;
