import { useState, useEffect } from "react";

export default function Table(props) {
  const [tableLogs, setTableLogs] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data, error } = await props.supabase
        .from("signitime-logs")
        .select(`notes, client_name, project_name, hours, initials`);
      //   setTableLogs(data);
      if (error) {
        console.error(error);
      } else {
        // Filter the data array based on logged-in initials
        const filteredData = data.filter((item) =>
          props.user.initials.includes(item.initials)
        );
        setTableLogs(filteredData);
      }
    }
    getData();
  }, []);

  console.log(tableLogs);

  return (
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
        {tableLogs.map((log) => (
          <tr>
            <td>{log.client_name}</td>
            <td>{log.project_name}</td>
            <td>{log.hours}</td>
            <td>{log.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
