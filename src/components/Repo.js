import React, { useMemo, useState, useEffect } from "react";
import { SelectColumnFilter } from "./Filter";
import Table from "./Table";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";

function FetchData() {
  const renderRowSubComponent = (row) => {
    const {
      name,
      description,
      html_url,
      stargazers_count,
      watchers_count,
      license,
      language,
    } = row.original;
    return (
      <Card style={{ width: "40rem", margin: "0 auto" }}>
        <CardBody>
          <CardTitle>
            <strong>{`${name}`} </strong>
          </CardTitle>
          <CardText>
            <strong>Description</strong>: {description} <br />
            <strong>GitHub URL</strong>: <a href={html_url}>{html_url}</a>
            <br />
            <strong>Star Count</strong>: {stargazers_count} <br />
            <strong>Watchers Count</strong>: {watchers_count} <br />
            <strong>License</strong>: {license.name} <br />
            <strong>Language</strong>: {language} <br />
          </CardText>
        </CardBody>
      </Card>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: "expander", // 'id' is required
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? "👇" : "👉"}
          </span>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        disableFilters: true,
      },
      {
        id: "fork",
        Header: "Forked",
        accessor: (d) => d.fork.toString(),
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "Created Time",
        accessor: "created_at",
        disableFilters: true,
      },
      {
        Header: "Updated Time",
        accessor: "updated_at",
        disableFilters: true,
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
      <Table
        columns={columns}
        data={repos}
        renderRowSubComponent={renderRowSubComponent}
      />
    </div>
  );
}

export default FetchData;
