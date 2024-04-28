import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import { SearchType } from "../../@types";
import Alert from "../Alert/Alert";

type FormsProps = {
  fetchWeather: (search: SearchType) => Promise<void>;
};

const Form = ({ fetchWeather }: FormsProps) => {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const [alert, setAlert] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(search).includes("")) {
      console.log("si hay campos vacios");
      setAlert("All the fields are requested");
      return;
    }
    fetchWeather(search);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert && <Alert> {alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">City :</label>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="City"
          value={search.city}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="country">Country</label>
        <select
          value={search.country}
          id="country"
          name="country"
          onChange={handleChange}
        >
          <option value="">-- Selected country</option>
          {countries.map((country) => (
            <option value={country.code} key={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input type="submit" value="Search Weather " className={styles.submit} />
    </form>
  );
};

export default Form;
