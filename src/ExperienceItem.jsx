import React, { useState, useEffect } from "react";

export default function ExperienceItem({
  data,
  editing,
  onUpdate,
  onDelete,
}) {
  const [localData, setLocalData] = useState({
    ...data,
    bullets: Array.isArray(data.bullets) ? data.bullets : ["• Bullet point"], // Ensure there's always one bullet point
    isCurrently: data.uptoMonth === "Currently" ? true : false, // Add isCurrently state
  });

  useEffect(() => {
    if (data) {
      setLocalData({
        ...data,
        bullets: Array.isArray(data.bullets) ? data.bullets : ["• Bullet point"], // Set the initial bullet point
        isCurrently: data.uptoMonth === "Currently" ? true : false, // Set isCurrently on data update
      });
    }
  }, [data]);

  const handleChange = (field, value) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate(updated);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const updatedBullets = [...localData.bullets];
      updatedBullets.splice(index + 1, 0, "• "); // Add a new bullet point when Enter is pressed
      handleChange("bullets", updatedBullets);
    }

    if (e.key === "Backspace" && localData.bullets[index] === "") {
      e.preventDefault();
      const updatedBullets = localData.bullets.filter((_, i) => i !== index); // Remove empty bullet points
      handleChange("bullets", updatedBullets);
    }
  };

  const formatDateRange = () => {
    if (
      localData.fromMonth &&
      localData.fromYear &&
      (localData.uptoMonth || localData.isCurrently) &&
      (localData.uptoYear || localData.isCurrently)
    ) {
      return `${localData.fromMonth} ${localData.fromYear} - ${localData.uptoMonth} ${localData.uptoYear}`;
    }
    return "Month Year - Month Year"; // Fallback when data is missing
  };

  const handleEndMonthChange = (e) => {
    const month = e.target.value;
    setLocalData((prevData) => {
      const updatedData = { ...prevData, uptoMonth: month };
      if (month === "Currently") {
        updatedData.uptoYear = ""; // Reset the year if "Currently" is selected
        updatedData.isCurrently = true; // Set isCurrently to true
      } else {
        updatedData.isCurrently = false; // Set isCurrently to false if "Currently" is not selected
      }
      onUpdate(updatedData);
      return updatedData;
    });
  };

  return (
    <div className="experience-item">
      <div
        className="experience-header"
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        {editing ? (
          <>
            <input
              className="input title-input"
              value={localData.jobTitle || ""}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
              style={{ flex: 6 }}
            />
            <div
              className="date-select"
              style={{ display: "flex", gap: "10px", flex: 2 }}
            >
              <div style={{ flex: 1 }}>
                <select
                  value={localData.fromMonth || ""}
                  onChange={(e) => handleChange("fromMonth", e.target.value)}
                  className="input"
                >
                  <option value="" disabled>
                    Month
                  </option>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, index) => (
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
                  <option value="" disabled>
                    Year
                  </option>
                  {Array.from({ length: 60 }, (_, i) => 2025 - i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <span className="to-date" style={{ margin: "0 10px" }}>
              to
            </span>
            <div
              className="date-select"
              style={{ display: "flex", gap: "10px", flex: 2 }}
            >
              <div style={{ flex: 1 }}>
                <select
                  value={localData.uptoMonth || ""}
                  onChange={handleEndMonthChange}
                  className="input"
                >
                  <option value="" disabled>
                    Month
                  </option>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                    "Currently",
                  ].map((month, index) => (
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
                  disabled={localData.isCurrently} // Disable if 'Currently' is selected
                >
                  <option value="" disabled>
                    Year
                  </option>
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
            <span className="date">{formatDateRange()}</span>
          </>
        )}
      </div>

      {/* Bullet Points (TextArea) */}
      {editing && (
        <div className="bullet-points">
          <textarea
            value={localData.bullets.join("\n")} // Join bullets by line break
            onChange={(e) => handleChange("bullets", e.target.value.split("\n"))} // Split by line break
            onKeyDown={(e) => handleKeyDown(e, localData.bullets.length - 1)} // Handle Enter and Backspace keys
            rows={3}
            className="input"
          />
        </div>
      )}

      {/* Delete button only in edit mode */}
      {editing && (
        <button className="delete-experience" onClick={() => onDelete(localData)}>
          Delete Experience
        </button>
      )}
    </div>
  );
}
