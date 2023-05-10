import React from "react";
import { useLocation } from "react-router-dom";
import { ILocation } from "../../models/location";
import Navigation from "../navigation/navigation";
import logo from "../../assets/logo.png";
import "./header.css";

const Header = () => {
  const location: ILocation = useLocation();
  const pathname: string = location.pathname.split("/")[1];

  return (
    <header className="header">
      <div className="header__wrapper">
        <span className="header__title">
          <img src={logo} />
          <h1>Jobored</h1>
        </span>

        <Navigation pathname={pathname} />
      </div>
    </header>
  );
};

export default Header;
