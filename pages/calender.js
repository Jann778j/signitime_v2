import { useEffect, useState } from "react";
import { parseISO, getWeek, format } from "date-fns";
import NotLoggedIn from "@/components/NotLoggedIn";

export default function User(props) {
  const [workingTables, setWorkingTables] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data, error } = await props.supabase.from("signitime-logs")
        .select(`
          hours,
          initials,
          client_name,
          client_id,
          project_name,
          created_at
        `);

      const logsForInitial = data.filter(
        (item) => item.initials === props.user.initials
      );

      const logsWithParsedDates = logsForInitial.map((item) => ({
        ...item,
        created_at: parseISO(item.created_at),
        week: getWeek(parseISO(item.created_at)),
        day: format(parseISO(item.created_at), "EEE"),
      }));

      setWorkingTables(logsWithParsedDates);
    }

    getData();
  }, []);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const renderTables = () => {
    const weekNumbers = [...new Set(workingTables.map((item) => item.week))];

    return weekNumbers.map((weekNumber) => {
      const matchingItems = workingTables.filter(
        (item) => item.week === weekNumber
      );

      const clientData = [];

      matchingItems.forEach((item) => {
        const existingClient = clientData.find(
          (client) => client.client_id === item.client_id
        );

        if (existingClient) {
          const existingProject = existingClient.projects.find(
            (project) => project.client_id === item.client_id
          );

          if (existingProject) {
            existingProject.matchingItems.push(item);
          } else {
            existingClient.projects.push({
              project_name: item.project_name,
              matchingItems: [item],
            });
          }
        } else {
          clientData.push({
            client_id: item.client_id,
            client_name: item.client_name,
            projects: [
              {
                project_name: item.project_name,
                matchingItems: [item],
              },
            ],
          });
        }
      });

      const renderTableRows = (projects, weekNumber) => {
        const projectData = projects.map((project) => {
          const dayData = daysOfWeek.map((day) => {
            const matchingDay = project.matchingItems.find(
              (dayItem) => dayItem.day === day && dayItem.week === weekNumber
            );

            return matchingDay ? (
              <td key={day}>{matchingDay.hours}</td>
            ) : (
              <td key={day}>-</td>
            );
          });

          return (
            <>
              <td>{project.project_name}</td>
              {dayData}
            </>
          );
        });

        return projectData;
      };

      return (
        <div key={weekNumber}>
          <h2>Week {weekNumber}</h2>
          <table className="calender-table">
            <thead>
              <tr>
                <th></th>
                {daysOfWeek.map((day) => (
                  <th key={day} className={day}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            {clientData.map((client) => (
              <tbody key={client.client_id}>
                <tr>
                  <td className="client-header">{client.client_name}</td>
                  <td className="client-header"></td>
                  <td className="client-header"></td>
                  <td className="client-header"></td>
                  <td className="client-header"></td>
                  <td className="client-header"></td>
                </tr>
                {client.projects.map((project) => (
                  <tr key={`${client.client_id}-${project.project_name}`}>
                    {renderTableRows([project], weekNumber)}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      );
    });
  };

  return (
    <>
      {props.loggedIn ? (
        <>
          <div>
            <h1>Here is your overview, {props.user.first_name}</h1>
          </div>
          {renderTables()}
        </>
      ) : (
        <NotLoggedIn />
      )}
    </>
  );
}
