import { useEffect, useState } from "react";
import { parseISO, getWeek, format } from "date-fns";
import Log from "@/components/Log";
import NotLoggedIn from "@/components/NotLoggedIn";

export default function User(props) {
  const [workingTables, setWorkingTables] = useState([]); // State hook til at gemme logs
  const [displayedLogs, setDisplayedLogs] = useState([]);
  useEffect(() => {
    async function getData() {
      const { data, error } = await props.supabase.from("signitime-logs")
        .select(`
          hours,
          initials,
          client_name,
          client_id,
          project_name,
          created_at,
          notes 
        `);

      // Filter logs for the active user
      const logsForInitial = data.filter(
        (item) => item.initials === props.user.initials
      );

      // Analyser datoer
      //parseISO() er en funktion fra date-fns-biblioteket, der bruges til at konvertere en streng i ISO 8601-format til en JavaScript Date-objekt.
      //fx. yyyy-mm-dd
      //vi bruger den til at fodele de loggede timer ud på de rigtige dage????
      const logsWithParsedDates = logsForInitial.map((item) => ({
        ...item,
        created_at: parseISO(item.created_at), // Konverterer created_at datoer til JavaScript Date objekter ved hjælp af parseISO fra date-fns
        week: getWeek(parseISO(item.created_at)), // Får ugenummeret fra en given dato ved hjælp af getWeek fra date-fns
        day: format(parseISO(item.created_at), "EEE"), // Får dagen i ugen i forkortet form (f.eks. "Mon", "Tue") ved hjælp af format fra date-fns
      }));

      setWorkingTables(logsWithParsedDates); // Opdaterer arbejdstabellerne med hentede data
    }

    getData();
  }, []);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"]; // Array med ugedage

  const showLog = (day, weekNumber, project) => {
    return () => {
      const logs = workingTables.filter(
        (log) =>
          log.day === day &&
          log.week === weekNumber &&
          log.project_name == project.project_name
      );
      setDisplayedLogs(logs);
    };
  };

  const emptyArray = () => {
    setDisplayedLogs([]);
  };

  // Find unikke ugenumre baseret på arbejdstabeller. Sorter dem så højeste ugetal kommer først
  const renderTables = () => {
    const weekNumbers = [
      ...new Set(workingTables.map((item) => item.week)),
    ].sort((a, b) => b - a);

    // her mapper vi igennem de forskellige ugenumre og filtrere gennem workingtables hvilke timer der hører til de forkellige ugenumre
    // herefter bliver de matchende elemter gemt i variablen kaldet "mathingItems"
    return weekNumbers.map((weekNumber) => {
      const matchingItems = workingTables.filter(
        (item) => item.week === weekNumber
      );

      const clientData = [];

      // Iterer over matchende elementer og organiser dem efter klient og projekt
      // Inden for hver iteration genereres en nøgle ved at kombinere client_id og project_name for det aktuelle element.
      matchingItems.forEach((item) => {
        const key = `${item.client_id}-${item.project_name}`;
        // her tjekker den efter om der er en anden client i "clientData"-listen som har det samme id
        //hvis der er et match søger den videre efter it match på projectet der tilhører client
        const existingClient = clientData.find(
          (client) => client.client_id === item.client_id
        );

        //her søger den efter om der også er et matchene projekt.
        if (existingClient) {
          const existingProject = existingClient.projects.find(
            (project) => project.key === key
          );

          // hvis en client matcher på både client id og på project id så bliver de skubbet sammen
          //altså bliver de lagt sammen som en linje i tabellen
          if (existingProject) {
            existingProject.matchingItems.push(item);
          } else {
            existingClient.projects.push({
              key,
              project_name: item.project_name,
              matchingItems: [item],
            });
          }

          //hvis de ikke matcher bliver de lagt på en linje for dem selv i tabellen
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

      // Generer HTML-tabeller for klientdata og projektdata
      const renderTableRows = (projects, weekNumber) => {
        const projectData = projects.map((project) => {
          const dayData = daysOfWeek.map((day) => {
            let totalHours = 0; // Variable for total hours to add on

            // Iterer over matchende elementer og læg deres timer til variablen
            //dette er de timer der fx. bliver lagt sammen så en client og projekt har flere match
            project.matchingItems.forEach((dayItem) => {
              if (dayItem.day === day && dayItem.week === weekNumber) {
                totalHours += dayItem.hours;
              }
            });

            return (
              <>
                <td
                  onClick={showLog(day, weekNumber, project)}
                  className="text-center"
                  key={day}
                >
                  {totalHours.toLocaleString("da-DK")}
                </td>
              </>
            );
          });

          return (
            <>
              <td className="not-hover white-bg">{project.project_name}</td>
              {dayData}
            </>
          );
        });

        return projectData;
      };

      let totalAllHours = 0;

      // Beregn det samlede antal timer for den aktuelle uge
      //denne bergenger det samlede antal timer for hele ugen
      matchingItems.forEach((item) => {
        totalAllHours += item.hours;
      });

      return (
        <div key={weekNumber}>
          <h2>Week {weekNumber}</h2>
          <div className="table-div">
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
                    <td className="client-header not-hover">
                      {client.client_name}
                    </td>
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
          {displayedLogs.length > 0 && (
            <Log emptyArray={emptyArray} displayedLogs={displayedLogs} />
          )}
        </>
      ) : (
        <NotLoggedIn />
      )}
    </>
  );
}
