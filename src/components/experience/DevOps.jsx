const DevOps = () => {
    return (
      <>
        <div className="experience devops">
          <p className="experience-company-fsa">Aloinfotech</p>
          <div className="experience-description">
            <ul>
              <li>
                Infrastructure management: AWS, Docker, Kubernetes, Terraform
              </li>
              <li>Automation: CI/CD pipelines with Jenkins, GitLab CI</li>
              <li>
                Scripting & Monitoring: Bash, Python, Prometheus, Grafana
              </li>
              <li>
                Cloud & Backend: Experience with managing cloud infrastructure, including virtual machines, databases, and networking.
              </li>
              <li>
                Best practices in security, compliance, and cost optimization.
              </li>
              <li>
                Backend Development: Proficient in Node.js for building scalable backend services.
              </li>
            </ul>
          </div>
        </div>
        <div className="experience-toolkit-container">
          <div className="experience-toolkit">
            <img src="/toolkit-logos/aws.png" alt="AWS logo" />
            <img src="/toolkit-logos/docker.png" alt="Docker logo" />
            <img src="/toolkit-logos/kubernetes.png" alt="Kubernetes logo" />
            <img src="/toolkit-logos/terraform.png" alt="Terraform logo" />
            <img src="/toolkit-logos/nodejs.png" alt="Node.js logo" /> {/* Node.js logo added */}
          </div>
        </div>
      </>
    );
  };
  
  export default DevOps;
  