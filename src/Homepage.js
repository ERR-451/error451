import React from "react";
import Login from "./Login";
import BathroomBox from "./BathroomBox";

function Homepage(props) {
  // Component logic, state, and methods go here
  // BathroomBoxes will be built using .map after getting response from Firebase

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
      <BathroomBox />
    </>
  );
}

export default Homepage;
