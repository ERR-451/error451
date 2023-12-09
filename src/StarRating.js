// Import React library
import React from "react";

// Define StarRating component
// This component receives an array of reviews as props and calculates the average rating
function StarRating({ reviews }) {
  // If there are no reviews, return a message indicating this
  if (reviews.length === 0) {
    return <p>No Reviews Yet!</p>;
  }

  // Calculate the total stars from all reviews
  const totalStars = reviews.reduce((total, review) => total + review.stars, 0);

  // Calculate the average rating
  const averageRating = totalStars / reviews.length;

  // If the average rating is not a whole number, round it to one decimal place
  const displayRating = Number.isInteger(averageRating)
    ? averageRating
    : averageRating.toFixed(1);

  // Render the average rating
  return <p>Average Rating: {displayRating}/5</p>;
}

// Export StarRating component for use in other files
export default StarRating;
