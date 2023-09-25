<?php
session_start();


$firebaseApiKey = "AIzaSyCW5SYNOuiNl5-TT6bsmHdZLDvSg5YAkgI";

// Firebase Project ID
$projectId = "webapp-8910b";


// Firebase Authentication URL for registration
$firebaseAuthRegisterUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=$firebaseApiKey";

// Firebase Authentication URL for login
$firebaseAuthLoginUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=$firebaseApiKey";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["register"])) {
        // User registration data
        $userData = [
            "email" => $_POST["email"],
            "password" => $_POST["password"],
            "returnSecureToken" => true
        ];

        // Send a POST request to Firebase Authentication API for registration
        $ch = curl_init($firebaseAuthRegisterUrl);
    } else {
        // User login data
        $userData = [
            "email" => $_POST["email"],
            "password" => $_POST["password"],
            "returnSecureToken" => true
        ];

        // Send a POST request to Firebase Authentication API for login
        $ch = curl_init($firebaseAuthLoginUrl);
    }

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($userData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
    
    $response = curl_exec($ch);
    curl_close($ch);

    // Parse the response
    $responseData = json_decode($response, true);

    if (isset($responseData["idToken"])) {
        // Authentication successful, store the user's Firebase ID token in the session
        $_SESSION['firebase_id_token'] = $responseData["idToken"];
        // Redirect to the main page or perform other actions here
        header("Location: main.php");
        exit;
    } else {
        // Authentication failed, handle errors
        echo "Authentication failed: " . $responseData["error"]["message"];
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Authentication</title>
</head>
<body>
    <h1>User Authentication</h1>
    
    <h2>Register</h2>
    <form method="post" action="">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>
        <button type="submit" name="register">Register</button>
    </form>

    <h2>Sign In</h2>
    <form method="post" action="">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>
        <button type="submit">Sign In</button>
    </form>
</body>
</html>