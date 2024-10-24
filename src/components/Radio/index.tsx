'use client';
import { FormControlLabel, RadioGroup } from '@mui/material';
import Radio from '@mui/material/Radio';
import React, { createContext, ReactNode, useContext, useState } from 'react';
interface RadioContextType {
  handleChangeValue: (value: any) => void;
  isSelect: boolean;
}
const RadioContext = createContext<RadioContextType>({
  handleChangeValue: () => {},
  isSelect: true,
});
const RadioComponent = ({ children }: { children: ReactNode }) => {
  const [isSelect, setIsSelect] = useState(false);
  const handleChangeValue = (value: any) => {
    console.log('value?.target?.value :>> ', value?.target?.value);
  };

  return (
    <RadioContext.Provider value={{ handleChangeValue, isSelect }}>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        onChange={handleChangeValue}
      >
        {children}
      </RadioGroup>
    </RadioContext.Provider>
  );
};
const RadioOption = ({}) => {
  const { handleChangeValue, isSelect } = useContext(RadioContext);
  return (
    <>
      <FormControlLabel
        control={
          <Radio
            value="female"
            onChange={handleChangeValue}
            checked={isSelect}
          />
        }
        label="Female"
      />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
    </>
  );
};
RadioComponent.Option = RadioOption;
export default RadioComponent;
