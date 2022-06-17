import React from "react";
import PropTypes from "prop-types";
import debouce from "lodash.debounce";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

export default function DataTable({
  columns,
  url,
  mapFunc,
  searchFields,
  sortColumns,
  paginationLimit,
}) {
  const [searchParam, setSearchParam] = React.useState("search");
  const [search, setSearch] = React.useState("");
  const handleSelectChange = (e) => {
    setSearchParam(e.target.value);
  };
  const handleSearchChange = (e) => {
    if (e.target.value !== "") setSearch(e.target.value);
    else setSearch("");
  };

  const getUrl = () => {
    if (search !== "") return `${url}?${searchParam}=${search}`;
    else return url;
  };

  const debouncedResults = React.useMemo(() => {
    return debouce(handleSearchChange, 1000);
  }, []);

  React.useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  return (
    <>
      <input type="text" placeholder="search" onChange={debouncedResults} />
      <span>in</span>
      <select onChange={handleSelectChange}>
        <option value="search" default>
          all
        </option>
        {searchFields.map((field) => (
          <option key={field.value} value={field.value}>
            {field.label}
          </option>
        ))}
      </select>
      <span>field/s</span>
      <Grid
        server={{
          url: getUrl(),
          then: (data) => data.data.map((user) => mapFunc(user)),
          total: (data) => data.count,
        }}
        columns={columns}
        search={false}
        sort={{
          multiColumn: false,
          server: {
            url: (prev, columns) => {
              if (!columns.length) return prev;

              const col = columns[0];
              const dir = col.direction === 1 ? "asc" : "desc";
              let colName = sortColumns[col.index];
              if (prev.includes("?"))
                return `${prev}&sortBy=${colName}&order=${dir}`;
              else return `${prev}?sortBy=${colName}&order=${dir}`;
            }
          }
        }}
        pagination={{
          enabled: true,
          limit: paginationLimit,
          server: {
            url: (prev, page, limit) => {
              if (prev.includes("?"))
                return `${prev}&page=${page + 1}&limit=${limit}`;
              else return `${prev}?page=${page + 1}&limit=${limit}`;
            }
          },
        }}
      />
    </>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  url: PropTypes.string.isRequired,
  mapFunc: PropTypes.func.isRequired,
  search: PropTypes.bool,
  paginationLimit: PropTypes.number,
};
