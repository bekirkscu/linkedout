import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle } from './firebase-config';
import './landing.css';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="brand-title">
          <span className="brand-title-wrapper">
            LinkedOut <span className="brand-subtext">(Not a serious name.)</span>
          </span>
        </h1>
        <div className="made-by">
          <span className="made-by-bold">Made by Bekir.</span>
          <span className="made-by-faint">&nbsp;Message me regarding this site on:</span>
          <a
            href="https://www.linkedin.com/in/bekir-kuscu/"
            target="_blank"
            rel="noreferrer"
            className="linkedin-icon-link"
            title="View LinkedIn Profile"
          >
            <i className="fab fa-linkedin linkedin-icon"></i>
          </a>
        </div>
      </header>

      <main className="landing-main">
        <div className="landing-content">
          <div className="landing-text">
            <h2 className="cv-title">Simple.</h2>
            <h3 className="cv-section-title">Why</h3>
            <ul className="landing-list">
  <li><strong>Time.</strong> CVs aren’t meant to be designed. Too much time is wasted "perfecting" them.</li>
  <li><strong>One link.</strong> No files. No need for downloads.</li>
  <li><strong>Limitless.</strong> Not restricted to "one page", yet clear and easy to explore.</li>
  <li><strong>Private.</strong> Your work history doesn't need to be public.</li>
  <li><strong>Effortless.</strong> Built for all — non-tech users and those with language barriers.</li>
</ul>

<div className="cv-impact-row">
  <span className="cv-impact-label">For the applicant.</span>
  <span className="cv-impact-label">For the recruiter.</span>
</div>
          </div>

          <div className="sign-in-section">
            <p className="sign-in-note">Safe and easy sign-in with your Google account.</p>
            <button className="google-button" onClick={signInWithGoogle}>
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="google-icon"
              />
              Sign in with Google
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
