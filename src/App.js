import logo from './logo.svg';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupTimeout = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(popupTimeout);
  }, []);

  /* Add a useEffect here to get JSON data from Firebase
     and store in variables */

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;