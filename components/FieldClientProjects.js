export default function FieldClientProjects(props) {
  const existingProjects = props.projects.filter(
    (project) => project.client_id === props.choosenClient.client_id
  );

  return (
    <div onClick={props.handleClick} className="dropdown">
      <div className="dropdown-title title">
        {props.choosenProject.length === 0 || !props.choosenProject.name
          ? "2. Add project"
          : props.choosenProject.name}
        <span className="arrow">↓</span>
      </div>
      <div className="dropdown-content-container">
        {existingProjects.map((clientProject) => (
          <div
            key={clientProject.project_id}
            onClick={() => props.setChoosenProject(clientProject)}
            className="dropdown-content"
          >
            {clientProject.name}
          </div>
        ))}
      </div>
    </div>
  );
}
