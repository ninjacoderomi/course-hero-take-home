import React, { useState } from "react";
import courseParser, { FormatError } from "./courseParser";

export default function({ handleChange }) {
  const [value, setValue] = useState("");
  const [hasError, setError] = useState(false);
  const handleSubmit = function(e) {
    e.preventDefault();
    if (value.trim()) {
      try {
        const course = courseParser(value.trim());
        handleChange(course);
        setError(false);
      } catch (e) {
        if (e === FormatError) {
          handleChange(null);
          setError(true);
        } else {
          throw e;
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <label>
        Course
        <input value={value} onChange={e => setValue(e.target.value)} />
      </label>
      <button className="primary-button" type="submit">
        Submit
      </button>
      {hasError && <div className="error">Format Error</div>}
    </form>
  );
}
