//Libraries
import { useEffect, useState } from "react";
import { format } from "date-fns";

//Components
import FieldClient from "./FieldClient";
import FieldClientProjects from "./FieldClientProjects";
import FieldHours from "./FieldHours";
import FieldComment from "./FieldComment";
import Table from "./Table";

export default function LoggedIn(props) {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [choosenClient, setChoosenClient] = useState([]);
  const [choosenProject, setChoosenProject] = useState([]);
  const [hours, setHours] = useState(0);
  const [notes, setNotes] = useState("");
  const [activeButton, setActiveButton] = useState(false);

  useEffect(() => {
    async function getData() {
      const { data, error } = await props.supabase.from("signitime-clients")
        .select(`
          name, 
          client_id
          `);
      setClients(data);
    }

    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const { data, error } = await props.supabase.from("signitime-projects")
        .select(`
          name, 
          client_id, 
          project_id
          `);
      setProjects(data);
    }
    getData();
  }, []);

  const handleSubmit = () => {
    async function insertData() {
      const { data, error } = await props.supabase
        .from("signitime-logs")
        .upsert({
          hours: hours,
          notes: notes,
          project_id: choosenProject.project_id,
          project_name: choosenProject.name,
          client_id: choosenClient.client_id,
          client_name: choosenClient.name,
          initials: props.user.initials,
        });
      // console.log(data);
    }

    insertData();
  };

  const day = format(new Date(), "do 'of' MMM"); // Setting the welcoming date

  //Toggle display block on dropdown
  const handleClick = (evt) => {
    // console.log("clicked", evt.target.closest(".dropdown"));
    evt.target.closest(".dropdown").classList.toggle("display-content");
  };

  // Making submitbutton ready...
  useEffect(() => {
    if (
      choosenClient.length !== 0 &&
      choosenProject.length !== 0 &&
      hours !== 0 &&
      notes.length >= 20
    ) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }, [choosenClient, choosenProject, hours, notes]);

  // console.log(activeButton);

  const logArray = [choosenClient.name, choosenProject.name, hours, notes];
  // console.log(logArray);
  // console.log("From LoggedIn: ", props.supabase);

  return (
    <>
      <div>
        <h1>
          Hello {props.user.first_name}, <br />
          today's the {day}
        </h1>
        <div className="info-hover-container">
          <span className="hover-trigger">?</span>
          <span className="hover-info">Additional information</span>
        </div>
        <div className="form-wrapper">
          <div>
            <FieldClient
              clients={clients}
              choosenClient={choosenClient}
              setChoosenClient={setChoosenClient}
              handleClick={handleClick}
            />
            <FieldClientProjects
              choosenClient={choosenClient}
              choosenProject={choosenProject}
              projects={projects}
              setChoosenProject={setChoosenProject}
              handleClick={handleClick}
            />
            <FieldHours hours={hours} setHours={setHours} />
          </div>
          <FieldComment notes={notes} setNotes={setNotes} />
        </div>
        {/* <button onClick={handleLogout}>Logout</button> */}
      </div>
      <div className="button-wrapper">
        <button
          disabled={!activeButton}
          className="submit rounded-corners"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <Table supabase={props.supabase} user={props.user} />
      {/* <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Project</th>
            <th>Hours</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {logArray.map((log) => (
              <td>{log}</td>
            ))}
          </tr>
        </tbody>
      </table> */}
    </>
  );
}
