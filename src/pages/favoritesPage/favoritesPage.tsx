import React from "react";
import "./favoritesPage.css";
import { useAppSelector } from "../../redux/hooks";
import JobCard from "../../components/jobCard/jobCard";
import { useLocation } from "react-router-dom";
import { IVacancy } from "../../models/redux/jobs";

const FavoritesPage = () => {
  const { pathname } = useLocation();
  const favorites: IVacancy[] = useAppSelector((state) => state.jobs.favorites);

  return (
    <section className="favourites">
      {!favorites?.length ? (
        <h1>Empty</h1>
      ) : (
        favorites?.map((fav: IVacancy, idx: number) => {
          return (
            <JobCard
              id={fav.id}
              title={fav.profession}
              key={idx}
              url={pathname + "/" + fav.id}
              payment={{
                payment_from: fav.payment_from,
                payment_to: fav.payment_to,
                currency: fav.currency,
              }}
              type_of_work={fav.type_of_work.title}
              town={fav.town.title}
              item={fav}
              styleType="list"
            />
          );
        })
      )}
    </section>
  );
};

export default FavoritesPage;
