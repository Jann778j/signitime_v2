import { useState, useEffect } from "react";
import SubmitScreen from "./SubmitScreen";

export default function Table(props) {
  const [click, setClick] = useState(false);
  let totalHours = 0;
  props.tableArray.forEach((item) => {
    totalHours = totalHours += item.hours;
  });

  console.log(totalHours);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Project</th>
            <th>Hours</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {props.tableArray.map((log) => (
            <tr>
              <td>{log.client_name}</td>
              <td>{log.project_name}</td>
              <td>{log.hours}</td>
              <td>{log.notes}</td>
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tfoot> */}
      </table>
      <div className="total-hours">
        Total hours: <span className="marked">{totalHours}</span>
      </div>
      <div className="button-wrapper">
        <button
          onClick={() => setClick(true)}
          className="submit rounded-corners"
        >
          Save for today
        </button>
      </div>

      {click ? <SubmitScreen setClick={setClick} /> : ""}
    </>
  );
}
