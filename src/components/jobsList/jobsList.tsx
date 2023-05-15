import React from "react";
import "./jobsList.css";
import { useAppSelector } from "../../redux/hooks";
import JobCard from "../jobCard/jobCard";
import { IVacancy } from "../../models/redux/jobs";
import { useLocation } from "react-router-dom";
import Loader from "../loader";

const JobsList = () => {
  const vacancies = useAppSelector((state) => state.jobs.vacancies);
  const loading = useAppSelector((state) => state.jobs.loading);
  const { pathname } = useLocation();

  if (loading) return <Loader />;

  return (
    <div className="jobs-list">
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
          />
        );
      })}
    </div>
  );
};

export default JobsList;
