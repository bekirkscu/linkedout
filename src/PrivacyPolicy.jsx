import React from 'react';
import './privacypolicy.css'; // You can add styles specific to the Privacy Policy here

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <p>If you have any questions about this Privacy Policy...<a
            href="https://www.linkedin.com/in/bekir-kuscu/"
            target="_blank"
            rel="noreferrer"
            className="linkedin-icon-link"
            title="View LinkedIn Profile"
          >
            <i className="fab fa-linkedin linkedin-icon"></i>
          </a></p> 
    </div>
  );
};

export default PrivacyPolicy;
