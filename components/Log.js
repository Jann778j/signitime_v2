import { format } from "date-fns";

export default function Log(props) {
  const date = [...new Set(props.displayedLogs.map((item) => item.created_at))];
  const parsedDate = format(date[0], "do 'of' MMM");

  return (
    <div className="display-log">
      <div className="log-container">
        <div className="luk" onClick={props.emptyArray}>
          ✕
        </div>
        <h2>
          {props.displayedLogs.length > 1
            ? `These logs were made ${parsedDate}`
            : `This log was made ${parsedDate}`}
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
