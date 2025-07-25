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
                src="/alora.png"
                alt="AI chatbot"
              />

          </div>
          <div className="project-info">
            <h2 className="project-title">ChatBot(AI,LIVE AGENT,Whatsapp BSP)</h2>
            <p>
  A multi-channel chatbot solution integrating AI responses, live agent handoff, and WhatsApp Business using Twilio API. The system handles user queries through Facebook and WhatsApp, stores interactions in MongoDB, and is powered by a Python Flask backend for efficient real-time communication.
</p>
        
            <div className="project-tools">
           
              <p>twilio api</p>
              <p>facebook api</p>
              <p>mongodb</p>
              <p>python</p>
              <p>flask</p>
           <p>mongodb</p>
           <p>Rag</p>
           <p>OpenAI api</p>
    
            </div>

          </div>
        </div>
        <div className="project">
          <div className="project-img">

              <img
                src="/ecomm.png"
                alt="Ecommerce wbsite "
              />

          </div>
          <div className="project-info">
            <h2 className="project-title">Ecommerce Webiste</h2>
            <p>
  A full-featured ecommerce platform developed using Angular for the frontend and Node.js with MongoDB on the backend. The application supports user authentication, product listings, cart management, and order processing via RESTful APIs. It also includes WhatsApp integration for real-time order updates and customer support.
</p>

            <div className="project-tools">
              <p>Nodejs</p>
              <p>Mongodb</p>
              <p>Restful APi</p>
              <p>whatsapp integration</p>
              <p>Angular</p>
              
    
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
