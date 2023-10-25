import React from "react";
import Login from "./Login";
import Maps from "./Maps";

function Homepage(props) {
  // Component logic, state, and methods go here
  // BathroomBoxes will be built using .map after getting response from Firebase

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {Maps(props) /* Add your other homepage content here */}
      <button onClick={props.handleSignOut}>Sign Out</button>
      {/* Add your other homepage content here */}
    </div>
  );
}

export default Homepage;
