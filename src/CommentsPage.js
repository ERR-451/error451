import React from "react";


function CommentsPage(props) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Feedback Page</title>
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
            
                <header>
                    <h1>Bathroom Box</h1>
                </header>
                <section>
                    <h2>* * * * *</h2>
                </section>
    
                <div className="comments-section">
                    <h2>Comments Section</h2>
                    <div id="comments-container">
                        {/* Old Comments */}
                        <div className="comment">
                            <p className="comment-text">User1: This is the first comment.</p>
                        </div>
                        <div className="comment">
                            <p className="comment-text">User2: Another comment here.</p>
                        </div>
                    </div>
                    <div className="comment-form">
                        <label htmlFor="comment">Leave your comment:</label>
                        <textarea id="comment" placeholder="Type your comment here"></textarea>
                        {/* <button onClick={() => addComment()}>Submit</button> */}
                    </div>
                </div>
    
                <footer>
                    <p>&copy; 2023 RateRooms</p>
                </footer>
            </body>
        </html>
    );
}



export default CommentsPage;