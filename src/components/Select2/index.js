import React, { Fragment } from "react";
import Select from "react-select";



const Select2 = ({ options, className,isMulti, placeholder, optionLabel, optionValue, value, handleChange, required, isDisabled, maxLength }) => {
  if (maxLength > 0)
    console.log(maxLength);

  const selectStyle = {
    control: (base, { isDisabled }) => ({
      ...base,
      minHeight: "30px",
      borderRadius: "0.25rem",
      fontSize: "0.8rem !important",
      fontWeight: 400,
      backgroundColor: isDisabled ? "#e9ecef" : undefined,
      border: "1px solid #ced4da",
      color: "#495057",
      paddingLeft: "0.2rem !important",
    }),
    menuPortal: (base) => ({
      ...base,
      width: maxLength === undefined ? base.width : `${maxLength}px`, // Anda dapat menyesuaikan faktor pengali sesuai kebutuhan
      zIndex: maxLength === undefined ? base.zIndex : 9999, // Atur indeks z sesuai kebutuhan untuk memastikan tampilan menu dropdown di atas konten lain
    }),
    option: (base, { isDisabled, isFocused, isSelected }) => ({
      ...base,
      paddingTop: 3,
      paddingBottom: 3,
      fontSize: "12px",
      fontWeight: 400,
      backgroundColor: isDisabled ? undefined : isSelected ? "#34AEE2" : isFocused ? "rgba(52, 174, 226, 0.1)" : undefined,
      color: isDisabled ? undefined : isSelected ? "#fff" : isFocused ? "#495057" : "#495057",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#495057",
    }),
    placeholder: (base) => ({ ...base, color: "#6c757d" }),
    input: (base) => ({ ...base, padding: 0 }),
    dropdownIndicator: (base) => ({ ...base, padding: 3 }),
    menu: (base) => ({ ...base, marginTop: 0 }),
    menuList: (base) => ({ ...base, padding: 3 }),
  };

  return (
    <Fragment>
      <Select menuPosition="fixed" isMulti ={isMulti} options={options} className={className} getOptionValue={optionValue} getOptionLabel={optionLabel} placeholder={placeholder} styles={selectStyle} value={value} onChange={handleChange} isDisabled={isDisabled} maxLength={maxLength} />
      {value === undefined ||
        ((value === null || value.length === 0) && required !== false && (
          <input
            tabIndex={-1}
            autoComplete="off"
            style={{
              opacity: 0,
              width: "100%",
              height: 0,
              position: "absolute",
            }}
            required={required}
          />
        ))}
    </Fragment>
  );
};

export default Select2;
