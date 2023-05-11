import { useEffect, useState } from "react";

export default function LoggedIn(props) {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [choosenClient, setChoosenClient] = useState([]);
  const [choosenProject, setChoosenProject] = useState([]);
  // const [clientProjects, setClientProjects] = useState([]);

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

  const existingProjects = projects.filter(
    (project) => project.client_id === choosenClient.client_id
  );

  return (
    <>
      <div>
        <h1>Hello {props.user.first_name}, you are logged in!</h1>
        <div className="dropdown">
          <div className="dropdown-title title">
            {choosenClient.length === 0 ? "1. Add client" : choosenClient.name}
          </div>
          {clients.map((client) => (
            <div
              className="dropdown-content"
              onClick={() => setChoosenClient(client)}
              key={client.client_id}
            >
              {client.name}
            </div>
          ))}
        </div>
        <div className="dropdown">
          <div className="dropdown-title title">
            {choosenProject.length === 0
              ? "2. Add project"
              : choosenProject.name}
          </div>
          {existingProjects.map((clientProject) => (
            <div
              key={clientProject.client_id}
              onClick={() => setChoosenProject(clientProject)}
              className="dropdown-content"
            >
              {clientProject.name}
            </div>
          ))}
        </div>
        {/* <button onClick={handleLogout}>Logout</button> */}
      </div>
    </>
  );
}
