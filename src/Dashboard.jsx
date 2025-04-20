// src/Dashboard.jsx
import React, { useState } from "react";
import { EditSaveButton } from "./EditSaveButton";
import ExperienceItem from "./ExperienceItem";
import { PersonalInfo } from "./PersonalInfo";
import { Skills } from "./Skills";
import { AboutMe } from "./AboutMe";
import "./Dashboard.css";

export default function Dashboard() {
  const [aboutMe, setAboutMe] = useState("I'm a passionate creative...");
  const [editingAbout, setEditingAbout] = useState(false);
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(false);

  const [experience, setExperience] = useState([
    {
      id: 1,
      jobTitle: "Experience 1",
      startMonth: "January",
      startYear: "2021",
      endMonth: "December",
      endYear: "2023",
      bullets: "Designed promotional materials, Led branding projects",
    },
  ]);

  const [personalInfo, setPersonalInfo] = useState({
    name: "Name Surname",
    location: "London, UK",
    workStatus: "Authorized to work",
    linkedinURL: "https://www.linkedin.com",
  });

  const [skills, setSkills] = useState(["Design", "Illustration", "Branding"]);

  const handleAddExperience = () => {
    const newId = experience.length > 0 ? experience[experience.length - 1].id + 1 : 1;
    const newExp = {
      id: newId,
      jobTitle: "New Role",
      startMonth: "January",
      startYear: "2021",
      endMonth: "December",
      endYear: "2023",
      bullets: "Bullet point 1",
    };
    setExperience([...experience, newExp]);
  };

  const handleUpdateExperience = (id, updatedItem) => {
    const updatedList = experience.map((item) => (item.id === id ? updatedItem : item));
    setExperience(updatedList);
  };

  const handleDeleteExperience = (id) => {
    const updatedList = experience.filter((item) => item.id !== id);
    setExperience(updatedList);
  };

  const handlePersonalInfoUpdate = (updatedInfo) => {
    setPersonalInfo(updatedInfo);
  };

  const handleSkillsUpdate = (updatedSkills) => {
    setSkills(updatedSkills);
  };

  return (
    <div className="dashboard">
      <PersonalInfo
        data={personalInfo}
        onUpdate={handlePersonalInfoUpdate}
        editing={editingPersonal}
        onToggle={() => setEditingPersonal((prev) => !prev)}
      />

      <AboutMe
        aboutMe={aboutMe}
        setAboutMe={setAboutMe}
        editingAbout={editingAbout}
        setEditingAbout={setEditingAbout}
      />

      <section className="section">
        <div className="section-header">
          <h2>Experience</h2>
          <EditSaveButton
            editing={editingExperience}
            onToggle={() => setEditingExperience((prev) => !prev)}
          />
        </div>

        {experience.map((item) => (
          <ExperienceItem
            key={item.id}
            data={item}
            editing={editingExperience}
            onUpdate={(updatedItem) => handleUpdateExperience(item.id, updatedItem)}
            onDelete={() => handleDeleteExperience(item.id)}
          />
        ))}

        {editingExperience && (
          <button className="add-button" onClick={handleAddExperience}>
            + Add Experience
          </button>
        )}
      </section>

      <Skills data={skills} onUpdate={handleSkillsUpdate} />
    </div>
  );
}
