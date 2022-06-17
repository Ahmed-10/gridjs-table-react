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
      }}
      columns={columns}
      search={search}
      pagination={{
        enabled: true,
        limit: paginationLimit,
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
