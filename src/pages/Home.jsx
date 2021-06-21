import React, { useState } from 'react';
// import { db } from '../services'
import InputBox from '../components/InputBox';
import InputCheckBox from '../components/InputCheckBox';
import { inputValues, checkboxAge } from '../data';

function Home() {
  const [age, setAge] = useState();
  const [hemoValue, setHemoValue] = useState();
  const minHemo = hemoValue * 2.7;
  const maxHemo = hemoValue * 3.3;

  // useEffect(() => {
  //  const sendInfo = async () => {
  //   await db.collection('bloodValues').doc().set(data);
  //   console.log('added');
  // }
  // sendInfo();
  // }, [])
  return (
    <div>
      <p>Calculadora Hematologica</p>
      <div>
        <select className='checkbox-container' onChange={({ target }) => setAge(target.value)}>
          {checkboxAge.map(({ title, value }) => (
            <InputCheckBox 
              title={title}
              defaultValue={value}
              ageFunc={setAge}
              key={title} />
          ))}
        </select>
        { inputValues.map(({ name, inputNameValue, inputLength, unit }) => (
          <InputBox 
            name={name}
            nameValue={inputNameValue}
            lengthOf={inputLength}
            unit={unit}
            age={age}
            hemoValues={{min: minHemo, max: maxHemo}}
            setHemoValue={setHemoValue}
            key={name}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
