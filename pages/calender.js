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

      // Filter logs for the active user
      const logsForInitial = data.filter(
        (item) => item.initials === props.user.initials
      );

      // Parse dates
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
        const key = `${item.client_id}-${item.project_name}`;
        const existingClient = clientData.find(
          (client) => client.client_id === item.client_id
        );

        if (existingClient) {
          const existingProject = existingClient.projects.find(
            (project) => project.key === key
          );

          if (existingProject) {
            existingProject.matchingItems.push(item);
          } else {
            existingClient.projects.push({
              key,
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
                key,
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
            let totalHours = 0; // Variable for total hours to add on

            // Iterate over matching items and add their hours to the variable
            project.matchingItems.forEach((dayItem) => {
              if (dayItem.day === day && dayItem.week === weekNumber) {
                totalHours += dayItem.hours;
              }
            });

            return (
              <td className="text-center" key={day}>
                {totalHours.toLocaleString("da-DK")}
              </td>
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

      let totalAllHours = 0;

      matchingItems.forEach((item) => {
        console.log(item.hours);
        totalAllHours += item.hours;
      });

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

          <div className="total-hours hours-padding">
            Total hours:
            <span className="marked">
              {totalAllHours.toLocaleString("da-DK")}
            </span>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {props.loggedIn ? (
        <>
          <div>
            <h1>Here is your weekly overview, {props.user.first_name}</h1>
          </div>
          {renderTables()}
        </>
      ) : (
        <NotLoggedIn />
      )}
    </>
  );
}
