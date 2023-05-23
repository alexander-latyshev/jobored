import React, { useEffect } from "react";
import Header from "./components/header/header.tsx";
import Main from "./components/main/main.tsx";
import { useAppDispatch } from "./redux/hooks.ts";
import { passwordAuth } from "./redux/reducers/authSlice.ts";

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
