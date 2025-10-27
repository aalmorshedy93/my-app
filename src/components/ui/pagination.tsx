import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
  )
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />
);
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<typeof Link>;

const PaginationLink = ({ className, isActive, href, ...props }: PaginationLinkProps) => {
  const classes = cn(
    // ensure numeric page links are clearly visible regardless of theme
    'min-w-[36px] h-9 inline-flex items-center justify-center px-3 rounded',
    isActive
      ? 'bg-sky-600 text-white shadow'
      : 'bg-white text-sky-700 border border-gray-200 hover:bg-sky-50',
    className
  );

  // Use Next.js Link for client-side navigation when an href is provided
  if (href) {
    return (
      // Link supports className and will render an anchor; spread remaining props to the Link
      <Link
        href={href}
        className={classes}
        aria-current={isActive ? 'page' : undefined}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      className={classes}
      {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {props.children}
    </a>
  );
};
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn(
      'gap-1 pl-2.5 text-sky-600 hover:text-sky-800 hover:bg-sky-50 border border-transparent hover:border-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-200',
      className
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn(
      'gap-1 pr-2.5 text-sky-600 hover:text-sky-800 hover:bg-sky-50 border border-transparent hover:border-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-200',
      className
    )}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
