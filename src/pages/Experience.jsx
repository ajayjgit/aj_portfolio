import { useEffect, useState } from "react";
import FSA from "../components/experience/FSA";
import DevOps from "../components/experience/DevOps"; // Make sure DevOps component is imported
import "./Experience.css";

const Experience = () => {
  const [fsa, setFSA] = useState(false);  // FSA is hidden initially
  const [devOps, setDevOps] = useState(true);  // DevOps is shown by default

  const handleFSAClick = () => {
    setFSA(true);     // Show FSA experience
    setDevOps(false); // Hide DevOps experience
  };

  const handleDevOpsClick = () => {
    setDevOps(true);  // Show DevOps experience
    setFSA(false);    // Hide FSA experience
  };

  useEffect(() => {
    const page = document.querySelector(".App");
    setTimeout(() => {
      page.classList.remove("animate_content");
    }, 2000);
  });

  return (
    <div className="experience-container">
      <p className="experience-header">Experience</p>
      <div className="experience-terminal-container">
        <div className="experience-terminal-header">
          <div className="header-btns">
            <div className="header-btn header-btn1"></div>
            <div className="header-btn header-btn2"></div>
            <div className="header-btn header-btn3"></div>
          </div>
          <div className="header-text">
            <p>Ajay Portfolio</p>
          </div>
        </div>
        <div className="terminal-body">
          <div className="terminal-bg-text">
            <p></p>
            <div className="experience-terminal-btns">
              <button
                onClick={handleDevOpsClick}  // Set DevOps as default
                className="experience-terminal-btn terminal-btn1"
              >
                DevOps Engineer - Present &#8594;
              </button>
              <button
                onClick={handleFSAClick}
                className="experience-terminal-btn terminal-btn2"
              >
                Cloud & Backend Developer &#8594;
              </button>
            </div>
          </div>
          <div className="terminal-content">
            <div className="terminal-experience-text">
              {devOps && <DevOps />}  {/* Show DevOps section by default */}
              {fsa && <FSA />}  {/* Show FSA section when clicked */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
