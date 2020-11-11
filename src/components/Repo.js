import React, { useState, useEffect } from "react";

function FetchData() {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/orgs/catalyst/repos")
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        console.log(data);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

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
      {repos.map((repo) => (
        <div key={repo.id}>
          <div>
            <h2>Name: {repo.name}</h2>
            <p>Description: {repo.description}</p>
            <p>
              Link: <a href="{repo.html_url}">{repo.html_url}</a>
            </p>
            <p>Fork: {repo.fork.toString()}</p>
            <p>Star Count: {repo.stargazers_count}</p>
            <p>Watchers Count: {repo.watchers_count}</p>
            <p>License: {repo.license ? "license..." : "null"}</p>
            <p>Language: {repo.language}</p>
            <p>Top 5 Contributors: {repo.stargazers_count}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FetchData;