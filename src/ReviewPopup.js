import React, { useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function ReviewPopup({ bathroomId, onClose }) {
  const [stars, setStars] = useState(1);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const submitReview = () => {
    // Save the review to Firebase
    const firestore = firebase.firestore();
    const reviewsRef = firestore.collection('reviews');

    reviewsRef.add({
      bathroomId,
      stars,
      title,
      comment,
      userId: firebase.auth().currentUser.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Close the popup
    onClose();
  };

  return (
    <div className="review-popup">
      <h2>Create Review</h2>
      <label>Stars:</label>
      <select value={stars} onChange={(e) => setStars(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((value) => (
          <option key={value} value={value}>{value}</option>
        ))}
      </select>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Comment:</label>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <button onClick={submitReview}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default ReviewPopup;
