import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./Homepage";
import Login from "./Login";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupTimeout = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(popupTimeout);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {showPopup ? <Login onPopupClose={() => setShowPopup(false)} /> : null}
      </header>

      <main>{showPopup ? null : <Homepage />}</main>

      <footer>
        <p>This is footer content</p>
      </footer>
    </div>
  );
}

export default App;
