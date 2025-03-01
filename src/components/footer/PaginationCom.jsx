import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { info } from "@/json/laptops.json";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PaginationCom({ className }) {
  const [searchParams] = useSearchParams();
  const [isDisabled, setIsDisabled] = useState({
    prev: true,
    next: true,
  });
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );
  const navigate = useNavigate();
  const { pages } = info;

  useEffect(() => {
    if (currentPage !== 1) navigate(`?page=${currentPage}`, { replace: true });
    else navigate("?");

    setIsDisabled({
      prev: currentPage === 1,
      next: currentPage === pages,
    });
  }, [currentPage, navigate, pages]);

  const handleNextPage = () => {
    if (currentPage < pages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationPrevious
          className="cursor-pointer"
          disabled={isDisabled.prev}
          onClick={handlePrevPage}
        />
        <PaginationItem>
          {Array.from({ length: pages }, (_, i) => (
            <PaginationLink
              key={i}
              className={`cursor-pointer ${
                currentPage === i + 1 ? "bg-secondary" : ""
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </PaginationLink>
          ))}
        </PaginationItem>
        <PaginationNext
          className="cursor-pointer"
          disabled={isDisabled.next}
          onClick={handleNextPage}
        />
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationCom;
