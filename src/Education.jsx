import React, { useState, useEffect } from "react";

export default function Education({ data, editing, onUpdate, onDelete }) {
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

  const handleBulletChange = (index, value) => {
    const updatedBullets = [...localData.bullets];
    updatedBullets[index] = value;
    handleChange("bullets", updatedBullets);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const updatedBullets = [...localData.bullets];
      updatedBullets.splice(index + 1, 0, "");
      handleChange("bullets", updatedBullets);
    }
  };

  const formatDateRange = () => {
    if (localData.fromMonth && localData.fromYear && localData.uptoMonth && localData.uptoYear) {
      return `${localData.fromMonth} ${localData.fromYear} - ${localData.uptoMonth} ${localData.uptoYear}`;
    }
    return "Month Year - Month Year";
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
              style={{ flex: 7 }}
            />
            <div className="date-select" style={{ display: "flex", gap: "10px", flex: 3 }}>
              <div style={{ flex: 1 }}>
                <select
                  value={localData.fromMonth || ""}
                  onChange={(e) => handleChange("fromMonth", e.target.value)}
                  className="input"
                >
                  <option value="" disabled>Month</option>
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
                  <option value="" disabled>Year</option>
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
                  <option value="" disabled>Month</option>
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
                  <option value="" disabled>Year</option>
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
              {formatDateRange()}
            </span>
          </>
        )}
      </div>

      <div className="experience-bullets">
        {editing ? (
          <textarea
            className="input bullet-input"
            value={localData.bullets.map(bullet => `• ${bullet}`).join("\n")}
            onChange={(e) => handleChange("bullets", e.target.value.split("\n").map((item) => item.replace("• ", "").trim()))}
            onKeyDown={(e) => handleKeyDown(e, localData.bullets.length - 1)}
            placeholder="Enter bullet points"
            rows={1}
            style={{ width: "100%", minHeight: "100px" }}
          />
        ) : (
          <div className="bullets">
            {localData.bullets.map((bullet, index) => (
              <div key={index} className="bullet-item">
                <span>&#8226; {bullet}</span>
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
