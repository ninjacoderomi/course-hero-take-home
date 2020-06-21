import React, { useState } from "react";
import CourseInput from "./CourseInput";
import Course from "./Course";
import "./styles.css";

export default function App() {
  const [course, setCourse] = useState(null);
  return (
    <div className="App">
      <div className="container">
        <CourseInput handleChange={course => setCourse(course)} />
        {course && <Course {...course} />}
      </div>
    </div>
  );
}
