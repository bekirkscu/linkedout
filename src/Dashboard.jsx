// src/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { EditSaveButton } from "./EditSaveButton";
import ExperienceItem from "./ExperienceItem";
import Education from "./Education";
import { PersonalInfo } from "./PersonalInfo";
import { Skills } from "./Skills";
import { AboutMe } from "./AboutMe";
import { db, auth, signOut } from "./firebase-config";
import { setDoc, doc, getDoc } from "firebase/firestore";
import "./Dashboard.css";

export default function Dashboard() {
  const [aboutMe, setAboutMe] = useState("I'm a passionate creative...");
  const [editingAbout, setEditingAbout] = useState(false);
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(false);
  const [editingEducation, setEditingEducation] = useState(false);
  const [user, setUser] = useState(null);

  const [experience, setExperience] = useState([
    {
      id: 1,
      jobTitle: "Experience 1",
      fromMonth: "January",
      fromYear: "2021",
      uptoMonth: "December",
      uptoYear: "2023",
      bullets: ["Designed promotional materials", "Led branding projects"],
    },
  ]);

  const [education, setEducation] = useState([
    {
      id: 1,
      jobTitle: "Bachelor of Arts in Design",
      fromMonth: "September",
      fromYear: "2017",
      uptoMonth: "June",
      uptoYear: "2020",
      bullets: ["Graduated with Honors", "Focused on Visual Communication"],
    },
  ]);

  const [personalInfo, setPersonalInfo] = useState({
    name: "Name Surname",
    location: "London, UK",
    workStatus: "Authorized to work",
    linkedinURL: "https://www.linkedin.com",
  });

  const [skills, setSkills] = useState([]);

  const handleAddExperience = () => {
    const newId = experience.length > 0 ? experience[experience.length - 1].id + 1 : 1;
    const newExp = {
      id: newId,
      jobTitle: "New Role",
      fromMonth: "January",
      fromYear: "2021",
      uptoMonth: "December",
      uptoYear: "2023",
      bullets: [""],
    };
    setExperience([...experience, newExp]);
  };

  const handleUpdateExperience = (id, updatedItem) => {
    const updatedList = experience.map((item) => (item.id === id ? updatedItem : item));
    setExperience(updatedList);
  };

  const handleDeleteExperience = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this experience?");
    if (confirmDelete) {
      const updatedList = experience.filter((item) => item.id !== id);
      setExperience(updatedList);
    }
  };

  const handleAddEducation = () => {
    const newId = education.length > 0 ? education[education.length - 1].id + 1 : 1;
    const newEdu = {
      id: newId,
      jobTitle: "New Degree",
      fromMonth: "September",
      fromYear: "2019",
      uptoMonth: "June",
      uptoYear: "2023",
      bullets: [""],
    };
    setEducation([...education, newEdu]);
  };

  const handleUpdateEducation = (id, updatedItem) => {
    const updatedList = education.map((item) => (item.id === id ? updatedItem : item));
    setEducation(updatedList);
  };

  const handleDeleteEducation = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this education entry?");
    if (confirmDelete) {
      const updatedList = education.filter((item) => item.id !== id);
      setEducation(updatedList);
    }
  };

  const handlePersonalInfoUpdate = (updatedInfo) => {
    setPersonalInfo(updatedInfo);
  };

  const handleSkillsUpdate = (updatedSkills) => {
    setSkills(updatedSkills);
  };

  const handleSaveCv = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const cvData = {
        personalInfo,
        aboutMe,
        experience,
        education,
        skills,
      };

      console.log("CV Data to save:", cvData);

      try {
        const docRef = doc(db, "users", userId);
        await setDoc(docRef, cvData);
        alert("CV saved successfully!");
      } catch (error) {
        console.error("Error saving CV:", error);
        alert("Failed to save CV!");
      }
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      window.location.pathname = "/";
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("Failed to log out.");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const fetchCvData = async () => {
          const userId = currentUser.uid;
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const cvData = docSnap.data();
            console.log("✅ Document data:", cvData);
            setPersonalInfo(cvData.personalInfo);
            setAboutMe(cvData.aboutMe);
            setExperience(cvData.experience);
            setEducation(cvData.education);
            setSkills(cvData.skills || []);
          } else {
            console.log("⚠️ No CV found for this user.");
          }
        };

        fetchCvData();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard">
      <button className="logout-button" onClick={handleLogOut}>Log Out</button>

      {/* ✅ View My CV button */}
      {user && (
        <button
          className="save-button"
          style={{ marginBottom: "20px" }}
          onClick={() => window.open(`/profile/${user.uid}`, "_blank")}
        >
          View My CV
        </button>
      )}

      <PersonalInfo
        data={personalInfo}
        onUpdate={handlePersonalInfoUpdate}
        editing={editingPersonal}
        onToggle={() => setEditingPersonal((prev) => !prev)}
      />

      <AboutMe
        aboutMe={aboutMe}
        setAboutMe={setAboutMe}
        editingAbout={editingAbout}
        setEditingAbout={setEditingAbout}
      />

      <section className="section">
        <div className="section-header">
          <h2>Experience</h2>
          <EditSaveButton
            editing={editingExperience}
            onToggle={() => setEditingExperience((prev) => !prev)}
          />
        </div>

        {experience.map((item) => (
          <ExperienceItem
            key={item.id}
            data={item}
            editing={editingExperience}
            onUpdate={(updatedItem) => handleUpdateExperience(item.id, updatedItem)}
            onDelete={() => handleDeleteExperience(item.id)}
          />
        ))}

        {editingExperience && (
          <button className="add-button" onClick={handleAddExperience}>
            + Add Experience
          </button>
        )}
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Education</h2>
          <EditSaveButton
            editing={editingEducation}
            onToggle={() => setEditingEducation((prev) => !prev)}
          />
        </div>

        {education.map((item) => (
          <Education
            key={item.id}
            data={item}
            editing={editingEducation}
            onUpdate={(updatedItem) => handleUpdateEducation(item.id, updatedItem)}
            onDelete={() => handleDeleteEducation(item.id)}
          />
        ))}

        {editingEducation && (
          <button className="add-button" onClick={handleAddEducation}>
            + Add Education
          </button>
        )}
      </section>

      <Skills data={skills} onUpdate={handleSkillsUpdate} />

      <button className="save-button" onClick={handleSaveCv}>
        Save CV
      </button>
    </div>
  );
}
