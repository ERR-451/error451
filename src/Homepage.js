import React from "react";
import Login from "./Login";
import BathroomBox from "./BathroomBox";

function Homepage(props) {
  // Component logic, state, and methods go here
  // BathroomBoxes will be built using .map after getting response from Firebase

  // Placeholder bathroom data
  let bathroomsData = {
    bathrooms: [
      {
        bathroom_id: "STC-321",
        stalls: 5,
        sinks: 2,
        gender: "M",
        rating: "☆☆☆☆",
      },
      {
        bathroom_id: "STC-355",
        stalls: 4,
        sinks: 3,
        gender: "F",
        rating: "☆☆☆☆☆",
      },
      {
        bathroom_id: "STC-368",
        stalls: 3,
        sinks: 1,
        gender: "M",
        rating: "☆☆☆",
      },
    ],
  };

  const renderBathroomBoxes = () => {
    return bathroomsData.bathrooms.map((bathroom) => (
      <BathroomBox
        bathroom_id={bathroom.bathroom_id}
        stalls={bathroom.stalls}
        sinks={bathroom.sinks}
        gender={bathroom.gender}
        rating={bathroom.rating}
      />
    ));
  };

  return (
    <>
      <div>
        <h1>Welcome to the Home Page</h1>
        <button onClick={props.handleSignOut}>Sign Out</button>
        {/* Add your other homepage content here */}
      </div>

      {/* In the future there will be a map function here
          It will pass the props needed for each bathroom to build
          the title, rating, and amenities as needed

          It would be easiest to build the boxes and map through them if we have an array of bathroom objects here. */}
      {renderBathroomBoxes()}
    </>
  );
}

export default Homepage;
