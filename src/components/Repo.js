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
      .then((data) => {
        setRepos(data);
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  //Get current repos
  const indexOfLastRepo = currentPage * reposPerPage;
  const indedxOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepo = repos.slice(indedxOfFirstRepo, indexOfLastRepo);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
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
