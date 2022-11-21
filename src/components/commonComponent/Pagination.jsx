const _ = require("underscore");

export const Pagination = (props) => {
  const { itemsCounts, pageSize, onPageChange } = props;
  const pageCount = Math.ceil(itemsCounts / pageSize);
  if (pageCount === 1) return;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav aria-label="...">
      <ul
        className="pagination pagination-l"
        style={{ justifyContent: "center" }}
      >
        {pages.map((page) => (
          <li
            className="page-item active"
            aria-current="page"
            key={page}
            style={{ margin: "2px" }}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
