// src/AboutMe.jsx
import React from "react";
import { EditSaveButton } from "./EditSaveButton";

export function AboutMe({ aboutMe, setAboutMe, editingAbout, setEditingAbout }) {
  return (
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
          className="aboutme-textarea"
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          rows={1}
        />
      ) : (
        <p className="aboutme-text">{aboutMe}</p>
      )}
    </section>
  );
}
