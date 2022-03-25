import Link from "next/link";
import React from "react";

export default function Pagination({ page, lastPage }) {
  return (
    <>
      {page > 1 && (
        <Link href={`events?page=${page - 1}`}>
          <a className="btn-secondary">Pervious</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`events?page=${page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </>
  );
}
