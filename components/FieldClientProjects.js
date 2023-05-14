export default function FieldClientProjects(props) {
  const existingProjects = props.projects.filter(
    (project) => project.client_id === props.choosenClient.client_id
  );

  return (
    <div className="dropdown">
      <div className="dropdown-title title">
        {props.choosenProject.length === 0
          ? "2. Add project"
          : props.choosenProject.name}
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