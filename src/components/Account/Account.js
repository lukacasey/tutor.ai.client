import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import LogNav from "../LogNav";
import "../../styles/Account.css";

import AccountDetails from "../Account/AccountDetails";
import AddCourse from "../Account/AddCourse";

export default function Account() {
  const HOST = process.env.REACT_APP_HOST;
  const [subjects, setSubjects] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await fetch(`${HOST}/api/subjects`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setSubjects(json);
      }
    };

    if (user) {
      fetchSubjects();
    }
  }, [user]);

  return (
    <>
      <LogNav />
      <div className="account">
        <div className="heading-wrapper">
          <h1 className="account-heading">Welcome,&nbsp;</h1>
          {user && <h1 className="username">{user.email.split("@")[0]}</h1>}
        </div>
        <div className="account-main-container">
          <div className="subjects">
            <p>My Courses</p>
            {subjects &&
              subjects.map((subject) => (
                <AccountDetails
                  key={subject._id}
                  subject={subject}
                  setSubjects={setSubjects}
                  subjects={subjects}
                />
              ))}

            <AddCourse setSubjects={setSubjects} subjects={subjects} />
          </div>
          <div className="about-app">
            <p>About tutor.ai</p>
            <p className="about-text">
              At Tutor.ai, we believe in fostering a deep understanding of
              concepts rather than providing direct answers. Our app leverages
              the <b style={{ color: "#98c379" }}>ChatGPT API</b> to create an
              interactive learning experience that encourages students to{" "}
              <b>
                actively engage with the material and develop their
                problem-solving skills.
              </b>{" "}
              With Tutor.ai, students have the opportunity to explore subjects
              in a dynamic and collaborative environment.{" "}
              <b style={{ color: "#56b6c2" }}>
                Instead of simply providing answers, our app prompts students to
                think critically, guiding them towards finding solutions on
                their own.
              </b>{" "}
              This process encourages independent thinking, enhances
              problem-solving abilities, and nurtures a lifelong love for
              learning.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
