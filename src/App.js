import { useEffect, useRef, useState } from "react";
import "./styles.css";
const OTP_DIGIT_LIMIT = 5;
export default function App() {
  const [inputArr, setInputArr] = useState(new Array(OTP_DIGIT_LIMIT).fill(""));

  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleInputChange = (value, index) => {
    const newValue = value.trim();
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);
    newValue && refArr.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };
  return (
    <div className="App">
      <h1>Enter OTP</h1>
      <div>
        {inputArr.map((input, index) => (
          <input
            className="input-box"
            type="text"
            key={index}
            value={inputArr[index]}
            ref={(input) => (refArr.current[index] = input)}
            onChange={(e) => handleInputChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
    </div>
  );
}
