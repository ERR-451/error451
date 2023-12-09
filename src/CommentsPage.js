import React from "react";

function CommentsPage({ comments }) {
  return (
    <div className="comments-section">
      <h2>Reviews</h2>
      <div id="comments-container">
        {comments.map((comment) => {
          const date = comment.timestamp.toDate();
          return (
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

export default CommentsPage;
