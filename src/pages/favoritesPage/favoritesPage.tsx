import React from "react";
import "./favoritesPage.css";
import { useAppSelector } from "../../redux/hooks";
import JobCard from "../../components/jobCard/jobCard";
import { Link, useLocation } from "react-router-dom";
import { IVacancy } from "../../models/redux/jobs";
import emptyImg from "/src/assets/empty.png";

const FavoritesPage = () => {
  const { pathname } = useLocation();
  const favorites: IVacancy[] = useAppSelector((state) => state.jobs.favorites);

  return (
    <section className="favourites">
      {!favorites?.length ? (
        <div className="favourites-empty">
          <img src={emptyImg} className="favourites-empty__img" />
          <h1>Упс, здесь еще ничего нет!</h1>
          <Link to={"/jobs"} className="favourites-empty__btn">
            Поиск Вакансий
          </Link>
        </div>
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
