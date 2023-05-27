import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import "../../styles/Account.css";

const AccountDetails = ({ subject, subjects, setSubjects }) => {
  const HOST = process.env.REACT_APP_HOST;
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleSelect = (selectedSubject) => {
    navigate(`/tutor/${selectedSubject}`);
  };

  const historySelect = (selectedSubject) => (event) => {
    event.stopPropagation();
    navigate(`/history/${selectedSubject}`);
  };

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`${HOST}/api/subjects/` + subject._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      setSubjects(subjects.filter((item) => item !== subject));
    } else {
      alert("Failed to delete subject:", json.error);
    }
  };

  return (
    <div className="my-courses-wrapper">
      <div className="my-courses-container" type="submit">
        <div className="My-Courses">
          <div className="course-name">
            <div
              className="click-open"
              onClick={() => handleSelect(subject.subject)}
            >
              Open chatbox
            </div>
            <h3>{subject.subject}</h3>
          </div>
          <div className="info-container">
            <div className="streak-container">
              {/* <p>Streak: &nbsp;</p> */}
              {/* <p style={{ color: "#e06c75" }}>5 Days</p> */}
            </div>
            <div className="delete-container">
              <div
                onClick={historySelect(subject.subject)}
                className="history-btn"
                type="submit"
              >
                View History
              </div>

              <div onClick={handleClick} className="delete-btn">
                &#10006;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
