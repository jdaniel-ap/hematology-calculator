import React, { useState, useEffect } from "react";
import { db } from '../services'

export default function InputBox({
  name,
  nameValue,
  lengthOf,
  unit,
  age,
  hemoValues,
  setHemoValue,
}) {
  const [value, setValue] = useState({ nameValue: undefined });
  const [data, setData] = useState();
  const [response, setResponse] = useState(undefined);
  const [inputName, setInputName] = useState("");
  const [level, setLevel] = useState("");

  const getData = async () => {
   const querySnapShot = await db.collection('bloodValues').get();
   querySnapShot.forEach(doc => {
      setData(doc.data());
   })
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    if (inputName.length <= 0) {
      return;
    }

    function callCalculeFunction(key) {
      const dataType = data[inputName];
      const dataTypeNumber = value[inputName];
      const group = dataType.findIndex((element) => element.group === +age);
      const index = dataType[group][key].findIndex(
        (element) =>
          dataTypeNumber >= element.minValue &&
          dataTypeNumber <= element.maxValue
      );

      setResponse(() =>
        !dataType[group][key][index] ? null : dataType[group][key][index].type
      );
      setLevel(() => !dataType[group][key][index] ? null : dataType[group][key][index].level);
    }

    callCalculeFunction(inputName);
  }, [age, data, inputName, value]);

  function setType({ target }) {
    const userData = target.value;
    const dataName = target.name;
    setInputName(dataName);
    setValue({ [inputName]: userData });
    if (inputName === "hemoglobine") setHemoValue(target.value);
  }

  return (
    <div className="input-box">
      <span>
        {name}
        {"\n"}
      </span>
      <input
        type="text"
        placeholder={unit}
        pattern="[0-9]*"
        name={nameValue}
        maxLength={lengthOf}
        onChange={(e) => setType(e)}
      />
      <span className={`${response ? "box-result" : null} ${level}`}>{response}</span>
        <span className={`${response ? "box-result" : null} ${inputName === "hematocrite" &&
          value.hematocrite <= hemoValues.min &&
          value.hematocrite.length > 0
            ? "low"
            : inputName === "hematocrite" && value.hematocrite >= hemoValues.max
            ? "high"
            : null}`}>
          {inputName === "hematocrite" &&
          value.hematocrite <= hemoValues.min &&
          value.hematocrite.length > 0
            ? "Hemodisolucion"
            : inputName === "hematocrite" && value.hematocrite >= hemoValues.max
            ? "Hemoconcentracion"
            : null}
        </span>
    </div>
  );
}
