import React, { useEffect } from "react";
// import { selectedFloor, setSelectedFloor } from "./Homepage";

function Maps({ selectedValue }) {
  const [value, setValue] = React.useState("img/STC_2Floor.png");

  useEffect(() => {
    if (selectedValue === "All") {
      setValue("img/STC_2Floor.png");
    } else {
      setValue(`img/STC_${selectedValue}Floor.png`);
    }
  }, [selectedValue]);

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  //   if ((selectedFloor = "1")) {
  //   }

  return (
    <div className="map">
      <header className="map-header">
        <div>
          {/* <select value={value} onChange={handleChange}>
            <option value="img/STC_1stFloor.png">Floor 1</option>
            <option value="img/STC_2ndFloor.png">Floor 2</option>
            <option value="img/STC_3rdFloor.png">Floor 3</option>
          </select> */}
          <img
            id="mapimage"
            src={`./${value}`}
            className="map"
            alt="map"
            width="700px"
            height="500px"
            display="flex"
            justify-content="center"
          ></img>
        </div>
      </header>
    </div>
  );
}

export default Maps;
