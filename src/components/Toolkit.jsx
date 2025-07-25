import "../pages/About.css";

const Toolkit = () => {
  return (
    <div className="toolkit-container">
      <p id="toolkit" className="toolkit-bg-header">
        Toolkit
      </p>
      <div className="toolkit">
      <div className="tool-section cloud">
          <p className="tool-section-header learning-header">Cloud</p>
          <div className="tool-logos">
          <div className="single-tool-container">
              <img src="/toolkit-logos/aws.png" alt="node logo" />
              <p>AWS</p>
            </div>
            <div className="single-tool-container">
              <img src="/toolkit-logos/docker.png" alt="java logo" />
              <p>Docker</p>
            </div>
            <div className="single-tool-container">
              <img src="/toolkit-logos/kubernetes.png" alt="java logo" />
              <p>kubernetes</p>
            </div>
            <div className="single-tool-container">
              <img src="/toolkit-logos/terraform.png" alt="java logo" />
              <p>terraform</p>
            </div>
            <div className="single-tool-container">
              <img src="/toolkit-logos/ansible.png" alt="anisble logo" />
              <p>Ansible</p>
            </div>
            <div className="single-tool-container">
              <img src="/toolkit-logos/jenkins.png" alt="anisble logo" />
              <p>jenkins</p>
            </div>
            <div className="single-tool-container">
              <img src="/toolkit-logos/prometheu.png" alt="Prometheus logo" />
              <p>Prometheus</p>
            </div>
            <div className="single-tool-container">
              <img src="/toolkit-logos/grafana.webp" alt="Prometheus logo" />
              <p>Grafana</p>
            </div>
          </div>
        </div>
        <div className="tool-section backend">
          <p className="tool-section-header backend-header">Backend</p>
          <div className="tool-logos">
          <div className="single-tool-container">
              <img src="/toolkit-logos/node.png" alt="node logo" />
              <p>Nodejs</p>
            </div>
            <div className="single-tool-container">
              <img src="/toolkit-logos/express.png" alt="node logo" />
              <p>Express</p>
            </div>
         
            <div className="single-tool-container">
              <img src="/toolkit-logos/python.png" alt="python logo" />
              <p>Python</p>
            </div>
  
          </div>
        </div>
        <div className="tool-section frontend">
          <p className="tool-section-header frontend-header">Frontend</p>
          <div className="tool-logos">
    
            <div className="single-tool-container">
              <img src="/toolkit-logos/html.png" alt="html logo" />
              <p>HTML</p>
            </div>
            <div className="single-tool-container">
              <img src="/toolkit-logos/css.png" alt="css logo" />
              <p>CSS</p>
            </div>
            <div className="single-tool-container">
              <img src="/toolkit-logos/javascript.png" alt="javascript logo" />
              <p>JavaScript</p>
            </div>
            <div className="single-tool-container">
              <img src="/toolkit-logos/react.png" alt="react logo" />
              <p>React.js</p>
            </div>
          </div>
        </div>
      
        <div className="tool-section tools">
          <p className="tool-section-header tools-header">Tools</p>
          <div className="tool-logos">
          <div className="single-tool-container">
              <img src="/toolkit-logos/vscode.png" alt="vscode logo" />
              <p>VS Code</p>
            </div>
            <div className="single-tool-container">
              <img src="/toolkit-logos/git.png" alt="git logo" />
              <p>Git</p>
            </div>
      

            <div className="single-tool-container">
              <img src="/toolkit-logos/github.png" alt="github logo" />
              <p>GitHub</p>
            </div>
            <div className="single-tool-container">
              <img src="/toolkit-logos/gitlab.png" alt="github logo" />
              <p>Gitlab</p>
            </div>
          </div>
        </div>
        <div className="tool-section learning">
          <p className="tool-section-header learning-header">Learning</p>
          <div className="tool-logos">
         
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolkit;
