import React, { SetStateAction, Dispatch } from "react";
import { Pagination as MantinePagination } from "@mantine/core";
import { usePaginationStyles } from "./pagination.style";

type Props = {
  total: number;
  activePage: number;
  setPage: Dispatch<SetStateAction<number>>;
};

type PaginationStyles = {
  [key: string]: Record<string, string>;
};

const styles: PaginationStyles = {
  dots: { display: "none" },
};

const Pagination = (props: Props) => {
  const { total, activePage, setPage } = props;
  const { classes } = usePaginationStyles();

  return (
    <MantinePagination
      total={total}
      value={activePage}
      onChange={(e) => setPage(e)}
      boundaries={0}
      siblings={1}
      mt={50}
      mb={50}
      styles={styles}
      classNames={{ control: classes.dots }}
    />
  );
};

export default Pagination;
