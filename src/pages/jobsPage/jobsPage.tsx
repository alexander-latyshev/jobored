import React, { useEffect, useState } from "react";
import "./jobsPage.css";
import JobsList from "../../components/jobsList/jobsList";
import { fetchJobs } from "../../redux/reducers/jobsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import FormSettings from "../../components/formSettings/formSettings";

const JobsPage = () => {
  const dispatch = useAppDispatch();
  const pageNumberJSON = JSON.parse(localStorage.getItem("page") || "1");
  const [activePage, setActivePage] = useState(pageNumberJSON);
  const { loading, formOptions } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    localStorage.setItem("page", activePage);
    dispatch(fetchJobs({ formOptions, page: activePage }));
  }, [activePage, formOptions]);

  return (
    <section className="jobs">
      {!loading ? <FormSettings /> : null}
      <JobsList activePage={activePage} setPage={setActivePage} />
    </section>
  );
};

export default JobsPage;
