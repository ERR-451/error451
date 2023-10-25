import * as React from "react";

function Maps(props) {
  const [value, setValue] = React.useState("img/STC_2ndFloor.png");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="map">
      <header className="map-header">
        {/* <a
          className="map-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

        <div>
          <select value={value} onChange={handleChange}>
            <option value="img/STC_1stFloor.png">Floor 1</option>
            <option value="img/STC_2ndFloor.png">Floor 2</option>
            <option value="img/STC_3rdFloor.png">Floor 3</option>
          </select>
          <img
            src={`./${value}`}
            className="map"
            alt="map"
            width="700px"
            height="500px"
          ></img>
        </div>
      </header>
    </div>
  );
}

export default Maps;
