import React from 'react';
import '../styles/pagination.css';

const Pagination = ({
  skip = 0,
  take = 10,
  total = 0,
  onPageChange = () => {}
}) => {
  const validTake = Number(take) || 10;
  const validSkip = Number(skip) || 0;
  const totalPages = Math.max(1, Math.ceil(total / validTake));
  const currentPage = Math.floor(validSkip / validTake) + 1;

  const goToPage = (page) => {
    const newSkip = (page - 1) * validTake;
    onPageChange(newSkip, validTake);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        &laquo;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`page-btn ${page === currentPage ? 'active' : ''}`}
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;