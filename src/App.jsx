import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import styles from "./Weather.module.less";

function App() {
  const [searchvalue, setSearchvalue] = useState();
  const [clima, setClima] = useState(null);
  const [cidadeBuscada, setCidadeBuscada] = useState("");
  const API_KEY = process.env.REACT_APP_API_KEY;

  const buscarClima = () => {
    const cidade = searchvalue || "";
    setCidadeBuscada(cidade);
  };

  const clear = () => {
    setClima(null);
    setSearchvalue("");
  };

  const capitais = [
    "Rio de Janeiro",
    "São Paulo",
    "Belo Horizonte",
    "Brasília",
    "Belém",
    "Salvador",
    "Curitiba",
    "Fortaleza",
    "Manaus",
    "João Pessoa",
  ];

  const [climasCapitais, setClimasCapitais] = useState([]);

  useEffect(() => {
    const fetchCapitais = async () => {
      try {
        const responses = await Promise.all(
          capitais.map((cidade) =>
            axios.get("https://api.weatherapi.com/v1/forecast.json", {
              params: {
                key: API_KEY,
                q: cidade,
                days: 1,
                lang: "pt",
              },
            })
          )
        );

        const dadosClima = responses.map((res) => ({
          cidade: res.data.location.name,
          min: res.data.forecast.forecastday[0].day.mintemp_c,
          max: res.data.forecast.forecastday[0].day.maxtemp_c,
        }));

        setClimasCapitais(dadosClima);
      } catch (err) {
        console.error("Erro ao buscar clima das capitais:", err.message);
      }
    };

    fetchCapitais();
  }, []);

  useEffect(() => {
    axios
      .get("https://api.weatherapi.com/v1/forecast.json", {
        params: {
          key: API_KEY,
          q: cidadeBuscada,
          lang: "pt",
          days: 5,
        },
      })
      .then((response) => {
        setClima(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar clima:", error.message);
      });
  }, [cidadeBuscada]);

  const primeiraMetade = climasCapitais.slice(0, 5);
  const segundaMetade = climasCapitais.slice(5, 10);

  return (
    <div className={styles.container}>
      <h1
        className={`${styles.container__title} ${
          clima ? styles["container__title--small"] : ""
        }`}
      >
        Previsão do tempo
      </h1>
      {clima && (
        <div className={styles.weather}>
          <div className={styles.weather__location}>
            {clima.location.name}, {clima.location.region} -{" "}
            {clima.location.country}
            <button className={styles.weather__buttonclear} onClick={clear}>
              x
            </button>
          </div>
          <div className={styles.weather__conditioncontainer}>
            <div className={styles.weather__temperature}>
              <strong>{Math.round(clima.current.temp_c)}°C</strong>
            </div>
            <div className={styles.weather__condition}>
              {clima.current.condition.text}
            </div>
          </div>
          <div className={styles.weather__currentforecast}>
            <div className={styles.weather__tempcontainer}>
              <div className={styles.weather__min}>
                <p className={styles.weather__seta}>↑</p>
                <strong className={styles.weather__content}>
                  {Math.round(clima.forecast.forecastday[0].day.mintemp_c)}º
                </strong>
              </div>
              <div className={styles.weather__max}>
                <p className={styles.weather__seta}>↓</p>
                <strong className={styles.weather__content}>
                  {Math.round(clima.forecast.forecastday[0].day.maxtemp_c)}º
                </strong>
              </div>
            </div>
            <div className={styles.weather__detailsItem}>
              <span>Sensação </span>
              <strong>{Math.round(clima.current.feelslike_c)}°C</strong>
            </div>
            <div className={styles.weather__detailsItem}>
              <span>Vento </span>
              <strong>{clima.current.wind_kph} km/h</strong>
            </div>
            <div className={styles.weather__detailsItem}>
              <span>Umidade </span>
              <strong>{clima.current.humidity}%</strong>
            </div>
          </div>
          {clima && (
            <div className={styles.forecastBar}>
              {clima.forecast.forecastday.slice(1).map((day, index) => (
                <div key={index} className={styles.forecastItem}>
                  <div>
                    {new Date(day.date).toLocaleDateString("pt-BR", {
                      weekday: "short",
                    })}
                  </div>
                  <div className={styles.forecastItem__temp}>
                    <p className={styles.minTemp}>
                      {Math.round(day.day.mintemp_c)}°
                    </p>
                    <p className={styles.maxTemp}>
                      {" "}
                      {Math.round(day.day.maxtemp_c)}°
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={styles.inputcontainer}>
        <input
          value={searchvalue}
          onChange={(e) => setSearchvalue(e.target.value)}
          type="text"
          placeholder="Insira aqui o nome da cidade."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              buscarClima();
            }
          }}
        />
        <button onClick={buscarClima}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      <div className={styles.line}></div>

      <div className={styles.examples}>
        <h2 className={styles.examples__title}>Capitais</h2>
        <div className={styles.tableWrapper}>
          <table
            className={`${styles.examples__container} ${styles.desktopOnly}`}
          >
            <thead>
              <tr>
                <th style={{ width: "50px" }}>Mín</th>
                <th style={{ width: "50px" }}>Máx</th>
                <th style={{ width: "200px" }}></th>
                <th style={{ width: "5px" }}></th>
                <th style={{ width: "50px" }}>Mín</th>
                <th style={{ width: "50px" }}>Máx</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3, 4].map((i) => (
                <tr key={i}>
                  <td style={{ width: "50px" }}>
                    {primeiraMetade[i]
                      ? Math.round(primeiraMetade[i].min) + "°"
                      : ""}
                  </td>
                  <td style={{ width: "50px" }}>
                    {primeiraMetade[i]
                      ? Math.round(primeiraMetade[i].max) + "°"
                      : ""}
                  </td>
                  <td style={{ width: "200px" }}>
                    {primeiraMetade[i] && (
                      <button
                        onClick={() => {
                          setCidadeBuscada(primeiraMetade[i].cidade);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        {primeiraMetade[i].cidade}
                      </button>
                    )}
                  </td>

                  <td></td>

                  <td style={{ width: "50px" }}>
                    {segundaMetade[i]
                      ? Math.round(segundaMetade[i].min) + "°"
                      : ""}
                  </td>
                  <td style={{ width: "50px" }}>
                    {segundaMetade[i]
                      ? Math.round(segundaMetade[i].max) + "°"
                      : ""}
                  </td>
                  <td style={{ width: "200px" }}>
                    {segundaMetade[i] && (
                      <button
                        onClick={() => {
                          setCidadeBuscada(segundaMetade[i].cidade);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        {segundaMetade[i].cidade}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table
            className={`${styles.examples__container} ${styles.mobileOnly}`}
          >
            <thead>
              <tr>
                <th style={{ width: "50px" }}>Mín</th>
                <th style={{ width: "50px" }}>Máx</th>
              </tr>
            </thead>
            <tbody>
              {climasCapitais.map((item, index) => (
                <tr key={index}>
                  <td style={{ width: "50px" }}>{Math.round(item.min)}°</td>
                  <td style={{ width: "50px" }}>{Math.round(item.max)}°</td>
                  <td>
                    <button
                      onClick={() => {
                        setCidadeBuscada(item.cidade);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      {item.cidade}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
