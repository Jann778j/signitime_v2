export default function FieldClientProjects(props) {
  const existingProjects = props.projects.filter(
    (project) => project.client_id === props.choosenClient.client_id
  ); // Filtrer projekterne for at få kun de projekter, der tilhører den valgte klient

  return (
    // (props.choosenProject.length === 0) eller navnet på det valgte projekt er tomt (!props.choosenProject.name), så vises teksten "2. Add project". Ellers vises navnet på det valgte projekt.
    // Kommentaren under dropdown-content-container forklarer, hvordan de eksisterende projekter vises ved hjælp af map-funktionen, og når der klikkes på et projekt, opdateres det valgte projekt ved at kalde props.setChoosenProject.
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
