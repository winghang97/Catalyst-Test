import React from "react";

const RepoCard = ({ repos, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <table className="table table-hover table-responsive">
      <thead className="thead-dark">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>GitHub URL</th>
          <th>Forked</th>
          <th>Star Count</th>
          <th>Watchers Count</th>
          <th>License</th>
          <th>Language</th>
          <th>Top 5 Contributors</th>
          <th>Created Time</th>
          <th>Updated Time</th>
        </tr>
      </thead>
      <tbody>
        {repos.map((repo) => (
          <tr key={repo.id}>
            <td>{repo.name}</td>
            <td>{repo.description}</td>
            <td>
              <a href="{repo.html_url}">{repo.name}</a>
            </td>
            <td>{repo.fork.toString()}</td>
            <td>{repo.stargazers_count}</td>
            <td>{repo.watchers_count}</td>
            <td>{repo.license ? repo.license.name : "null"}</td>
            <td>{repo.language}</td>
            <td></td>
            <td>{repo.created_at}</td>
            <td>{repo.updated_at}</td>
          </tr>
        ))}
      </tbody>
    </table>
    // <div className="row">
    //   <ul className="list-group">
    //     {repos.length &&
    //       repos.map((repo) => (
    //         <li key={repo.id} className="list-group-item">
    //           <h5 className="lead">Name: {repo.name}</h5>
    //           <p>Description: {repo.description}</p>
    //           <p>
    //             Link: <a href="{repo.html_url}">{repo.html_url}</a>
    //           </p>
    //           <p>Fork: {repo.fork.toString()}</p>
    //           <p>Star Count: {repo.stargazers_count}</p>
    //           <p>Watchers Count: {repo.watchers_count}</p>
    //           <p>License: {repo.license ? repo.license.name : "null"}</p>
    //           <p>Language: {repo.language}</p>
    //           <p>Top 5 Contributors:</p>
    //         </li>
    //       ))}
    //   </ul>
    // </div>
  );
};

export default RepoCard;
