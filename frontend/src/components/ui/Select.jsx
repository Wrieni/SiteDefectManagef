import React from "react";
import Select from "react-select";


const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "0.375rem", //добавить в стили потом
    borderColor: state.isFocused ? "#18191aff" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px #18191aff" : "none",
    "&:hover": {
      borderColor: "#18191aff", // поменять на универсальную переменную цвета
    },
    minHeight: "2.25rem", 
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#e0f2fe" : "white",
    color: "black",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 50, 
  }),
};

const CustomSelect = ({ options, value, onChange, placeholder, isClearable = true, ...props }) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isClearable={isClearable}
      styles={customStyles}
      {...props} 
    />
  );
};

export default CustomSelect;