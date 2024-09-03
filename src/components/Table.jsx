import clsx from "clsx";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";
import Loader from "./Loader";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

export function Table({ id = "", columns, loading, tableData, empty, pagination, noDivider}) {
  const data = tableData ?? [];
  const [isMobile, setIsMobile] = useState(false);
  const [state, setState] = useState();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
console.log(data)
  return (
    <div
      className={clsx([
        "page-scroll relative overflow-y-hidden bg-white font-lexend",
      ])}
    >
      <div className="flex-1 overflow-hidden relative">
        {loading && (
          <div className="absolute top-0 w-full  z-10 text-center">
            <Loader type="bar" />
          </div>
        )}

        <div className="h-full w-full overflow-auto relative">
          {data.length > 0 ? (
            <div>
              <table className="table table-auto w-full border-collapse ">
                <thead className={`sticky top-0`}>
                  <tr>
                    {columns.map((col) => {
                      return (
                        <th
                          key={`${col.header}-head`}
                          className="text-[#A2A1A8] text-xs font-medium uppercase text-left px-6 py-3 whitespace-nowrap border-b  border-zp-line/30"
                        >
                          <span>{col.header}</span>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="px-4 mt-5 ">
                  {data?.map((_data, dataIndex) => (
                    <tr
                      key={dataIndex}
                      className={clsx(
                        "px-5",
                        "bg-white",
                        "text-[14px] font-normal hover:cursor-pointer transition-transform duration-100 hover:scale-105 hover:shadow-lg hover:ring-1 hover:ring-[#7152F3]",
                        noDivider
                          ? ""
                          : "border-b last:border-b-0 border-zp-line/30",
                      )}
                    >
                      {columns.map((col, colIndex) => {
                        const view = col.view(_data);
                        return (
                          <td
                            className={clsx(
                              "py-3 px-6 text-left min-h-[75px] text-[#16151C]"
                            )}
                          >
                            {view}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="page items-center justify-center my-10">
              {empty ?? "No Records To Display"}
            </div>
          )}
        </div>
      </div>

      {/* footer */}
      {pagination && (loading || data.length > 0) && (
        <div className="border-t border-zp-line h-12">
          {/* pagination */}
          <Pagination
            {...pagination}
            isLoading={loading}
            currentLength={data.length}
          />
        </div>
      )}
    </div>
  );
}

const Pagination = ({
  page = 1,
  pageSize = 1,
  totalRows = 0,
  setPage,
  setPageSize,
  currentLength,
  isLoading,
}) => {
  const pageStart = pageSize * (page - 1);
  const lastPage = Math.ceil(totalRows / pageSize);
  const [goToPage, setGoToPage] = useState(0);
  useDebounce(
    () => {
      if (goToPage > 0 && goToPage <= lastPage) setPage?.(goToPage);
    },
    1000,
    [goToPage]
  );
  return (
    <div className="flex items-center  h-full px-7 py-1 text-xs text-gm-blue-main">
      <div className="flex items-center gap-4">
        <span className="text-zp-placehold text-xs">Go to page:</span>
        <input
          className="border focus:border-zp-primary text-center border-gray-200 h-7 p-1 w-7 rounded-sm"
          value={goToPage}
          onChange={(e) => {
            const v = Number(e.target.value.replace(/\D/g, ""));
            if (Number.isFinite(v)) {
              setGoToPage(Math.min(lastPage, v));
            }
          }}
        />
      </div>
      <div className="ml-auto mr-16">
        <span className="">Rows per page:</span>
        <select
          className="border-0  font-medium w-12 ml-3 h-8 bg-transparent"
          value={pageSize}
          onChange={(e) => {
            setPageSize?.(+e.target.value);
          }}
        >
          {[10, 20, 25, 30, 40, 50, 100].map((size) => (
            <option key={size.toString()}>{size}</option>
          ))}
        </select>
      </div>
      <span className="text-xs text-zp-gray-400 mr-5">
        <span className="font-semibold text-zp-gray-600">
          {pageStart + 1} - {pageStart + currentLength}
        </span>{" "}
        &nbsp; of {totalRows} items
      </span>
      <Paginator
        page={page}
        pageSize={pageSize}
        loading={isLoading}
        currentLength={currentLength}
        setPage={setPage}
        totalRows={totalRows}
      />
    </div>
  );
};

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";
const pageNeighbours = 0;
const Paginator = ({
  page = 1,
  pageSize = 1,
  setPage,
  loading = false,
  totalRows = 0,
  currentLength,
}) => {
  const pageNumbers = useMemo(() => {
    const totalPages = totalRows ? Math.ceil(totalRows / pageSize) : 0;
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;
    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, page - pageNeighbours);
      const endPage = Math.min(totalPages - 1, page + pageNeighbours);

      let pages = numberRange(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);
      switch (true) {
        // handle: (1) ... {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = numberRange(
            startPage - spillOffset,
            startPage - 1
          );
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} ... (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = numberRange(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) ... {4 5} [6] {7 8} ... (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }
    return numberRange(1, totalPages);
  }, [page, totalRows, pageSize]);
  const getRemainingPageNums = (index) => {
    const lowerBound = Number(pageNumbers[index - 1]);
    const upperBound = Number(pageNumbers[index + 1]);
    return numberRange(lowerBound + 1, upperBound - 1);
  };
  const isActivePage = (p) => {
    return page === p;
  };
  const leftArrowDisabled = page === 1 || loading;

  const rightArrowDisabled = page * pageSize >= (totalRows ?? 1) || loading;

  const btnPrevClick = () => setPage?.(page - 1);

  const btnNextClick = () => setPage?.(page + 1);
  const classes = {
    paginator: "flex items-center text-sm",
    btnClass: "h-9 min-w-[2.25rem] focus:outline-none disabled:text-grey-100",
    btnNext: "inline-flex items-center justify-center",
    btnPrev: "inline-flex items-center justify-center",
    item: " h-9 min-w-[2.25rem] px-3 py-1 cursor-pointer text-gray-100",
    itemActive: "!text-green-100 px-4",
    dropDown: "relative inline-block [&>ul]:hover:visible",
    dropdownMenu: clsx(
      "invisible",
      "absolute rounded-md bottom-1 transform origin-center",
      "bg-white px-4 max-h-56 overflow-y-auto overflow-x-hidden w-full",
      "flex flex-col justify-center items-center",
      "text-gray-100 shadow"
    ),
    dropdownMenuItem: clsx(
      "hover:bg-gray-100 text-gray-100 rounded-md cursor-pointer px-3 py-2"
    ),
  };
  return (
    <div className={clsx(classes.paginator)}>
      <button
        title="Previous"
        onClick={btnPrevClick}
        disabled={leftArrowDisabled}
        className={clsx([
          classes.btnClass,
          classes.btnPrev,
          leftArrowDisabled
            ? "cursor-not-allowed text-gray-100"
            : "cursor-pointer text-zp-green",
        ])}
      >
        <MdOutlineKeyboardDoubleArrowLeft className="h-5 w-5" />
      </button>

      {pageNumbers.map((pageNum, index) => {
        const getPageNum = getRemainingPageNums(index);
        const isPageNum = isPageNumber(pageNum);
        if (isPageNum || getPageNum.length === 1) {
          return (
            <button
              disabled={loading}
              onClick={() =>
                setPage?.(Number(isPageNum ? pageNum : getPageNum[0]))
              }
              key={`table-paginator-item_${index}`}
              className={clsx(
                classes.item,
                classes.btnClass,
                isActivePage(isPageNum ? pageNum : getPageNum[0]) &&
                  classes.itemActive
              )}
            >
              {isPageNum ? pageNum : getPageNum[0]}
            </button>
          );
        }
        return (
          <div key={"item_" + index} className={clsx(classes.dropDown)}>
            <button className={clsx(classes.btnClass, classes.item)}>
              ...
            </button>
            <ul className={clsx(classes.dropdownMenu)}>
              {getRemainingPageNums(index).map(
                (otherPageNum, otherPageIndex) => (
                  <li
                    onClick={() => setPage?.(otherPageNum)}
                    key={`hellip${otherPageIndex}`}
                    className={clsx(classes.dropdownMenuItem)}
                  >
                    {otherPageNum}
                  </li>
                )
              )}
            </ul>
          </div>
        );
      })}

      <button
        title="Next"
        onClick={btnNextClick}
        disabled={rightArrowDisabled}
        className={clsx([
          classes.btnClass,
          classes.btnNext,
          rightArrowDisabled
            ? "cursor-not-allowed text-gray-100"
            : "cursor-pointer text-green-100",
        ])}
      >
        <MdOutlineKeyboardDoubleArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

const numberRange = (start, end) => {
  const numbers = [];
  for (let i = start; i <= end; i++) {
    numbers.push(i);
  }
  return numbers;
};
const isPageNumber = (pageNum) => {
  const allowed = [LEFT_PAGE, RIGHT_PAGE];
  return !allowed.includes(pageNum);
};
