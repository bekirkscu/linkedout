import React, { useState, useEffect } from "react";

export default function ExperienceItem({ data, editing, onUpdate, onDelete }) {
  const [localData, setLocalData] = useState({
    ...data,
    bullets: Array.isArray(data.bullets) ? data.bullets : [""], // Start with one empty bullet point
  });

  // Update the local state if props change
  useEffect(() => {
    if (data) {
      setLocalData({
        ...data,
        bullets: Array.isArray(data.bullets) ? data.bullets : [""], // Ensure we start with at least one bullet point
      });
    }
  }, [data]);

  const handleChange = (field, value) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate(updated); // Optionally update the parent with the changes
  };

  const handleBulletChange = (index, value) => {
    const updatedBullets = [...localData.bullets];
    updatedBullets[index] = value; // Update the specific bullet
    handleChange("bullets", updatedBullets); // Update the bullets state
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default Enter behavior (new line)
      const updatedBullets = [...localData.bullets];
      updatedBullets.splice(index + 1, 0, ""); // Insert a new bullet point after the current one
      handleChange("bullets", updatedBullets); // Update the bullets state
    }
  };

  // Format the date range for display
  const formatDateRange = () => {
    if (localData.fromMonth && localData.fromYear && localData.uptoMonth && localData.uptoYear) {
      return `${localData.fromMonth} ${localData.fromYear} - ${localData.uptoMonth} ${localData.uptoYear}`;
    }
    return "Month Year - Month Year"; // Default text when not selected
  };

  return (
    <div className="experience-item">
      <div className="experience-header" style={{ display: 'flex', alignItems: 'center' }}>
        {editing ? (
          <>
            <input
              className="input title-input"
              value={localData.jobTitle || ""}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
              style={{ flex: 7 }} // Job title takes 70% of the space
            />
            <div className="date-select" style={{ display: "flex", gap: "10px", flex: 3 }}>
              <div style={{ flex: 1 }}>
                <select
                  value={localData.fromMonth || ""}
                  onChange={(e) => handleChange("fromMonth", e.target.value)}
                  className="input"
                >
                  <option value="" disabled>Month</option> {/* Placeholder for the Month dropdown */}
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <select
                  value={localData.fromYear || ""}
                  onChange={(e) => handleChange("fromYear", e.target.value)}
                  className="input"
                >
                  <option value="" disabled>Year</option> {/* Placeholder for the Year dropdown */}
                  {Array.from({ length: 60 }, (_, i) => 2025 - i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <span className="to-date">to</span>
            <div className="date-select" style={{ display: "flex", gap: "10px", flex: 3 }}>
              <div style={{ flex: 1 }}>
                <select
                  value={localData.uptoMonth || ""}
                  onChange={(e) => handleChange("uptoMonth", e.target.value)}
                  className="input"
                >
                  <option value="" disabled>Month</option> {/* Placeholder for the Month dropdown */}
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <select
                  value={localData.uptoYear || ""}
                  onChange={(e) => handleChange("uptoYear", e.target.value)}
                  className="input"
                >
                  <option value="" disabled>Year</option> {/* Placeholder for the Year dropdown */}
                  {Array.from({ length: 60 }, (_, i) => 2025 - i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="job-title">{localData.jobTitle}</span>
            <span className="date">
              {formatDateRange()} {/* Display the formatted date range */}
            </span>
          </>
        )}
      </div>

      {/* Bullet Points - Always visible */}
      <div className="experience-bullets">
        {editing ? (
          <>
            <textarea
              className="input bullet-input"
              value={localData.bullets.map(bullet => `• ${bullet}`).join("\n")} // Ensure the bullets are shown correctly
              onChange={(e) => handleChange("bullets", e.target.value.split("\n").map((item) => item.replace("• ", "").trim()))} // Split and clean up bullet points
              onKeyDown={(e) => handleKeyDown(e, localData.bullets.length - 1)} // Handle Enter key to add a new bullet
              placeholder="Enter bullet points"
              rows={1} // Single line, will grow automatically
              style={{ width: "100%", minHeight: "100px" }} // Adjust the box to grow
            />
          </>
        ) : (
          <div className="bullets">
            {localData.bullets.map((bullet, index) => (
              <div key={index} className="bullet-item">
                <span>&#8226; {bullet}</span> {/* Literal bullet symbol */}
              </div>
            ))}
          </div>
        )}
      </div>

      {editing && (
        <button className="delete-experience" onClick={() => onDelete(localData)}>
          Delete
        </button>
      )}
    </div>
  );
}
