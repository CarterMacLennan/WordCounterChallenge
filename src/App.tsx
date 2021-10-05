import { useState } from "react";
import "./App.css";
import {
  Jumbotron,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [filterByCount, setFilterByCount] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropDown = () => setDropdownOpen((prevState) => !prevState);

  const countWords = () => {
    let wordCounts: { [key: string]: number } = {};
    input
      .toLowerCase()
      .split(" ")
      .filter((str) => str !== "")
      .forEach((word) => {
        if (!wordCounts.hasOwnProperty(word)) {
          wordCounts[word] = 1;
        } else {
          wordCounts[word]++;
        }
      });

    let result = "";
    if (filterByCount) {
      Object.keys(wordCounts)
        .sort((a, b) => wordCounts[b] - wordCounts[a])
        .map((key) => (result += key + ": " + wordCounts[key] + "\n"));
    } else {
      Object.keys(wordCounts)
        .sort()
        .map((key) => (result += key + ": " + wordCounts[key] + "\n"));
    }
    setOutput(result);
  };

  return (
    <div>
      <div className="app-header">
        <Jumbotron>
          <h1 className="title">Word Counter</h1>
          <p className="subtitle">
            Just type or paste your text into the text area and we'll count them
            for you!{" "}
          </p>
          <hr />
          <a href="https://linkedin.com/in/cartermaclennan/">
            <Button className="header-btn-custom">Contact the Developer</Button>
          </a>
        </Jumbotron>
      </div>
      <div className="row align-items-center">
        <div className="col-sm-1"></div>
        <div className="col-sm-4">
          <div className="form-group ">
            <textarea
              id="exampleTextarea"
              rows={10}
              className="input-field form-control form-control-lg mb-3word-input"
              placeholder="type here ..."
              value={input}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
                setInput(e.target.value)
              }
            ></textarea>
          </div>
        </div>
        <div className="col-sm-1 text-center">
          <Dropdown size="lg" isOpen={dropdownOpen} toggle={toggleDropDown}>
            <DropdownToggle className="dropdown-custom" caret>
              Fillter By
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => setFilterByCount(false)}
                disabled={!filterByCount}
              >
                Alphabetically
              </DropdownItem>
              <DropdownItem
                onClick={() => setFilterByCount(true)}
                disabled={filterByCount}
              >
                Numerically
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="col-sm-1 text-center">
          <Button className="btn-lg btn-custom center" onClick={countWords}>
            Count!
          </Button>
        </div>
        <div className="col-sm-4">
          <div className="form-group ">
            <textarea
              id="exampleTextarea"
              rows={10}
              className="input-field form-control form-control-lg mb-3word-input"
              value={output}
            />
          </div>
        </div>
        <div className="col-sm-1"></div>
      </div>
    </div>
  );
}

export default App;
