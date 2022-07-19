# Reactjs Combo Box

## App.js

```
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
      <h1>Custom Dropdown</h1>
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
```

## SelectComponent.js
```
import React, { useEffect, useState } from "react";
import withClickOutside from "./withClickOutside";

const SelectComponent = React.forwardRef(
  (
    { options, placeholder = "", onChange, selectedKey, open, setOpen },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(placeholder);

    useEffect(() => {
      if (selectedKey) {
        setInputValue(options.find((o) => o.key === selectedKey).value);
      }
    }, [selectedKey, options]);

    useEffect(() => {
      if (!open && options.findIndex((o) => o.value === inputValue) === -1) {
        if (!inputValue) {
          onChange("");
        } else {
          if (selectedKey) {
            setInputValue(options.find((o) => o.key === selectedKey).value);
          } else {
            setInputValue("");
          }
        }
      }
    }, [open, options, selectedKey, inputValue, onChange]);

    const onInputChange = (e) => {
      setInputValue(e.target.value);
    };

    const onInputClick = () => {
      setOpen((prevValue) => !prevValue);
    };

    const onOptionSelected = (option) => {
      onChange !== undefined && onChange(option.key);
      onChange !== undefined && setInputValue(option.value);
      setOpen(false);
    };

    const clearDropdown = () => {
      setInputValue("");
      onChange("");
    };

    return (
      <div className="dropdown-container" ref={ref}>
        <div className="input-container" onClick={onInputClick}>
          <input
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={onInputChange}
          />
          <div className="input-arrow-container">
            <i className="input-arrow" />
          </div>

          {selectedKey || inputValue ? (
            <div className="input-clean-container" onClick={clearDropdown}>
              x
            </div>
          ) : null}
        </div>
        <div className={`dropdown ${open ? "visible" : ""}`}>
          {options
            .filter((item) => {
              const searchTerm = inputValue.toLowerCase();
              const v = item.value.toLowerCase();

              if (!searchTerm) return true;

              return v.startsWith(searchTerm);
            })
            .map((opt) => (
              <div
                key={opt.key}
                onClick={() => onOptionSelected(opt)}
                className="option"
                value={opt.key}
              >
                {opt.value}
              </div>
            ))}
        </div>
      </div>
    );
  }
);

export default withClickOutside(SelectComponent);

```

### withOutsideClick.js

```
import React, { useState, useRef, useEffect } from "react";

export default function withClickOutside(WrappedComponent) {
  const Component = (props) => {
    const [open, setOpen] = useState(false);

    const ref = useRef();

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!ref.current.contains(event.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
    }, [ref]);

    return (
      <WrappedComponent open={open} setOpen={setOpen} ref={ref} {...props} />
    );
  };

  return Component;
}

```

## styles.css
```
.App {
  font-family: sans-serif;
}

.dropdown-container {
  width: 250px;
  position: relative;
}

.dropdown {
  border: 1px solid black;
  width: 100%;
  border-bottom: none;
  box-sizing: border-box;
  position: absolute;
  display: none;
}

.dropdown.visible {
  display: block;
}

.option {
  height: 36px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
  background-color: white;
}

.option:hover {
  background-color: royalblue;
}

.input-container {
  position: relative;
  width: 100%;
}

.dropdown-container input {
  width: 100%;
  padding: 0;
  border-width: 1px;
  height: 36px;
  padding-left: 10px;
  box-sizing: border-box;
  position: relative;
}

.input-arrow-container {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  margin-top: -2px;
  cursor: pointer;
}

.input-arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.input-clean-container {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  margin-top: -2px;
  cursor: pointer;
}

.input-clean {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

```
