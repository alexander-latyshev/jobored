import { IFormOptions } from "../models/redux/jobs";

export function getQueryParams(form: IFormOptions) {
  const keys: string[] = Object.keys(form);
  const values: string[] | undefined[] = Object.values(form);
  const queryParams = values
    ?.map((value, index) => (value ? `${keys[index]}=${value}` : value))
    .filter((value) => value);

  return queryParams.join("&");
}
export default getQueryParams;
