import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { Button, NumberInput, Select } from "@mantine/core";
import "./formSettings.css";
import {
  fetchCatalogues,
  setFormOptions,
} from "../../redux/reducers/jobsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ICatalogue } from "../../models/redux/catalogues";
import { useFormStyles } from "./formSetting.styles";

type IOption = {
  label: string;
  value: string;
};

export interface IFormValues {
  industry?: string | null | undefined;
  payment_from?: number | "" | undefined;
  payment_to?: number | "" | undefined;
}

const form: IFormValues = {
  industry: "",
  payment_from: undefined,
  payment_to: undefined,
};

const FormSettings = () => {
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<IOption[]>([]);
  const [formValues, setFormValues] = useState<IFormValues>(form);
  const { formOptions } = useAppSelector((state) => state.jobs);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { catalogues } = useAppSelector((state) => state.jobs);
  const { classes } = useFormStyles();

  useEffect(() => {
    dispatch(fetchCatalogues());
  }, []);

  useEffect(() => {
    setOptions(() => {
      return catalogues?.map((item: ICatalogue) => ({
        value: item.key.toString(),
        label: item.title_rus,
      }));
    });

    localStorage.setItem("form", JSON.stringify(formOptions));
  }, [catalogues]);

  useEffect(() => {
    const formJSON = JSON.parse(localStorage.getItem("form") || "");
    localStorage.setItem(
      "form",
      JSON.stringify({ ...formJSON, ...formValues })
    );
  }, [formValues]);

  const resetValues = () => {
    localStorage.setItem("form", JSON.stringify({}));
    dispatch(setFormOptions(form));
  };

  return (
    <div className="form-settings">
      <form>
        <div className="form-settings__title">
          <h1>Фильтры</h1>
          <button
            className="form-settings__reset-btn"
            onClick={() => resetValues()}
          >
            Сбросить все <CgClose height={16} width={16} />
          </button>
        </div>

        <Select
          label="Отрасль"
          data-elem="industry-select"
          placeholder="Выберете отрасль"
          data={options}
          onDropdownOpen={() => setIsOpen(true)}
          onDropdownClose={() => setIsOpen(false)}
          value={formValues.industry}
          classNames={{ input: classes.input }}
          onChange={(e) => setFormValues({ ...formValues, industry: e })}
          labelProps={{ className: classes.labelIndustry }}
          rightSection={
            <svg
              width="16"
              height="8"
              viewBox="0 0 16 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={
                isOpen
                  ? "form-settings__dropdown-btn_active"
                  : "form-settings__dropdown-btn"
              }
            >
              <path
                d="M1 0.999999L7.21905 6.33061C7.66844 6.7158 8.33156 6.7158 8.78095 6.33061L15 1"
                stroke="#ACADB9"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          }
        />
        <NumberInput
          label="Оклад"
          placeholder="От"
          step={1000}
          min={0}
          value={formValues.payment_from ? formValues.payment_from : undefined}
          onChange={(e) => setFormValues({ ...formValues, payment_from: e })}
          data-elem="salary-from-input"
          labelProps={{ className: classes.label }}
        />
        <NumberInput
          placeholder="До"
          step={1000}
          min={0}
          value={formValues.payment_to ? formValues.payment_to : undefined}
          onChange={(e) => setFormValues({ ...formValues, payment_to: e })}
          labelProps={{ className: classes.label }}
          styles={{ wrapper: { marginTop: 8 } }}
          data-elem="salary-to-input"
        />
        <Button
          classNames={{ root: classes.button }}
          data-elem="search-button"
          styles={{ root: { marginTop: 20 } }}
          onClick={() => {
            dispatch(
              setFormOptions(JSON.parse(localStorage.getItem("form") || ""))
            );
          }}
        >
          Применить
        </Button>
      </form>
    </div>
  );
};

export default FormSettings;
