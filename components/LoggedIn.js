import { useEffect, useState } from "react";
import { format, isToday } from "date-fns";

import FieldClient from "./FieldClient";
import FieldClientProjects from "./FieldClientProjects";
import FieldHours from "./FieldHours";
import FieldComment from "./FieldComment";

export default function LoggedIn(props) {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [choosenClient, setChoosenClient] = useState([]);
  const [choosenProject, setChoosenProject] = useState([]);
  const [hours, setHours] = useState(0);
  const [notes, setNotes] = useState("");

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

  // console.log(format(new Date(), "MMM"));
  // const month = format(new Date(), "MMM");
  const day = format(new Date(), "do 'of' MMM");
  console.log(day);

  return (
    <>
      <div>
        <h1>
          Hello {props.user.first_name}, <br />
          today's the {day}
        </h1>
        <div className="info-hover-container">
          <span className="hover-trigger">?</span>
          <span class="hover-info">Additional information</span>
        </div>
        <div className="form-wrapper">
          <div>
            <FieldClient
              clients={clients}
              choosenClient={choosenClient}
              setChoosenClient={setChoosenClient}
            />
            <FieldClientProjects
              choosenClient={choosenClient}
              choosenProject={choosenProject}
              projects={projects}
              setChoosenProject={setChoosenProject}
            />
            <FieldHours hours={hours} setHours={setHours} />
          </div>
          <FieldComment notes={notes} setNotes={setNotes} />
        </div>
        {/* <button onClick={handleLogout}>Logout</button> */}
      </div>
      <button className="submit rounded-corners">Submit</button>
    </>
  );
}
