import { parseISO } from "date-fns";

export default function Log(props) {
  console.log(props.displayedLogs);
  return (
    <div className="display-log">
      <div className="log-container">
        <div className="luk" onClick={props.emptyArray}>
          ✕
        </div>
        <h2>Logged</h2>
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
