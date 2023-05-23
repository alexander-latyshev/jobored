import React, { useState, useEffect } from "react";
import { Image, TextInput, Button } from "@mantine/core";
import { useSearchStyles } from "./inputSearch.style.ts";
import searchIcon from "/src/assets/search.svg";
import { useAppDispatch } from "../../redux/hooks.ts";
import { setFormOptions } from "../../redux/reducers/jobsSlice.ts";

const InputSearch = () => {
  const { classes } = useSearchStyles();
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const form = JSON.parse(localStorage.getItem("form") || "");
    localStorage.setItem("form", JSON.stringify({ ...form, keyword: value }));
  }, [value]);

  return (
    <TextInput
      placeholder="Введите название вакансии"
      classNames={{
        root: classes.root,
        wrapper: classes.wrapper,
        input: classes.input,
        icon: classes.icon,
        rightSection: classes.rightSection,
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      icon={<Image src={searchIcon} style={{ width: 16 }} />}
      data-elem="search-input"
      rightSection={
        <Button
          data-elem="search-button"
          className={classes.button}
          onClick={() => {
            dispatch(
              setFormOptions(JSON.parse(localStorage.getItem("form") || ""))
            );
          }}
        >
          Поиск
        </Button>
      }
    />
  );
};

export default InputSearch;
