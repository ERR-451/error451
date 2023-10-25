import React from "react";
import Amenities from "./Amenities";
import StarRating from "./StarRating";
import BathroomTitle from "./BathroomTitle";

function BathroomBox(props) {
  // Homepage will create multiple BathroomBoxes
  // using the props provided as it loops/maps through
  // each bathroom given by the db

  // destructure props for easier use
  const { bathroom_id, stalls, sinks, gender, rating } = props;

  return (
    <div className="bathroom-box">
      <BathroomTitle bathroom_id={bathroom_id} />
      <StarRating rating={rating} />
      <Amenities stalls={stalls} sinks={sinks} gender={gender} />
    </div>
  );
}

export default BathroomBox;
