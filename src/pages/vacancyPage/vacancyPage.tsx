import React, { useEffect } from "react";
import "./vacancyPage.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router-dom";
import { fetchJob } from "../../redux/reducers/jobSlice";
import Loader from "../../components/loader";
import JobCard from "../../components/jobCard/jobCard";
import { Interweave } from "interweave";

const VacancyPage = () => {
  const dispatch = useAppDispatch();
  const { jobID } = useParams();
  const { vacancy, loading } = useAppSelector((state) => state.currentJob);

  useEffect(() => {
    dispatch(fetchJob(jobID));
  }, []);

  if (loading || vacancy === null) return <Loader />;
  console.log(vacancy);

  return (
    <section className="vacancy">
      <JobCard
        id={vacancy?.id}
        title={vacancy?.profession}
        payment={{
          payment_from: vacancy?.payment_from,
          payment_to: vacancy?.payment_to,
          currency: vacancy?.currency,
        }}
        type_of_work={vacancy?.type_of_work?.title}
        town={vacancy?.town.title}
        item={vacancy}
        styleType="page"
        url=""
      />
      <Interweave
        content={vacancy.vacancyRichText}
        className="vacancy-description"
      />
    </section>
  );
};

export default VacancyPage;
