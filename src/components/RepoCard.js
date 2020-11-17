import React from "react";

const RepoCard = ({ repos, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="row">
      {repos.map((repo) => (
        <div key={repo.id} lass="col-md">
          <div c>
            <p className="lead">Name: {repo.name}</p>
            <p>Description: {repo.description}</p>
            <p>
              Link: <a href="{repo.html_url}">{repo.html_url}</a>
            </p>
            <p>Fork: {repo.fork.toString()}</p>
            <p>Star Count: {repo.stargazers_count}</p>
            <p>Watchers Count: {repo.watchers_count}</p>
            <p>License: {repo.license ? repo.license.name : "null"}</p>
            <p>Language: {repo.language}</p>
            <p>Top 5 Contributors:</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepoCard;
