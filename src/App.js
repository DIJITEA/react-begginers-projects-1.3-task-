import React, { useEffect, useState } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrence] = useState("RUB");
  const [toCurrence, setToCurrence] = useState("USD");
  const [rates, setRates] = useState({});
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const RUB = {
    CharCode: "RUB",
    ID: "RUB1",
    Name: "Рубль",
    Nominal: 1,
    NumCode: "000",
    Previous: 1,
    Value: 1,
  };

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((res) => res.json())
      .then((json) => {
        setRates({ ...json.Valute, RUB });
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить данные");
      });
  }, []);
  console.log(rates);
  const onChangeFromPice = (value) => {
    const convertNominalToCurrence =
      rates[toCurrence].Value / rates[toCurrence].Nominal;
    const convertNominalFromCurrence =
      rates[fromCurrency].Value / rates[fromCurrency].Nominal;
    const price = value / convertNominalToCurrence;
    const result = price * convertNominalFromCurrence;

    setFromPrice(value);
    setToPrice(result);
  };
  const onChangeToPice = (value) => {
    setToPrice(value);
  };

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrence}
        onChangeValue={onChangeFromPice}
      />
      <Block
        value={toPrice}
        currency={toCurrence}
        onChangeCurrency={setToCurrence}
        onChangeValue={onChangeToPice}
      />
    </div>
  );
}

export default App;
