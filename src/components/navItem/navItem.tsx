import React, { useEffect, useState } from "react";
import "./navItem.css";
import { Link } from "react-router-dom";
import { RxStar, RxBackpack } from "react-icons/rx";

type Props = {
  href: string;
  content: string;
  pathname?: string;
};

const categoriesIcons: Record<string, React.JSX.Element> = {
  jobs: <RxBackpack size={20} />,
  favourites: <RxStar size={20} />,
};

function getViewport() {
  const { innerHeight: height, innerWidth: width } = window;
  return { height, width };
}

const NavItem = (props: Props) => {
  const { content, pathname } = props;
  const [viewport, setViewport] = useState(getViewport());
  const href = props.href.split("/")[1];

  useEffect(() => {
    function handleViewportResize() {
      setViewport(getViewport());
    }

    window.addEventListener("resize", handleViewportResize);
    return () => window.removeEventListener("resize", handleViewportResize);
  }, [viewport.width || viewport.height]);

  return (
    <Link
      to={href}
      className={pathname === href ? "nav-item__active" : "nav-item"}
    >
      {viewport.width < 768 ? categoriesIcons[`${href}`] : content}
    </Link>
  );
};

export default NavItem;
