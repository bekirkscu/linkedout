import React, { useState } from "react";
import { EditSaveButton } from "./EditSaveButton";
import ExperienceItem from "./ExperienceItem";
import { PersonalInfo } from "./PersonalInfo";
import { Skills } from "./Skills";
import "./Dashboard.css";

export default function Dashboard() {
  const [aboutMe, setAboutMe] = useState("I'm a passionate creative...");
  const [editingAbout, setEditingAbout] = useState(false);
  const [editingPersonal, setEditingPersonal] = useState(false);  // State for Personal Info edit
  const [editingExperience, setEditingExperience] = useState(false); // Added state for Experience editing

  const [experience, setExperience] = useState([
    {
      id: 1,
      jobTitle: "Experience 1 ",
      date: "2021 - 2023",
      bullets: ["Designed promotional materials", "Led branding projects"],
    },
    {
      id: 2,
      jobTitle: "Experience 2 ",
      date: "2019 - 2021",
      bullets: ["Commissioned artworks", "Collaborated with authors"],
    },
  ]);

  const [personalInfo, setPersonalInfo] = useState({
    name: "Name Surname",
    location: "Lodon, UK",
    workStatus: "Authorized to work",
    linkedinURL: "https://www.linkedin.com",
  });

  const [skills, setSkills] = useState(["Design", "Illustration", "Branding"]);

  const handleAddExperience = () => {
    const newId = experience.length > 0 ? experience[experience.length - 1].id + 1 : 1;
    const newExp = {
      id: newId,
      jobTitle: "New Role",
      date: "Year - Year",
      bullets: ["Bullet point 1"],
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
      {/* Personal Info Section */}
      <PersonalInfo
        data={personalInfo}
        onUpdate={handlePersonalInfoUpdate}
        editing={editingPersonal}  // Pass editing state for Personal Info
        onToggle={() => setEditingPersonal((prev) => !prev)}  // Toggling edit mode for Personal Info
      />

      {/* About Me Section */}
      <section className="section">
        <div className="section-header">
          <h2>About Me</h2>
          <EditSaveButton
            editing={editingAbout}
            onToggle={() => setEditingAbout((prev) => !prev)}
          />
        </div>
        {editingAbout ? (
          <textarea
            className="input"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
          />
        ) : (
          <p className="text">{aboutMe}</p>
        )}
      </section>

      {/* Experience Section */}
      <section className="section">
        <div className="section-header">
          <h2>Experience</h2>
          <EditSaveButton
            editing={editingExperience}  // Use editingExperience here
            onToggle={() => setEditingExperience((prev) => !prev)}
          />
        </div>

        {experience.map((item) => (
          <ExperienceItem
            key={item.id}
            data={item}
            editing={editingExperience}  // Use editingExperience here
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

      {/* Skills Section */}
      <Skills data={skills} onUpdate={handleSkillsUpdate} />
    </div>
  );
}
