import React from "react";

function Amenities(props) {
  // List of bathroom amenities
  // Will get amenities from db and return as <ul>

  const { stalls, sinks, gender } = props;

  return (
    // placeholder content
    <ul className="amenities">
      <li>Stalls: {stalls}</li>
      <li>Sinks: {sinks}</li>
      <li>Gender: {gender}</li>
    </ul>
  );
}

export default Amenities;
