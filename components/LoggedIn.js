//Libraries
import { useEffect, useState } from "react";
import { format } from "date-fns";

//Components
import FieldClient from "./FieldClient";
import FieldClientProjects from "./FieldClientProjects";
import FieldHours from "./FieldHours";
import FieldComment from "./FieldComment";
import Table from "./Table";
import Infobox from "./Infobox";

export default function LoggedIn(props) {
  const [clients, setClients] = useState([]); // Opretter tilstanden 'clients' og en funktion 'setClients' til at opdatere tilstanden
  const [projects, setProjects] = useState([]);
  const [choosenClient, setChoosenClient] = useState([]);
  const [choosenProject, setChoosenProject] = useState([]);
  const [hours, setHours] = useState(0);
  const [notes, setNotes] = useState("");
  const [activeButton, setActiveButton] = useState(false);
  const [tableArray, setTableArray] = useState([]);

  //dette useEffect-hook bruges til at hente data om klienter og opdatere clients-tilstanden med de modtagne data.
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

  //dette useEffect-hook bruges til at hente data om projekter og opdatere projects-tilstanden med de modtagne data.
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

  //Generelt set udfører denne kode funktionen for at indsende data til en database via Supabase,
  //og efter en vellykket indsendelse opdateres andre tilstande og formularfelter for at forberede den næste indsendelse.
  const handleSubmit = (e) => {
    e.preventDefault();
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

      //når data succesfuldt indsendes til databasen, vil det tilføje det indsendte data til tableArray, nulstille de valgte klienter og projekter samt timer og noter i formularen. Dette giver brugeren mulighed for at fortsætte med at indsende nye data uden at skulle rydde op i formularen manuelt.
      if (!error) {
        const newData = {
          //En ny variabel newData oprettes som et objekt, der indeholder værdierne for klientnavn (client_name), projektnavn (project_name), antal timer (hours) og noter (notes).
          client_name: choosenClient.name,
          project_name: choosenProject.name,
          hours: hours,
          notes: notes,
        };
        //setTableArray-funktionen kaldes for at opdatere tableArray-tilstanden ved at tilføje det nye objekt newData til slutningen af den tidligere tilstandsarray (prevTableArray).
        //setChoosenClient, setChoosenProject, setHours og setNotes bliver kaldt med tomme værdier eller nul for at nulstille tilstandene til deres oprindelige værdier. Dette forbereder formularen til den næste indsendelse.
        setTableArray((prevTableArray) => [...prevTableArray, newData]);
        setChoosenClient([]);
        setChoosenProject([]);
        setHours(0);
        setNotes("");
      }
    }

    insertData();
  };

  const day = format(new Date(), "do 'of' MMM"); // Indstiller datoen for dagens velkomstbesked
  //Toggle display block on dropdown
  const handleClick = (evt) => {
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
      <h1>
        Hello {props.user.first_name}, <br />
        today's the <span className="marked">{day}</span>
      </h1>
      <Infobox />
      <form>
        <div className="form-wrapper">
          <div className="dropdown-wrapper">
            <FieldClient
              clients={clients}
              choosenClient={choosenClient}
              setChoosenClient={setChoosenClient}
              setChoosenProject={setChoosenProject}
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

        <div className="button-wrapper">
          <button
            disabled={!activeButton}
            className="submit rounded-corners"
            onClick={handleSubmit}
            type="submit"
          >
            {activeButton === false
              ? "Your log isn't ready for submit... "
              : "Your log is ready for submit!"}
          </button>
        </div>
      </form>
      {tableArray.length > 0 ? <Table tableArray={tableArray} /> : ""}
    </>
  );
}
