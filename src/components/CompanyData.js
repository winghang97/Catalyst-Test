import React, { useState, useEffect } from "react";

function CompanyData() {
  const [comp, setComp] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/orgs/catalyst")
      .then((res) => res.json())
      .then((data) => {
        setComp(data);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div key={comp.id}>
        <h2>Name:{comp.name}</h2>
        <p>Description: {comp.description}</p>
        <p>Location: {comp.location}</p>
        <p>Total number of repositories: {comp.public_repos}</p>
        <p>
          Blog URL: <a href={comp.blog}>{comp.blog}</a>
        </p>
        <p>
          GitHub URL: <a href={comp.html_url}>{comp.html_url}</a>
        </p>
      </div>
    </div>
  );
}

export default CompanyData;
