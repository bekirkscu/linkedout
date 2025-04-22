import React, { useState, useEffect } from "react";

export default function ExperienceItem({
  data,
  editing,
  onUpdate,
  onDelete,
  title,
}) {
  const [localData, setLocalData] = useState({
    ...data,
    bullets: Array.isArray(data.bullets) ? data.bullets : [""],
  });

  useEffect(() => {
    if (data) {
      setLocalData({
        ...data,
        bullets: Array.isArray(data.bullets) ? data.bullets : [""],
      });
    }
  }, [data]);

  const handleChange = (field, value) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate(updated);
  };

  const handleKeyDown = (e, index) => {
    // Handle Enter key to add new bullet point
    if (e.key === "Enter") {
      e.preventDefault();
      const updatedBullets = [...localData.bullets];
      updatedBullets.splice(index + 1, 0, "");
      handleChange("bullets", updatedBullets);
    }
    // Handle Backspace key to delete a bullet point
    if (e.key === "Backspace" && localData.bullets[index] === "") {
      e.preventDefault();
      const updatedBullets = localData.bullets.filter((_, i) => i !== index);
      handleChange("bullets", updatedBullets);
    }
  };

  const formatDateRange = () => {
    if (
      localData.fromMonth &&
      localData.fromYear &&
      localData.uptoMonth &&
      localData.uptoYear
    ) {
      return `${localData.fromMonth} ${localData.fromYear} - ${localData.uptoMonth} ${localData.uptoYear}`;
    }
    return "Month Year - Month Year";
  };

  return (
    <div className="experience-item">
      <div className="experience-header" style={{ display: "flex", alignItems: "center" }}>
        {editing ? (
          <>
            <input
              className="input title-input"
              value={localData.jobTitle || ""}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
              style={{ flex: 6 }} // Make title input box a bit longer
            />
            <div className="date-select" style={{ display: "flex", gap: "10px", flex: 2 }}>
              <div style={{ flex: 1 }}>
                <select
                  value={localData.fromMonth || ""}
                  onChange={(e) => handleChange("fromMonth", e.target.value)}
                  className="input"
                >
                  <option value="" disabled>Month</option>
                  {[
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December",
                  ].map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <select
                  value={localData.fromYear || ""}
                  onChange={(e) => handleChange("fromYear", e.target.value)}
                  className="input"
                >
                  <option value="" disabled>Year</option>
                  {Array.from({ length: 60 }, (_, i) => 2025 - i).map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            <span className="to-date" style={{ margin: "0 10px" }}>to</span>
            <div className="date-select" style={{ display: "flex", gap: "10px", flex: 2 }}>
              <div style={{ flex: 1 }}>
                <select
                  value={localData.uptoMonth || ""}
                  onChange={(e) => handleChange("uptoMonth", e.target.value)}
                  className="input"
                >
                  <option value="" disabled>Month</option>
                  {[
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December",
                  ].map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <select
                  value={localData.uptoYear || ""}
                  onChange={(e) => handleChange("uptoYear", e.target.value)}
                  className="input"
                >
                  <option value="" disabled>Year</option>
                  {Array.from({ length: 60 }, (_, i) => 2025 - i).map((year) => (
                    <option key={year} value={year}>{year}</option>
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

      {/* Bullet textarea shown only when editing */}
      {editing && (
        <div className="experience-bullets" style={{ overflow: "hidden" }}>
          <textarea
            className="input bullet-input"
            value={localData.bullets.map(bullet => `• ${bullet}`).join("\n")}
            onChange={(e) =>
              handleChange(
                "bullets",
                e.target.value
                  .split("\n")
                  .map((line) => line.replace(/^•\s*/, "").trim())
              )
            }
            onKeyDown={(e) => handleKeyDown(e, localData.bullets.length - 1)}
            placeholder="Enter bullet points"
            rows={3} // Adjusted to ensure a smaller box size
            style={{
              width: "100%",
              minHeight: "80px", // Adjusted to make the box smaller
              maxHeight: "150px", // Set a max height to prevent it from growing too large
              resize: "none", // Prevents users from resizing the box
              boxSizing: "border-box", // Ensures padding is included in width calculation
            }}
          />
        </div>
      )}

      {/* No bullet list when not editing */}
      {!editing && <div className="experience-bullets" />}

      {editing && (
        <button className="delete-experience" onClick={() => onDelete(localData)}>
          Delete
        </button>
      )}
    </div>
  );
}
