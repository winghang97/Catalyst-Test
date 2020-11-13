import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

function ForkSelect() {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fork, setFork] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/orgs/catalyst/repos")
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* <DropdownButton id="dropdown-basic-button" title="Filter">
        <Dropdown.Item value="">All</Dropdown.Item>
        <Dropdown.Item value="true">Forked</Dropdown.Item>
        <Dropdown.Item value="false">Not Forked</Dropdown.Item>
      </DropdownButton> */}

      <select onChange={(e) => setFork({ filter: e.target.value })}>
        <option value="">All</option>
        <option value="true">Forked</option>
        <option value="false">Not Forked</option>
      </select>
      <br />
      <br />
      {repos
        .filter((repo) => setFork.filter || repo.fork === setFork.filter)
        .map((repo) =>
          repo.fork === "true" ? (
            <div className="fork">{repo.name}</div>
          ) : (
            <div className="notfork">{repo.name}</div>
          )
        )}
    </div>
  );
}

export default ForkSelect;
