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
      <BathroomBox />
    </>
  );
}

export default Homepage;
