import React, { Component } from 'react';
import Select from 'react-virtualized-select';
import axios from 'axios';

import 'react-select/dist/react-select.css'
import 'react-virtualized-select/styles.css'

//think about clearing values after add button

const sortOptions = [
  { value: 'instructor', label: 'By Instructor' },
  { value: 'semester', label: 'By Semester' }
];
class ClassSearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedClass: 0,
      courseOptions: [],
      selectType: 'instructor',
      selectPrimary: '',
      selectSecondary: '',
      selectSectionNumber: '',
      sections: [],
    }

    this.handleClassSelect = this.handleClassSelect.bind(this);
    this.handleSortSelect = this.handleSortSelect.bind(this);
    this.handlePrimarySelect = this.handlePrimarySelect.bind(this);
    this.handleSecondarySelect = this.handleSecondarySelect.bind(this);
    this.buildCoursesOptions = this.buildCoursesOptions.bind(this);
    this.buildPrimaryOptions = this.buildPrimaryOptions.bind(this);
    this.buildSecondaryOptions = this.buildSecondaryOptions.bind(this);
    this.getSectionIDs = this.getSectionIDs.bind(this);
  }

  componentDidMount() {
    this.setState({
      courseOptions: this.buildCoursesOptions(this.props.classes)
    })
  }

  handleClassSelect(updatedClass) {
    this.setState({
      selectedClass: updatedClass.value
    })

    axios.get(`http://localhost:8000/grades/course_grades/${updatedClass.value}/`)
    .then(res => {
      console.log(res);
      this.setState({
        sections: res.data,
        selectPrimary: '',
        selectSecondary: '',
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleSortSelect(sortBy) {
    this.setState({
      selectType: sortBy.value,
    })
  }

  handlePrimarySelect(primary) {
    this.setState({
      selectPrimary: primary ? primary.value : '',
      selectSecondary: '',
    })
  }

  handleSecondarySelect(secondary) {
    this.setState({
      selectSecondary: secondary ? secondary.value: '',
    })
  }

  buildCoursesOptions(courses) {
    let options = courses.map(course => ({
      value: course.id,
      label: `${course.abbreviation} ${course.course_number}`,
    }));

    return options;
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getSectionSemester(section) {
    return `${this.capitalize(section.semester)} ${section.year}`;
  }

  buildPrimaryOptions(sections, selectType) {
    const ret = [];
    const map = new Map();

    if(selectType == 'instructor') {
      ret.push({ value: 'all', label: "All Instructors" })

      for(const section of sections) {
        if(!map.has(section.instructor)) {
          map.set(section.instructor, true);
          ret.push({
            value: section.instructor,
            label: section.instructor,
          })
        }
      }
    } else {
      ret.push({ value: 'all', label: "All Semesters" })
      for(const section of sections) {
        let semester = this.getSectionSemester(section);
        if(!map.has(semester)) {
          map.set(semester, true);
          ret.push({
            value: semester,
            label: semester,
          })
        }
      }
    }

    return ret;
  }

  buildSecondaryOptions(sections, selectType, selectPrimary) {
    const ret = [];

    let label = selectType == 'instructor' ? 'All Semesters' : 'All Instructors';
    ret.push({ value: 'all', label: label })

    if(selectPrimary == 'all') {
      const options = [...new Set(sections.map(s => `${this.getSectionSemester(s)} / ${s.section_number}`))]
        .map(semester => ({
          value: semester.split(' / ')[0],
          label: semester,
          sectionNumber: semester.split(' / ')[1],
        }))

      for(let o of options) {
        ret.push(o);
      }
    } else {
      if(selectType == 'instructor') {
        const options = sections.filter(section => section.instructor == selectPrimary)
          .map(section => {
            let semester = `${this.getSectionSemester(section)} / ${section.section_number}`

            return {
              value: semester.split(' / ')[0],
              label: semester,
              sectionNumber: semester.split(' / ')[1],
            }
          })

        for(let o of options) {
          ret.push(o);
        }
      } else {
        const options = sections.filter(section => this.getSectionSemester(section) == selectPrimary)
          .map(section => {
            let instructor = `${section.instructor} / ${section.section_number}`

            return {
              value: instructor.split(' / ')[0],
              label: instructor,
              sectionNumber: instructor.split(' / ')[1],
            }
          })

        for(let o of options) {
          ret.push(o);
        }
      }
    }

    return ret;
  }

  getSectionIDs() {
    const { sections, selectType, selectPrimary, selectSecondary, sectionNumber } = this.state;
    let ret;

    if(selectType == 'instructor') {
      ret = sections.filter(section => {
        return selectPrimary == 'all' ? true : section.instructor == selectPrimary;
      })
      .filter(section => {
        return selectSecondary == 'all' ? true : this.getSectionSemester(section) == selectSecondary;
      })
      .filter(section => {
        return sectionNumber ? section.section_number == sectionNumber : true;
      })
    } else {
      ret = sections.filter(section => {
        return selectPrimary == 'all' ? true : this.getSectionSemester(section) == selectPrimary;
      })
      .filter(section => {
        return selectSecondary == 'all' ? true : section.instructor == selectSecondary;
      })
      .filter(section => {
        return sectionNumber ? section.section_number == sectionNumber : true;
      })
    }

    ret = ret.map(s => s.grade_id);

    console.log(ret);

    return ret;
  }

  render() {
    const { sections, selectType, selectPrimary, selectSecondary, selectedClass, courseOptions } = this.state;
    const { isSortable } = this.props;
    let primaryOptions = this.buildPrimaryOptions(sections, selectType);
    let secondaryOptions = this.buildSecondaryOptions(sections, selectType, selectPrimary);

    return (
      <div className="columns">
        <div className="column is-one-third">
          <Select
              name="selectClass"
              placeholder="Choose a class..."
              value={selectedClass}
              options={courseOptions}
              onChange={this.handleClassSelect}
          />
        </div>
        {isSortable &&
          <div className="column is-one-fifth">
            <Select
                name="sortBy"
                placeholder="Sort by"
                value={selectType}
                options={sortOptions}
                onChange={this.handleSortSelect}
            />
          </div>
        }
        <div className="column is-one-fifth">
          <Select
              name="instrSems"
              placeholder="Select an option..."
              value={selectPrimary}
              options={primaryOptions}
              onChange={this.handlePrimarySelect}
              disabled={!selectedClass}
              clearable={false}
              searchable={false}
          />
        </div>
        <div className="column is-one-fifth">
          <Select
              name="section"
              placeholder="Select an option..."
              value={selectSecondary}
              options={secondaryOptions}
              onChange={this.handleSecondarySelect}
              disabled={!selectedClass}
              clearable={false}
              searchable={false}
          />
        </div>
        <div className="column is-one-fifth">
          <button
            className="button is-success"
            onClick={this.getSectionIDs}
            disabled={!selectedClass || !(selectPrimary && selectSecondary)}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

ClassSearchBar.defaultProps = {
  isSortable: true,
}

export default ClassSearchBar;