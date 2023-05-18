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
  const [tableArray, setTableArray] = useState([]);

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

      if (!error) {
        const newData = {
          client_name: choosenClient.name,
          project_name: choosenProject.name,
          hours: hours,
          notes: notes,
        };
        setTableArray((prevTableArray) => [...prevTableArray, newData]);
        setChoosenClient([]);
        setChoosenProject([]);
        setHours(0);
        setNotes("");
      }
    }

    insertData();
  };

  // console.log(tableArray);

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

  return (
    <>
      <div>
        <h1>
          Hello {props.user.first_name}, <br />
          today's the {day}
        </h1>

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
      <div className="info-wrapper">
        <div className="info-hover-container">
          <span className="hover-trigger">?</span>
          <div className="hover-info">
            <p>The procedure goes a lil' like this...</p>
            <ol>
              <li>You begin with picking the client you've worked for</li>
              <li>Pick the associated project</li>
              <li>Fill in the hours you've spent</li>
              <li>Add a note of the exact work you've done</li>
            </ol>
            <p>And that's it! Easy peasy lemon squeezy, your duty is done!</p>
          </div>
        </div>
      </div>
      <div className="button-wrapper">
        <button
          disabled={!activeButton}
          className="submit rounded-corners"
          onClick={handleSubmit}
        >
          {activeButton === false
            ? "You haven’t logged anything… "
            : "Ready for submit!"}
        </button>
      </div>
      {tableArray.length > 0 ? <Table tableArray={tableArray} /> : ""}
    </>
  );
}
