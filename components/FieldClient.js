export default function FieldClient(props) {
  return (
    <div onClick={props.handleClick} className="dropdown">
      <div className="dropdown-title title">
        {props.choosenClient.length === 0 ? (
          <span className="bold">1. Add client</span>
        ) : (
          props.choosenClient.name
        )}
        <span className="arrow">↓</span>
      </div>
      <div className="dropdown-content-container">
        {props.clients.map((client) => (
          <div
            className="dropdown-content"
            onClick={() => props.setChoosenClient(client)}
            key={client.client_id}
          >
            {client.name}
          </div>
        ))}
      </div>
    </div>
  );
}
