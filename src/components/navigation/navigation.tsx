import React from "react";
import NavItem from "../navItem/navItem";
import "./navigation.css";

type Props = {
  pathname?: string;
};

const Navigation = (props: Props) => {
  const { pathname } = props;

  return (
    <nav className="navigation">
      <NavItem href="/jobs" content="Поиск Вакансий" pathname={pathname} />
      <NavItem href="/favourites" content="Избранное" pathname={pathname} />
    </nav>
  );
};

export default Navigation;
