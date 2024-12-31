import { PaginationResult } from '@/domain/types';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shadcnui/pagination';

export const EventsPagination = async ({
  paginationResult,
}: {
  paginationResult: PaginationResult;
}) => {
  // Url path example: /events?page=4
  const total = paginationResult.totalPages;
  const current = paginationResult.currentPage;
  const previous = current - 1;
  const next = current + 1;

  return (
    <Pagination>
      <PaginationContent>
        {current > 1 ? (
          <>
            <PaginationItem>
              <PaginationPrevious href={`/page/${previous}`} />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href={`/page/${previous}`}>
                {previous}
              </PaginationLink>
            </PaginationItem>
          </>
        ) : null}

        <PaginationItem>
          <PaginationLink href={`/page/${current}`} isActive>
            {current}
          </PaginationLink>
        </PaginationItem>

        {current < total ? (
          <>
            <PaginationItem>
              <PaginationLink href={`/page/${next}`}>{next}</PaginationLink>
            </PaginationItem>

            {current === 1 ? (
              <PaginationItem>
                <PaginationLink href={`/page/${next + 1}`}>
                  {next + 1}
                </PaginationLink>
              </PaginationItem>
            ) : null}

            <PaginationItem>
              <PaginationNext href={`/page/${next}`} />
            </PaginationItem>
          </>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};
