import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

const CourseResult = ({ department, course, year, semester }) => {
  return (
    <li className="course-result-card">
      <a href="#" className="course-result-title">
        {department} {course}
      </a>
      <div className="course-result-body">
        <div className="columns is-multiline is-mobile">
          <div className="column is-half course-result-label">Department</div>
          <div className="column is-half course-result-value">{department}</div>
          <div className="column is-half course-result-label">Course</div>
          <div className="column is-half course-result-value">{course}</div>
          <div className="column is-half course-result-label">Year</div>
          <div className="column is-half course-result-value">{year}</div>
          <div className="column is-half course-result-label">Semester</div>
          <div className="column is-half course-result-value">{semester}</div>
        </div>
      </div>
    </li>
  )
}

CourseResult.propTypes = {
  department: PropTypes.string.isRequired,
  course: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  semester: PropTypes.string.isRequired,
}

export default CourseResult
