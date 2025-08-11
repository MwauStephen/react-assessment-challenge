"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Helper to create a range of page numbers
  const createPageRange = () => {
    const pages: (number | string)[] = [];
    const delta = 2; // how many pages to show around current 

    // Always include the first page
    pages.push(1);

    // If the current page is far from the start, add ellipsis
    if (currentPage - delta > 2) {
      pages.push("...");
    }

    // Pages around current
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    // If the current page is far from the end, add ellipsis
    if (currentPage + delta < totalPages - 1) {
      pages.push("...");
    }

    // Always include the last page if > 1
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = createPageRange();

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>

      {pages.map((page, idx) =>
        typeof page === "string" ? (
          <span key={idx} className="px-3 py-1">
            {page}
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${currentPage === page
                ? "bg-red-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
              }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 cursor-pointer bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
