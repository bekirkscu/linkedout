import React, { useState, useEffect } from "react";

export default function ExperienceItem({
  data,
  editing,
  onUpdate,
  onDelete,
}) {
  const [localData, setLocalData] = useState({
    ...data,
    bullets: Array.isArray(data.bullets) ? data.bullets : [],
    isCurrently: data.uptoMonth === "Currently" ? true : false,
  });

  useEffect(() => {
    if (data) {
      setLocalData({
        ...data,
        bullets: Array.isArray(data.bullets) ? data.bullets : [],
        isCurrently: data.uptoMonth === "Currently" ? true : false,
      });
    }
  }, [data]);

  const handleChange = (field, value) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate(updated);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const updated = [...localData.bullets, "• "];
      handleChange("bullets", updated);
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
    return "Month Year - Month Year";
  };

  const handleEndMonthChange = (e) => {
    const month = e.target.value;
    setLocalData((prevData) => {
      const updatedData = { ...prevData, uptoMonth: month };
      if (month === "Currently") {
        updatedData.uptoYear = "";
        updatedData.isCurrently = true;
      } else {
        updatedData.isCurrently = false;
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
                  onChange={handleEndMonthChange}
                  className="input"
                >
                  <option value="" disabled>Month</option>
                  {[
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December", "Currently",
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
                  disabled={localData.isCurrently}
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

      {editing && (
        <div className="bullet-points">
          <textarea
            value={
              localData.bullets.length === 0
                ? "• "
                : localData.bullets.join("\n")
            }
            onChange={(e) => {
              const lines = e.target.value.split("\n");
              const bullets = lines.map((line) =>
                line.startsWith("•") ? line : `• ${line}`
              );
              handleChange("bullets", bullets.filter(b => b.trim() !== "•"));
            }}
            onKeyDown={handleKeyDown}
            rows={Math.max(3, localData.bullets.length)}
            className="input"
          />
        </div>
      )}

      {editing && (
        <button className="delete-experience" onClick={() => onDelete(localData)}>
          Delete Experience
        </button>
      )}
    </div>
  );
}
