import { format } from "date-fns";

export default function Log(props) {
  // Vi samler dato for hver log som én dato
  const date = [...new Set(props.displayedLogs.map((item) => item.created_at))];
  const parsedDate = format(date[0], "do 'of' MMM"); // Datoen formateres om til "vores" format

  return (
    <div className="display-log">
      <div className="log-container">
        <div className="luk" onClick={props.emptyArray}>
          ✕
        </div>
        <h2>
          {props.displayedLogs.length > 1
            ? // Hvis der er FLERE log, skal tekstindholdet svare dertil
              `These logs were made ${parsedDate}`
            : // Hvis der er ÉN log, skal tekstindholdet svare dertil
              `This log was made ${parsedDate}`}
        </h2>
        {/* <h2>This log was made {parsedDate}</h2> */}
        {props.displayedLogs.map((log, index) => (
          <div className="log" key={index}>
            <h3>{log.client_name}</h3>
            <p className="marked">Project:</p>
            <p>
              {log.project_name}, {log.hours} hrs
            </p>
            <p className="marked">Note:</p>
            <p>{log.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
