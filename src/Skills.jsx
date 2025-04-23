import React, { useState, useEffect } from "react";
import { EditSaveButton } from "./EditSaveButton";

export function Skills({ data, onUpdate }) {
  const [skills, setSkills] = useState(data || []);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setSkills(data || []);
  }, [data]);

  const handleSkillsChange = (index, newSkill) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = newSkill;
    setSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, "New Skill"]);
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    onUpdate(updatedSkills); // Pass updated skills to parent
  };

  return (
    <section className="section">
      <div className="section-header">
        <h2>Skills</h2>
        <EditSaveButton
          editing={editing}
          onToggle={() => {
            if (editing) {
              onUpdate(skills); // Save on toggle off
            }
            setEditing((prev) => !prev);
          }}
        />
      </div>

      {editing ? (
        <div className="skills-edit">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <input
                className="input skill-input"
                value={skill}
                onChange={(e) => handleSkillsChange(index, e.target.value)}
              />
              <button
                className="delete-skill-btn"
                onClick={() => handleDeleteSkill(index)}
              >
                x
              </button>
            </div>
          ))}
          <button 
  onClick={handleAddSkill} 
  className="add-skill-button"
>
  + Add Skill
</button>
        </div>
      ) : (
        <ul className="skills-list">
          {skills.map((skill, index) => (
            <li key={index} className="skill-badge">
              {skill}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
