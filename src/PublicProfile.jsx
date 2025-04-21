// src/PublicProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";
import "./publicprofile.css"; // Optional: add clean styling

export default function PublicProfile() {
  const { uid } = useParams();
  const [cvData, setCvData] = useState(null);

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

  if (!cvData) {
    return <div>Loading CV...</div>;
  }

  const { personalInfo, aboutMe, experience, education, skills } = cvData;

  return (
    <div className="public-profile">
      <h1>{personalInfo.name}</h1>
      <p><strong>Location:</strong> {personalInfo.location}</p>
      <p><strong>Work Status:</strong> {personalInfo.workStatus}</p>
      <p><strong>LinkedIn:</strong> <a href={personalInfo.linkedinURL} target="_blank" rel="noreferrer">{personalInfo.linkedinURL}</a></p>

      <section>
        <h2>About Me</h2>
        <p>{aboutMe}</p>
      </section>

      <section>
        <h2>Experience</h2>
        {experience.map((item) => (
          <div key={item.id} className="experience-item">
            <h3>{item.jobTitle}</h3>
            <p>{item.fromMonth} {item.fromYear} – {item.uptoMonth} {item.uptoYear}</p>
            <ul>
              {item.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {education.map((item) => (
          <div key={item.id} className="education-item">
            <h3>{item.jobTitle}</h3>
            <p>{item.fromMonth} {item.fromYear} – {item.uptoMonth} {item.uptoYear}</p>
            <ul>
              {item.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
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
