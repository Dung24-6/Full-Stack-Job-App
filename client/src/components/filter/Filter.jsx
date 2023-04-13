import React from "react";
import "./Filter.scss";

const Filter = ({ name, data, onChange }) => {

  return (
    <div className="filter">

      <select name={name} onChange={(e) => onChange(prev => ({ ...prev, [e.target.name]: e.target.value }))}>
        <option value="">{name}</option>
        {data.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
