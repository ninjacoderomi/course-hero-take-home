import React from "react";

function Course({ department, semester, year, number }) {
  return (
    <div className="course">
      <h2>
        {department} {number}
      </h2>

      <table className="course-details">
        <tbody>
          <tr>
            <th>Department</th>
            <td>{department}</td>
          </tr>
          <tr>
            <th>Course</th>
            <td>{number}</td>
          </tr>
          <tr>
            <th>Year</th>
            <td>{year}</td>
          </tr>
          <tr>
            <th>Semester</th>
            <td>{semester}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Course;
