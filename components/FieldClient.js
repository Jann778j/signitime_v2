export default function FieldClient(props) {
  return (
    //dropdown-title forklarer, at hvis der ikke er valgt en klient (props.choosenClient.length === 0), vises teksten "1. Add client" i fed skrift.
    //Hvis der er valgt en klient, vises navnet på den valgte klient.
    <div onClick={props.handleClick} className="dropdown">
      <div className="dropdown-title title">
        {props.choosenClient.length === 0 ? (
          <span className="bold">1. Add client</span>
        ) : (
          props.choosenClient.name
        )}
        <span className="arrow">↓</span>
      </div>
      {/* Kommentaren under dropdown-content-container forklarer, hvordan de
      eksisterende klienter vises ved hjælp af map-funktionen. Når der klikkes
      på en klient, opdateres den valgte klient ved at kalde
      props.setChoosenClient og props.setChoosenProject({}) for at nulstille det
      valgte projekt. */}
      <div className="dropdown-content-container">
        {props.clients.map((client) => (
          <div
            className="dropdown-content"
            onClick={() => {
              props.setChoosenClient(client);
              props.setChoosenProject({});
            }}
            key={client.client_id}
          >
            {client.name}
          </div>
        ))}
      </div>
    </div>
  );
}
