import React, { useState } from "react";

export default function ExperienceItem({ data, editing, onUpdate, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localData, setLocalData] = useState(data);

  const handleChange = (field, value) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate(updated);
  };

  const handleBulletChange = (index, value) => {
    const updatedBullets = [...localData.bullets];
    updatedBullets[index] = value;
    handleChange("bullets", updatedBullets);
  };

  return (
    <div className="experience-item">
      <div className="experience-header" onClick={() => setIsExpanded(!isExpanded)}>
        {editing ? (
          <>
            <input
              className="input title-input"
              value={localData.jobTitle}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
            />
            <input
              className="input date-input"
              value={localData.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </>
        ) : (
          <>
            <span className="job-title">{localData.jobTitle}</span>
            <span className="date">{localData.date}</span>
          </>
        )}
      </div>
      {isExpanded && (
        <ul className="bullets">
          {localData.bullets.map((bullet, index) => (
            <li key={index} className="bullet">
              {editing ? (
                <input
                  className="input bullet-input"
                  value={bullet}
                  onChange={(e) => handleBulletChange(index, e.target.value)}
                />
              ) : (
                bullet
              )}
            </li>
          ))}
        </ul>
      )}
      {editing && (
        <button className="delete-experience" onClick={onDelete}>
          Delete
        </button>
      )}
    </div>
  );
}
