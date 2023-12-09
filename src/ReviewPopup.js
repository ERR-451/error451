// Import React and useState from React library
import React, { useState } from "react";

// Import Firebase and Firestore for database interaction
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Functional component for a review submission popup
function ReviewPopup({ bathroomId, onClose }) {
  // State variables for review details: stars, title, and comment
  const [stars, setStars] = useState(1);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  // Function to submit the review to Firebase
  const submitReview = () => {
    // Save the review to Firebase Firestore
    const firestore = firebase.firestore();
    const reviewsRef = firestore.collection("reviews");

    // Add the review document to the 'reviews' collection
    reviewsRef.add({
      bathroomId,
      stars,
      title,
      comment,
      userId: firebase.auth().currentUser.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Close the review submission popup
    onClose();
  };

  // Render the review submission popup with form elements
  return (
    <div className="review-popup">
      <h2>Create Review</h2>

      {/* Dropdown for selecting the number of stars */}
      <label>Stars:</label>
      <select
        value={stars}
        onChange={(e) => setStars(Number(e.target.value))}
        className="reviewinput"
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      {/* Input field for the review title */}
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="reviewinput"
      />

      {/* Textarea for entering the review comment */}
      <label>Comment:</label>
      <textarea
        className="reviewinput"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Buttons for submitting or canceling the review */}
      <button onClick={submitReview}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

// Export the ReviewPopup component as the default export
export default ReviewPopup;
