import React, { useState, useEffect } from "react";
import Repocard from "./RepoCard";
import Pagination from "./Pagination";

function FetchData() {
  const [repos, setRepos] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(5);

  useEffect(() => {
    fetch("https://api.github.com/orgs/catalyst/repos")
      .then((res) => res.json())
      .then((data) => setRepos(data))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   fetch("https://api.github.com/orgs/catalyst/repos")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setRepos(data); // Data 1(repos) is received
  //       // Now We make another API call to get Data 2 (contributors)
  //       console.log(1);
  //       console.log(repos[0].contributors_url);
  //       return fetch(repos[0].contributors_url);
  //     })
  //     .then((res) => res.json()) // Chaining promise,handling 2nd Fetch request
  //     .then((data2) => {
  //       console.log(2);
  //       console.log(data2);
  //       setContributors(data2);
  //     })
  //     .then(() => {
  //       setLoading(false);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  //Get current repos
  const indexOfLastRepo = currentPage * reposPerPage;
  const indedxOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepo = repos.slice(indedxOfFirstRepo, indexOfLastRepo);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Sorting
  return (
    <div className="container-fluid">
      {/* <div className="buttonContainer">
        <div>
          <button
            className="btn btn-primary mycustom dropdown-toggle mr-4"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sort by{" "}
          </button>

          <div className="dropdown-menu">
            <a
              className="dropdown-item"
              href="#"
              // onClick={() => sortBy("funded")}
            >
              Percentage fund
            </a>
            <a
              className="dropdown-item"
              href="#"
              // onClick={() => sortBy("backers")}
            >
              Number of backers
            </a>
          </div>
        </div>
      </div> */}

      <Repocard repos={currentRepo} loading={loading} />
      <Pagination
        reposPerPage={reposPerPage}
        totalRepos={repos.length}
        paginate={paginate}
      />
    </div>
  );
}

export default FetchData;
