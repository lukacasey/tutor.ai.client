import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const AddCourseForm = ({ setSubjects, subjects, toggleModal }) => {
  const HOST = process.env.REACT_APP_HOST;
  const [newSubject, setNewSubject] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("you must be logged in");
      return;
    }

    const info = { subject: newSubject };
    console.log(info);
    const response = await fetch(`${HOST}/api/subjects`, {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      console.log(response);
      setNewSubject("");
      setError(null);
      console.log("new subject added", json);
      setSubjects([...subjects, json]);
      toggleModal();
    }
  };

  return (
    <>
      <form className="create" onSubmit={handleSubmit}>
        <p className="new-course-heading">Course Name</p>

        <input
          type="text"
          maxLength="20"
          placeholder="Course Name"
          onChange={(e) => setNewSubject(e.target.value)}
          value={newSubject}
        />
        <button>Create</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default AddCourseForm;
