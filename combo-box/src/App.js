import { useState } from "react";
import SelectComponent from "./SelectComponent.js";
import "./styles.css";

const options = [
  { key: 1, value: "Apple" },
  { key: 2, value: "Banana" },
  { key: 3, value: "Carrot" },
  { key: 4, value: "Durian" },
];

function App() {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="App">
      <h1>Custom Combo Box</h1>
      <SelectComponent
        options={options}
        onChange={(item) => setSelectedOption(item)}
        selectedKey={selectedOption}
        placeholder={"type to search"}
      />
      <p>selected option: {selectedOption}</p>
    </div>
  );
}

export default App;
