import React, { useState, useEffect } from "react";
import BathroomBox from "./BathroomBox";
import Maps from "./Maps";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function Homepage(props) {
  const [selectedFloor, setSelectedFloor] = useState("All"); // Initial selection is "All."
  const [bathroomsData, setBathroomsData] = useState([]);

  // Fetch bathroom data from Firebase Firestore
  useEffect(() => {
    const firestore = firebase.firestore();
    const bathroomsRef = firestore.collection("bathrooms");

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
  }, []);

  const renderBathroomBoxes = () => {
    // Filter bathrooms based on the selected floor
    const filteredBathrooms =
      selectedFloor === "All"
        ? bathroomsData
        : bathroomsData.filter(
            (bathroom) => bathroom["Floor Number"] === parseInt(selectedFloor)
          );

    return filteredBathrooms.map((bathroom, index) => (
      <BathroomBox key={index} bathroom_id={bathroom["Room Number"]} />
    ));
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {Maps()}

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

      {renderBathroomBoxes()}
    </div>
  );
}

export default Homepage;
