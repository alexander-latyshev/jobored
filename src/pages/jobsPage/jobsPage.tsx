import React, { useEffect } from "react";
import "./jobsPage.css";
import JobsList from "../../components/jobsList/jobsList";
import { fetchJobs } from "../../redux/reducers/jobsSlice";
import { useAppDispatch } from "../../redux/hooks";
// import InputSearch from "../../components/inputSearch/inputSearch";

const JobsPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchJobs(5));
  }, []);

  return (
    <section className="jobs">
      {/* <InputSearch /> */}
      <JobsList />
    </section>
  );
};

export default JobsPage;
