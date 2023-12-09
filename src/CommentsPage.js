// Import React library
import React from "react";

// Define CommentsPage component
// This component receives an array of comments as props and renders them
function CommentsPage({ comments }) {
  return (
    // Create a section for comments
    <div className="comments-section">
      <h2>Reviews</h2>
      <div id="comments-container">
        {comments.map((comment) => {
          // Convert Firestore timestamp to JavaScript Date object
          const date = comment.timestamp.toDate();
          return (
            // Each comment is wrapped in a div with a unique key
            <div className="comment" key={comment.bathroomId}>
              <p className="comment-title">Title: {comment.title}</p>
              <p className="comment-stars">Stars: {comment.stars}/5</p>
              <p className="comment-text">"{comment.comment}"</p>
              <p className="comment-date">Date: {date.toString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Export the CommentsPage component for use in other files
export default CommentsPage;
