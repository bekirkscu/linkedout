// src/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { EditSaveButton } from "./EditSaveButton";
import ExperienceItem from "./ExperienceItem";
import Education from "./Education";
import { PersonalInfo } from "./PersonalInfo";
import { Skills } from "./Skills";
import { AboutMe } from "./AboutMe";
import { db, auth, signOut } from "./firebase-config"; // Correct import for signOut
import { setDoc, doc, getDoc } from "firebase/firestore"; // Firestore functions
import "./Dashboard.css";

export default function Dashboard() {
  const [aboutMe, setAboutMe] = useState("I'm a passionate creative...");
  const [editingAbout, setEditingAbout] = useState(false);
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(false);
  const [editingEducation, setEditingEducation] = useState(false);

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

  const [skills, setSkills] = useState([]); // Ensure skills is always an array

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

  // Save CV Data to Firestore
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

      // Step 1: Log the data to confirm it's correct
      console.log("CV Data to save:", cvData); // Log data before saving

      try {
        // Step 2: Save the data to Firestore
        const docRef = doc(db, "users", userId);
        await setDoc(docRef, cvData);
        alert("CV saved successfully!"); // Alert the user upon successful save
      } catch (error) {
        // Step 3: Error handling
        console.error("Error saving CV:", error);
        alert("Failed to save CV!"); // Show error if something goes wrong
      }
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth); // Signs out the user from Firebase
      window.location.pathname = "/"; // Redirect to home/login page after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("Failed to log out.");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const fetchCvData = async () => {
          const userId = user.uid;
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const cvData = docSnap.data();
            console.log("✅ Document data:", cvData); // ✅ Add this line to inspect
            setPersonalInfo(cvData.personalInfo);
            setAboutMe(cvData.aboutMe);
            setExperience(cvData.experience);
            setEducation(cvData.education);
            setSkills(cvData.skills || []); // Ensure skills are always an array
          } else {
            console.log("⚠️ No CV found for this user.");
          }
        };

        fetchCvData();
      }
    });

    // Cleanup: Unsubscribe from the auth listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard">
      <button className="logout-button" onClick={handleLogOut}>Log Out</button> {/* Log Out button */}

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

      {/* Step 4: Add the Save CV Button */}
      <button className="save-button" onClick={handleSaveCv}>
        Save CV
      </button>
    </div>
  );
}
