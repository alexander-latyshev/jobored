import React, { SetStateAction, Dispatch } from "react";
import { Pagination as MantinePagination } from "@mantine/core";
import { usePaginationStyles } from "./pagination.style.ts";

type Props = {
  total: number;
  activePage: number;
  setPage: Dispatch<SetStateAction<number>>;
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
      classNames={{ control: classes.control, dots: classes.dots }}
    />
  );
};

export default Pagination;
