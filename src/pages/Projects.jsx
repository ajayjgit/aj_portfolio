import { useEffect } from "react";
import "./Projects.css";

const Projects = () => {
  useEffect(() => {
    const page = document.querySelector(".App");
    setTimeout(() => {
      page.classList.remove("animate_content");
    }, 2000);
  });
  return (
    <div className="projects-page-container">
    
      <div id="project" className="projects-container">
      <div className="project">
          <div className="project-img">

              <img
                src="/flu.png"
                alt="flutter app"
              />

          </div>
          <div className="project-info">
            <h2 className="project-title">Mobile Application</h2>
            <p>

Building an eCommerce app with Flutter, I integrated PHP and MySQL through REST API, harnessing the power of Flutter's Dart for dynamic functionality. This synergy ensures a seamless 
shopping experience, combining the versatility of Flutter with the robustness of PHP and MySQL for efficient transaction management.
            </p>
            <p>
           
            </p>
            <div className="project-tools">
              <p>Flutter</p>
              <p>Dart</p>
              <p>php</p>
              <p>MySql</p>
              <p>RestApi</p>
           
    
            </div>

          </div>
        </div>
        <div className="project">
          <div className="project-img">

              <img
                src="/ecom.png"
                alt="Ecommerce wbsite "
              />

          </div>
          <div className="project-info">
            <h2 className="project-title">Ecommerce Webiste</h2>
            <p>
            Developed an eCommerce website utilizing PHP and MySQL for a robust backend, while Bootstrap CSS, HTML, and JavaScript provided a sleek and responsive frontend.
             This fusion of technologies ensures seamless functionality and an engaging user experience, driving success in online retail.
            </p>
            <p>
           
            </p>
            <div className="project-tools">
              <p>php</p>
              <p>MySql</p>
              <p>Javascript</p>
              <p>Bootstrap</p>
              <p>Html</p>
              <p>CSS</p>
    
            </div>

          </div>
        </div>
        <div className="project">
          <div className="project-img">

              <img
                src="/hot.PNG"
                alt="Hotel Booking Webiste"
              />

          </div>
          <div className="project-info">
            <h2 className="project-title">Hotel Booking Webiste</h2>
            <p>
            Crafting a Hotel Booking website, I integrated PHP and MySQL for a powerful backend, while leveraging Bootstrap CSS, HTML, and JavaScript for an intuitive and visually appealing frontend. This dynamic 
            combination ensures seamless reservation management and an enticing user interface, enhancing the hospitality experience for guests.
            </p>

            <div className="project-tools">
            <p>php</p>
              <p>MySql</p>
              <p>Javascript</p>
              <p>Bootstrap</p>
              <p>Html</p>
              <p>CSS</p>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
