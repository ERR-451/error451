import React from "react";

function StarRating(props) {
  const reviews = props.reviews;

  // If there are no reviews, display a different message
  if (reviews.length === 0) {
    return <p>No Reviews Yet!</p>;
  }

  // Calculate the average rating
  const totalStars = reviews.reduce((total, review) => {
    console.log(review); // Log each review to check its structure
    return total + review.stars;
  }, 0);
  const averageRating = reviews.length > 0 ? totalStars / reviews.length : 0;

  // Check if the average rating is a whole number
  const displayRating = Number.isInteger(averageRating)
    ? averageRating
    : averageRating.toFixed(1);

  return <p>Average Rating: {displayRating}/5</p>;
}

export default StarRating;
