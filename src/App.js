import React, { useEffect, useRef, useState } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrence] = useState("RUB");
  const [toCurrence, setToCurrence] = useState("USD");
  // const [ratesRef.current, setratesRef.current] = useState({});
  const ratesRef = useRef({})
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

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
        // setratesRef.current({ ...json.Valute, RUB });
        ratesRef.current = { ...json.Valute, RUB }
        onChangeToPice(1)
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить данные");
      });
  }, []);

  const onChangeFromPice = (value) => {
    const convertNominalToCurrence =
      ratesRef.current[toCurrence].Value / ratesRef.current[toCurrence].Nominal;
    const convertNominalFromCurrence =
      ratesRef.current[fromCurrency].Value / ratesRef.current[fromCurrency].Nominal;
    const price = value / convertNominalToCurrence;
    const result = price * convertNominalFromCurrence;

    setFromPrice(value);
    setToPrice(result.toFixed(3));
  };
  const onChangeToPice = (value) => {
    const convertNominalToCurrence =
      ratesRef.current[toCurrence].Value / ratesRef.current[toCurrence].Nominal;
    const convertNominalFromCurrence =
      ratesRef.current[fromCurrency].Value / ratesRef.current[fromCurrency].Nominal;
    const result =
      (convertNominalToCurrence / convertNominalFromCurrence) * value;

    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  useEffect(() => {
    if (Object.keys(ratesRef.current).length !== 0) onChangeFromPice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    if (Object.keys(ratesRef.current).length !== 0) onChangeToPice(toPrice);
  }, [toCurrence]);

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
