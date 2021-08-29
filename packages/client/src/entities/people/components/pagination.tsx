import React from 'react';

interface Props {
  page: number;
  limit: number;
  onChange: (pageNumber: number) => void;
  totalItems: number;
}

// let's make it very simple
export const Pagination: React.FC<Props> = ({
  page,
  limit,
  totalItems,
  onChange,
}) => {
  const pageCount = Math.ceil(totalItems / limit) || 0;
  const pages = Array.from(Array(pageCount).keys());

  const isActive = (currPage: number) => {
    return currPage === page;
  };

  return (
    <div className="Pagination">
      <ul>
        {pages.map((currPage) => {
          const pageToRender = currPage + 1;
          return (
            <li key={pageToRender} onClick={() => onChange(currPage)}>
              {isActive(currPage) ? <b>{pageToRender}</b> : pageToRender}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
