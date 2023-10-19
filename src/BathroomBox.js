import React from "react";
import Amenities from "./Amenities";
import StarRating from "./StarRating";
import BathroomTitle from "./BathroomTitle";

function BathroomBox(props) {
  // Homepage will create multiple BathroomBoxes
  // using the props provided as it loops/maps through
  // each bathroom given by the db

  return (
    <div className="bathroom-box">
      <BathroomTitle />
      <StarRating />
      <Amenities />
    </div>
  );
}

export default BathroomBox;
