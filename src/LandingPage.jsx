import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle } from './firebase-config';
import './landing.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState(""); // State for error message

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSignIn = () => {
    // Check if consent is given
    if (!consent) {
      setError("You must consent to the privacy policy before signing in.");
      return; // Don't proceed with sign-in
    }

    // Clear any stored data before signing in
    localStorage.clear();
    sessionStorage.clear();

    // Proceed with sign-in
    signInWithGoogle();
  };

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
            <h3 className="cv-section-title">Why?</h3>
            <ul className="landing-list">
              <li><strong>Time.</strong> CVs aren’t meant to be designed. Too much time is wasted "perfecting" them.</li>
              <li><strong>One link.</strong> No files. No attachments. No need for downloads.</li>
              <li><strong>Limitless.</strong> Not restricted to "one page" yet easy to explore. What seems like "irrelevant" experience - can reveal more about a person than work history.</li>
              <li><strong>Authentic.</strong> Express your life experiences with freedom. Whether it’s voluntary work, personal challenges, or pregnancy - these experiences can reveal more character than years at a job.</li>
              <li><strong>Private.</strong> Your work history doesn't need to be public. It shouldn’t be just another part of your 'social image'.</li>
              <li><strong>Effortless.</strong> Built for all — non-tech users and those facing language barriers.</li>
              <li><strong>Choice.</strong> When viewing CVs, choose what you'd like to read.</li>
            </ul>

            <div className="cv-impact-row">
              <span className="cv-impact-label">For the applicant.</span>
              <span className="cv-impact-label">For the recruiter.</span>
              <span className="cv-impact-label">For you.</span>
            </div>
          </div>

          <div className="sign-in-section">
            {/* Show error message if consent is not given */}
            {error && <p className="error-message">{error}</p>}
            <p className="sign-in-note">Safe and easy sign-in with your Google account.</p>
            <button className="google-button" onClick={handleSignIn} disabled={!consent}>
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="google-icon"
              />
              Sign in with Google
            </button>
            {/* Consent checkbox section placed above the Google button */}
            <div className="consent-checkbox-container">
              <input 
                type="checkbox" 
                checked={consent}
                onChange={() => setConsent(!consent)}
              />
              <label>
                I consent to the collection and processing of my data in accordance with the 
                <a href="/privacy-policy"> privacy policy</a>.
              </label>
            </div>

            {/* Soft message next to the Google button when checkbox is unticked */}
            {!consent && !error && (
              <p className="consent-message">Please tick the box to consent before signing in.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
