import React from "react";

function StarRating(props) {
  const reviews = props.reviews;

  // Calculate the average rating
  const totalStars = reviews.reduce((total, review) => {
    console.log(review); // Log each review to check its structure
    return total + review.stars;
  }, 0);
  const averageRating = reviews.length > 0 ? totalStars / reviews.length : 0;

  return <p>Average Rating: {averageRating.toFixed(1)}/5</p>;
}

export default StarRating;
