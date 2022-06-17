import PropTypes from "prop-types";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

export default function DataTable({
  columns,
  url,
  mapFunc,
  search,
  paginationLimit,
}) {
  return (
    <Grid
      server={{
        url: url,
        then: (data) => data.map((user) => mapFunc(user)),
        // total takes a function that returns the total number of items
        // 80 is the number of fake users I have
        total: (data) => 80,
      }}
      columns={columns}
      search={search}
      pagination={{
        enabled: true,
        limit: paginationLimit,
        server: {
          url: (prev, page, limit) => {
            return `${prev}?page=${page + 1}&limit=${limit}`;
          }
        }
      }}
    />
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  url: PropTypes.string.isRequired,
  mapFunc: PropTypes.func.isRequired,
  search: PropTypes.bool,
  paginationLimit: PropTypes.number,
};
