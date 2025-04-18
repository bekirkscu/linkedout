import React, { useState } from "react";
import { EditSaveButton } from "./EditSaveButton";

export function Skills({ data, onUpdate }) {
  const [skills, setSkills] = useState(data);
  const [editing, setEditing] = useState(false);

  const handleSkillsChange = (index, newSkill) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = newSkill;
    setSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, "New Skill"]);
  };

  const handleSave = () => {
    onUpdate(skills);
    setEditing(false);
  };

  return (
    <section className="section">
      <div className="section-header">
        <h2>Skills</h2>
        <EditSaveButton editing={editing} onToggle={() => setEditing((prev) => !prev)} />
      </div>

      {editing ? (
        <div>
          {skills.map((skill, index) => (
            <input
              key={index}
              className="input"
              value={skill}
              onChange={(e) => handleSkillsChange(index, e.target.value)}
            />
          ))}
          <button onClick={handleAddSkill}>+ Add Skill</button>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <ul>
          {skills.map((skill, index) => (
            <li key={index} className="text">
              {skill}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
