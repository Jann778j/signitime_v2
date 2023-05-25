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

      //Vi vil kun se logs, som den aktive bruger har laveet
      const logsForInitial = data.filter(
        (item) => item.initials === props.user.initials
      );

      //Her formaterer vi datoer til JS-datoer
      //Vi looper igennem array'et
      const logsWithParsedDates = logsForInitial.map((item) => ({
        ...item, //Vi vil bevare de andre informationer
        created_at: parseISO(item.created_at),
        week: getWeek(parseISO(item.created_at)), // Hvert objekt tilføres sin ugedag
        day: format(parseISO(item.created_at), "EEE"), // Hvert objekt tilføres sin dag som "Mon", "Tue" etc.
      }));

      setWorkingTables(logsWithParsedDates); //Array'et lagres i state
    }

    getData();
  }, []);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  //Her konstruerer vi tabellen:
  //Denne returnerer en tabel baseret på data i vores state workingTables
  const renderTables = () => {
    //weekNumbers oprettes ved at oprette et array af unikke ugenumre fra workingTables.
    //vha. Set undgår vi gengangere / Gør dem ugenumrene unikke
    const weekNumbers = [...new Set(workingTables.map((item) => item.week))];

    return weekNumbers.map((weekNumber) => {
      //Vi tjekker hvilke objekter der har samme ugenummer
      //Disse lagres i en const
      const matchingItems = workingTables.filter(
        (item) => item.week === weekNumber
      );

      //Tomt array som skal buges til at gemme data om clients og projects
      const clientData = [];

      //Ved hjælp af loops og if-betingelser analyseres hvert objekt i matchingItems
      //for at organisere dataene efter clients og projects i clientData.
      matchingItems.forEach((item) => {
        //Her leder vi efter om client eksisterer i overstående array
        const existingClient = clientData.find(
          (client) => client.client_id === item.client_id
        );

        if (existingClient) {
          //Hvis den gør, leder vi efter projekter med samme client_id
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
          //Vi bruger push, fordi clientData er et array
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

      //Her renderer vi rækkerne i tabellen, baseret på projekter og ugenumre
      const renderTableRows = (projects, weekNumber) => {
        const projectData = projects.map((project) => {
          const dayData = daysOfWeek.map((day) => {
            const matchingDay = project.matchingItems.find(
              (dayItem) => dayItem.day === day && dayItem.week === weekNumber
            );

            return matchingDay ? (
              <td className="text-center" key={day}>
                {matchingDay.hours}
              </td>
            ) : (
              <td className="text-center" key={day}>
                -
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
