import { useState, useEffect } from "react";
import SubmitScreen from "./SubmitScreen";

export default function Table(props) {
  const [click, setClick] = useState(false); // State hook til at gemme klikstatus
  let totalHours = 0; // Initialiserer en variabel til at gemme det totale antal timer
  props.tableArray.forEach((item) => {
    totalHours = totalHours += item.hours; // Beregner det totale antal timer ved at lægge timerne fra hvert element i tableArray til totalHours
  });

  return (
    <>
      <div className="table-div">
        <table>
          <thead className="table-day">
            <tr>
              <th className="not-hover blue-bg">Client</th>
              <th>Project</th>
              <th>Hours</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {props.tableArray.map((log) => (
              <tr>
                <td className="not-hover white-bg">{log.client_name}</td>
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
      </div>
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
