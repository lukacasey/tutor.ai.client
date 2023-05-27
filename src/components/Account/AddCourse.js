import React, { useState } from "react";
import "../../styles/History.css";

import AddCourseForm from "./AddCourseForm";

const AddCourse = ({ setSubjects, subjects }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="add-course-container">
        <span className="add-course-button" onClick={toggleModal}>
          Add a New Course
        </span>
      </div>

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <AddCourseForm
              setSubjects={setSubjects}
              subjects={subjects}
              toggleModal={toggleModal}
            />
            <div>
              <span className="modal-btn" onClick={toggleModal}>
                back
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCourse;
