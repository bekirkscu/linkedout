// PersonalInfo.jsx
import React, { useState, useEffect } from "react";
import { Pencil, Save } from "lucide-react";  // import icons

export function PersonalInfo({ data, onUpdate, editing, onToggle }) {
  const [localData, setLocalData] = useState({ ...data });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(localData);  // Save the data
    onToggle();  // Toggle back to non-edit mode (after save)
  };

  useEffect(() => {
    setLocalData({ ...data }); // Reset data if the main data prop changes
  }, [data]);

  return (
    <section className="section">
      <div className="section-header">
        <h2>Basic Information</h2>
        {/* Pen icon now triggers edit mode */}
        <button onClick={handleSave} className="icon-button" title={editing ? "Save" : "Edit"}>
          {editing ? <Save size={18} /> : <Pencil size={18} />}
        </button>
      </div>
      <div className="personal-info">
        <div className="info-field">
          <label htmlFor="name">Name Surname</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name Surname"
            value={localData.name}
            onChange={handleChange}
            disabled={!editing}  // Disable input when not in editing mode
          />
        </div>
        <div className="info-field">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="City, Country"
            value={localData.location}
            onChange={handleChange}
            disabled={!editing}  // Disable input when not in editing mode
          />
        </div>
        <div className="info-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="youremail@email.com"
            value={localData.email}
            onChange={handleChange}
            disabled={!editing} // Disable input when not in editing mode
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"  // Basic email validation
            required
          />
        </div>
        <div className="info-field">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="+441234567890"
            value={localData.phoneNumber}
            onChange={handleChange}
            disabled={!editing} // Disable input when not in editing mode
            pattern="^[+]?\d+$" // Only allow digits and '+' sign
            required
          />
        </div>
        <div className="info-field">
          <label htmlFor="workStatus">Work Status</label>
          <input
            type="text"
            id="workStatus"
            name="workStatus"
            placeholder="Allowed to work in the UK, Citizen, etc."
            value={localData.workStatus}
            onChange={handleChange}
            disabled={!editing}  // Disable input when not in editing mode
          />
        </div>
        <div className="info-field">
          <label htmlFor="linkedinURL">LinkedIn URL</label>
          <input
            type="url"
            id="linkedinURL"
            name="linkedinURL"
            placeholder="https://www.linkedin.com"
            value={localData.linkedinURL}
            onChange={handleChange}
            disabled={!editing} // Disable input when not in editing mode
          />
        </div>
      </div>
    </section>
  );
}
