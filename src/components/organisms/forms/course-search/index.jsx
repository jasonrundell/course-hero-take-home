import React, { useState } from 'react'

import { Label, Button, InputText } from '../../../atoms'
import { CourseResult } from '../../../molecules'

const FormCourseSearch = () => {
  const [courseClasses, setCourseClasses] = useState()
  const [isCourseInvalid, setIsCourseInvalid] = useState(false)
  const [course, setCourse] = useState()
  const [department, setDepartment] = useState()
  const [semester, setSemester] = useState()
  const [year, setYear] = useState()
  const [result, setResult] = useState(false)

  const handleSearch = () => {
    if (semester && year && department && course) {
      setResult(true)
    } else {
      showCourseError()
    }
  }

  const resetFields = () => {
    setCourseClasses()
    setIsCourseInvalid(false)
  }

  const showCourseError = () => {
    setResult(false)
    setCourseClasses(['input', 'is-danger'])
    setIsCourseInvalid(true)
  }

  const handleChange = (e) => {
    // start test course string
    /*
      ● A valid course string is a single string that is a combination of a Department+Course
      Number, followed by Semester+Year.
      ● Department is always one or more alphabetic characters.
      ● Course Number is always one or more numeric characters.
      ● Department and course number can be separated by an optional delimiter.
          ○ Delimiters are “-”, “ ”, or “:”.
      ● Semester is either an abbreviation or the complete semester.
      ● Year is either two digits or four digits (you can assume the year 2000 or greater).
      ● Semester+Year combination can be swapped in position (that is, Year can come before
      Semester).
      ● There is always a space between the Department+Course Number and the
      Semester+Year.
      ● Semesters could be abbreviated as: F (Fall), W (Winter), S (Spring), Su (Summer)
    */

    // string can have 2 to 3 spaces. use these as the first way to break down the query
    const userQuery = e.target.value
    const userQuerySplit = userQuery.split(' ')
    let query = userQuery
    let querySplit = userQuery.split(' ')
    const maxSplitCount = 4
    const splitDelimiters = ['-', ' ', ':']
    const validSemesters = [
      'F',
      'W',
      'S',
      'Su',
      'Fall',
      'Winter',
      'Spring',
      'Summer',
    ]

    if (userQuerySplit.length > maxSplitCount) {
      // display error
      showCourseError()
      return
    } else {
      // reset ui
      resetFields()

      // normalize the query if split count is 4 (maxSplitCount). e.g. `Math 123 2015 Spring` to `Math123 2015 Fall`
      if (userQuerySplit.length === maxSplitCount) {
        query = userQuery.replace(' ', '') // remove the first space
        querySplit = query.split(' ') // set the querySplit to the new split array
      }

      // validate the query if split count is 3. e.g. `CS111 2018 Fall`
      if (querySplit.length === 3) {
        // init split values
        let firstSplitValue = querySplit[0]
        let secondSplitValue
        let thirdSplitValue

        // remove delimiters from first split value
        splitDelimiters.forEach((item) => {
          firstSplitValue = firstSplitValue.replaceAll(item, '')
        })

        secondSplitValue = querySplit[1]
        thirdSplitValue = querySplit[2]

        let newDepartment
        let newCourse
        let newSemester
        let newYear

        // Department+Course === firstSplitValue
        // Semester+Year === secondSplitValue

        // test for valid semester
        if (validSemesters.includes(secondSplitValue)) {
          newSemester = secondSplitValue
          newYear = thirdSplitValue
        } else if (validSemesters.includes(thirdSplitValue)) {
          newSemester = thirdSplitValue
          newYear = secondSplitValue
        }

        // test for valid year
        if (parseInt(newYear) <= 100) {
          newYear = parseInt(newYear) + 2000
        } else if (parseInt(newYear) > 1999 && parseInt(newYear) < 2025) {
          newYear = parseInt(newYear)
        }

        // test year to be valid number
        if (!Number(newYear)) {
          showCourseError()
          return
        }

        // get department
        // get index of first number in string
        const numberIndex = firstSplitValue.match(/\d/)
        if (!numberIndex) {
          showCourseError()
          return
        }

        // take department from 0 to numberIndex
        newDepartment = firstSplitValue.substring(0, numberIndex.index)
        // get course number
        newCourse = firstSplitValue.substring(numberIndex.index)

        // test course to be valid number
        if (!Number(newCourse)) {
          showCourseError()
          return
        }

        // format semester to long-form
        switch (newSemester) {
          case 'F':
            newSemester = 'Fall'
            break
          case 'W':
            newSemester = 'Winter'
            break
          case 'S':
            newSemester = 'Spring'
            break
          case 'Su':
            newSemester = 'Summer'
            break
          default:
            break
        }

        if (newSemester && newYear && newDepartment && newCourse) {
          setDepartment(newDepartment)
          setCourse(newCourse)
          setSemester(newSemester)
          setYear(parseInt(newYear))
        } else {
          showCourseError()
        }
      } else {
        showCourseError()
      }
    }
  }

  return (
    <div>
      <Label id="search-course">Course</Label>
      <div className="field has-addons">
        <div className="control">
          <InputText
            id="search-course"
            classes={courseClasses}
            placeholder="Search course"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="control">
          <Button onClick={handleSearch} disabled={isCourseInvalid}>
            Search
          </Button>
        </div>
      </div>
      {isCourseInvalid && (
        <p className="help is-danger">Error: could not parse course</p>
      )}

      {result && (
        <ul className="list-results">
          <CourseResult
            department={department}
            course={course}
            year={year}
            semester={semester}
          />
        </ul>
      )}
    </div>
  )
}

export default FormCourseSearch
