export default function Table(props) {
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
        {props.tableArray.map((log) => (
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
