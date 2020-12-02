import React, { useMemo, useState, useEffect } from "react";
import {
  useFilters,
  useTable,
  useSortBy,
  usePagination,
  useAsyncDebounce,
} from "react-table";
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
        disableSortBy: true,
      },
      {
        Header: "GitHub URL",
        accessor: "html_url",
        disableSortBy: true,
      },
      {
        id: "fork",
        Header: "Forked",
        accessor: (d) => d.fork.toString(),
        disableSortBy: true,
      },
      {
        Header: "Star Count",
        accessor: "stargazers_count",
        disableSortBy: true,
      },
      {
        Header: "Watchers Count",
        accessor: "watchers_count",
        disableSortBy: true,
      },
      {
        Header: "License",
        accessor: "license.name",
        disableSortBy: true,
      },
      {
        Header: "Language",
        accessor: "language",
        disableSortBy: true,
      },
      {
        Header: "Top 5 Contributors",
        accessor: "topcontributor",
        disableSortBy: true,
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

  function Table({ columns, data }) {
    const [filterInput, setFilterInput] = useState("");
    // Use the useTable Hook to send the columns and data to build the table
    const {
      getTableProps, // table props from react-table
      getTableBodyProps, // table body props from react-table
      headerGroups, // headerGroups, if your table has groupings
      prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
      setFilter,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0 },
      },
      useFilters,
      useSortBy,
      usePagination
    );

    const handleFilterChange = (e) => {
      const value = e.target.value || undefined;
      setFilter("name", value);
      setFilterInput(value);
    };

    /* 
        Render the UI for your table
        - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
      */
    return (
      <>
        <div>
          <input
            className="form-control"
            value={filterInput}
            onChange={handleFilterChange}
            placeholder={"Search name"}
          />
        </div>
        <br />
        <table
          className="table table-hover table-responsive"
          {...getTableProps()}
        >
          <thead className="thead-dark">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <ul className="pagination justify-content-center">
          <li
            className="page-item"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <button className="page-link">First</button>
          </li>
          <li
            className="page-item"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <button className="page-link">{"<"}</button>
          </li>
          <li
            className="page-item"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <button className="page-link">{">"}</button>
          </li>
          <li
            className="page-item"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <button className="page-link">Last</button>
          </li>
          <li>
            <button className="page-link">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </button>
          </li>
          <select
            className="form-control"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            style={{ width: "120px", height: "38px" }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </ul>
      </>
    );
  }

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

      {/* <Repocard repos={currentRepo} loading={loading} />
      <Pagination
        reposPerPage={reposPerPage}
        totalRepos={repos.length}
        paginate={paginate}
      /> */}

      <Table columns={columns} data={repos} filterable />
    </div>
  );
}

export default FetchData;
