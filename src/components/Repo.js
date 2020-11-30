import React, { useMemo, useState, useEffect } from "react";
import Table from "./Table";

function FetchData() {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "GitHub URL",
        accessor: "html_url",
      },
      {
        Header: "Forked",
        accessor: "fork",
      },
      {
        Header: "Star Count",
        accessor: "stargazers_count",
      },
      {
        Header: "Watchers Count",
        accessor: "watchers_count",
      },
      {
        Header: "License",
        accessor: "license.name",
      },
      {
        Header: "Language",
        accessor: "language",
      },
      {
        Header: "Top 5 Contributors",
        accessor: "topcontributor",
      },
      {
        Header: "Created Time",
        accessor: "created_at",
      },
      {
        Header: "Updated Time",
        accessor: "updated_at",
      },
    ],
    []
  );

  const [repos, setRepos] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/orgs/catalyst/repos")
      .then((res) => res.json())
      .then((data) => setRepos(data))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid">
      <Table columns={columns} data={repos} />
    </div>
  );
}

export default FetchData;
