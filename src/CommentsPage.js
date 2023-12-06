// Import React library for building the CommentsPage component
import React from "react";

// Functional component for displaying a feedback/comments page
function CommentsPage(props) {
    return (
        // HTML structure for the feedback/comments page
        <html lang="en">
            <head>
                {/* Meta tags for character set and viewport */}
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* Title for the feedback page */}
                <title>Feedback Page</title>

                {/* Internal styling for the page */}
                <style>
                    {`
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
    
                        header, section, footer {
                            background-color: #f0f0f0;
                            padding: 20px;
                            margin: 10px;
                            border: 1px solid #ccc;
                        }
                    `}
                </style>
            </head>
            <body>
                {/* Header section with the title */}
                <header>
                    <h1>Bathroom Box</h1>
                </header>
                
                {/* Main content section with placeholder rating */}
                <section>
                    <h2>* * * * *</h2>
                </section>
    
                {/* Comments section with existing comments and a comment form */}
                <div className="comments-section">
                    <h2>Comments Section</h2>
                    
                    {/* Container for displaying existing comments */}
                    <div id="comments-container">
                        {/* Old Comments */}
                        <div className="comment">
                            <p className="comment-text">User1: This is the first comment.</p>
                        </div>
                        <div className="comment">
                            <p className="comment-text">User2: Another comment here.</p>
                        </div>
                    </div>
                    
                    {/* Form for adding new comments */}
                    <div className="comment-form">
                        <label htmlFor="comment">Leave your comment:</label>
                        <textarea id="comment" placeholder="Type your comment here"></textarea>
                        {/* Uncomment the button and implement addComment() function if needed */}
                        {/* <button onClick={() => addComment()}>Submit</button> */}
                    </div>
                </div>
    
                {/* Footer section with a copyright notice */}
                <footer>
                    <p>&copy; 2023 RateRooms</p>
                </footer>
            </body>
        </html>
    );
}

// Export the CommentsPage component as the default export
export default CommentsPage;
