import React from "react";
import "./jobCard.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addNewFavorite, removeFavorite } from "../../redux/reducers/jobsSlice";
import { IVacancy } from "../../models/redux/jobs";
import { IRequestJob } from "../../models/redux/currentJob";
import classNames from "classnames";

type Props = {
  title: string | undefined;
  url: string;
  id?: number | undefined;
  payment: Record<string, number | string>;
  type_of_work: string | undefined;
  town: string | undefined;
  item: IVacancy | IRequestJob;
  styleType?: string;
};

const JobCard = (props: Props) => {
  const dispatch = useAppDispatch();
  const { title, url, town, type_of_work, id, item, styleType } = props;
  const { payment_from, payment_to, currency } = props?.payment;
  const { favorites } = useAppSelector((state) => state.jobs);
  const isFavorite = favorites?.find((fav: IVacancy) => fav.id === id);

  const changeFavorite = () => {
    if (!isFavorite) return dispatch(addNewFavorite(item as IVacancy));
    return dispatch(removeFavorite(item as IVacancy));
  };

  return (
    <div
      className={classNames("job-card", {
        "job-card_page": styleType === "page",
      })}
      data-elem={`vacancy-${id}`}
    >
      {styleType === "list" ? (
        <Link to={url} draggable={false} className="job-card__title">
          {title}
        </Link>
      ) : styleType === "page" ? (
        <h3 className="job-card__title_page">{title}</h3>
      ) : null}

      <span
        className={classNames("job-card__work-conditions", {
          "job-card__work-conditions_page": styleType === "page",
        })}
      >
        {+payment_from + +payment_to !== 0 ? (
          <strong>
            {payment_from !== 0 && payment_to === 0
              ? "з/п от " + payment_from + " " + currency
              : null}
            {payment_to !== 0 && payment_from === 0
              ? "з/п до " + payment_to + " " + currency
              : null}
            {payment_from !== 0 && payment_to !== 0
              ? "з/п " + payment_from + " - " + payment_to + " " + currency
              : null}
          </strong>
        ) : null}
        <img src="/src/assets/point.png" />
        <p className="">{type_of_work ? type_of_work : null}</p>
      </span>

      <span
        className={classNames("job-card__address", {
          "job-card__address_page": styleType === "page",
        })}
      >
        <img src="/src/assets/location.svg" /> <p>{town}</p>
      </span>
      <button
        className="job-card__btn"
        data-elem={`vacancy-${id}-shortlist-button`}
        onClick={(e) => {
          e.preventDefault();
          changeFavorite();
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.97183 1.70846C10.4382 0.933481 11.5618 0.933482 12.0282 1.70847L14.3586 5.58087C14.5262 5.85928 14.7995 6.05784 15.116 6.13116L19.5191 7.15091C20.4002 7.35499 20.7474 8.42356 20.1545 9.10661L17.1918 12.5196C16.9788 12.765 16.8744 13.0863 16.9025 13.41L17.2932 17.9127C17.3714 18.8138 16.4625 19.4742 15.6296 19.1214L11.4681 17.3583C11.1689 17.2316 10.8311 17.2316 10.5319 17.3583L6.37038 19.1214C5.53754 19.4742 4.62856 18.8138 4.70677 17.9127L5.09754 13.41C5.12563 13.0863 5.02124 12.765 4.80823 12.5196L1.8455 9.1066C1.25257 8.42356 1.59977 7.35499 2.48095 7.15091L6.88397 6.13116C7.20053 6.05784 7.47383 5.85928 7.64138 5.58087L9.97183 1.70846Z"
            stroke={!isFavorite ? "#ACADB9" : "#5e96fc"}
            fill={!isFavorite ? "none" : "#5e96fc"}
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default JobCard;
