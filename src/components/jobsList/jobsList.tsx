import React, { SetStateAction, Dispatch } from "react";
import "./jobsList.css";
import { useAppSelector } from "../../redux/hooks";
import JobCard from "../jobCard/jobCard";
import { IVacancy } from "../../models/redux/jobs";
import { useLocation } from "react-router-dom";
import Loader from "../loader";
import Pagination from "../pagination/pagination";
import InputSearch from "../inputSearch/inputSearch";

type Props = {
  activePage: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const JobsList = (props: Props) => {
  const { vacancies, totalPages, loading } = useAppSelector(
    (state) => state.jobs
  );
  const { pathname } = useLocation();
  const { activePage, setPage } = props;

  if (loading) return <Loader />;

  return (
    <div className="jobs-list">
      <InputSearch />
      {vacancies?.map((vacancy: IVacancy, idx: number) => {
        return (
          <JobCard
            id={vacancy.id}
            title={vacancy.profession}
            key={idx}
            url={pathname + "/" + vacancy.id}
            payment={{
              payment_from: vacancy.payment_from,
              payment_to: vacancy.payment_to,
              currency: vacancy.currency,
            }}
            type_of_work={vacancy.type_of_work.title}
            town={vacancy.town.title}
            item={vacancy}
            styleType="list"
          />
        );
      })}
      <Pagination
        total={totalPages}
        activePage={activePage}
        setPage={setPage}
      />
    </div>
  );
};

export default JobsList;
