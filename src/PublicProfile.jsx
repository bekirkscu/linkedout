import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";
import "./publicprofile.css";

export default function PublicProfile() {
  const { uid } = useParams();
  const [cvData, setCvData] = useState(null);
  const [expandedExperienceIds, setExpandedExperienceIds] = useState([]);
  const [expandedEducationIds, setExpandedEducationIds] = useState([]);

  useEffect(() => {
    const fetchCV = async () => {
      if (!uid) return;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCvData(docSnap.data());
      } else {
        console.warn("No public CV found for this user.");
      }
    };

    fetchCV();
  }, [uid]);

  const toggleExperience = (id) => {
    setExpandedExperienceIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleEducation = (id) => {
    setExpandedEducationIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  if (!cvData) {
    return <div>Loading CV...</div>;
  }

  const { personalInfo, aboutMe, experience, education, skills } = cvData;

  return (
    <div className="public-profile">
      <h1>{personalInfo.name}</h1>
      <p className="profile-subline">
      {personalInfo.email} | {personalInfo.phoneNumber} | {personalInfo.location} | {personalInfo.workStatus} {" "}
     |
        {personalInfo.linkedinURL && (
          <a
            href={personalInfo.linkedinURL}
            target="_blank"
            rel="noreferrer"
            className="linkedin-icon-link"
            title="View LinkedIn Profile"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        )}
      </p>

      <section>
        <p>{aboutMe}</p>
      </section>

      <section>
        <h2>Experience</h2>
        {experience.map((item) => {
          const isExpanded = expandedExperienceIds.includes(item.id);
          return (
            <div key={item.id} className="experience-item">
              <div
                className="experience-header"
                onClick={() => toggleExperience(item.id)}
              >
                <h3>{item.jobTitle}</h3>
                <span className="experience-date">
                  {item.fromMonth} {item.fromYear} – {item.uptoMonth} {item.uptoYear}
                </span>
                <span className="exp-toggle-icon">
                  {isExpanded ? "▼" : "▶"}
                </span>
              </div>
              {isExpanded && (
                <ul className="exp-bullets">
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </section>

      <section>
        <h2>Education</h2>
        {education.map((item) => {
          const isExpanded = expandedEducationIds.includes(item.id);
          return (
            <div key={item.id} className="education-item">
              <div
                className="education-header"
                onClick={() => toggleEducation(item.id)}
              >
                <h3>{item.jobTitle}</h3>
                <span className="education-date">
                  {item.fromMonth} {item.fromYear} – {item.uptoMonth} {item.uptoYear}
                </span>
                <span className="edu-toggle-icon">
                  {isExpanded ? "▼" : "▶"}
                </span>
              </div>
              {isExpanded && (
                <ul className="edu-bullets">
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </section>

      <section>
        <h2>Skills</h2>
        <ul className="skills-list">
          {skills.map((skill, idx) => (
            <li key={idx} className="skill-badge">{skill}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
