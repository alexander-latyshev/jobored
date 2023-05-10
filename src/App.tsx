import React, { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { passwordAuth } from "./redux/reducers/authSlice.ts";
import Header from "./components/header/header.tsx";
import Main from "./components/main/main.tsx";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(passwordAuth());
  }, []);

  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default App;
