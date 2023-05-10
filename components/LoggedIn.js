import { useEffect, useState } from "react";

export default function LoggedIn(props) {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [clientProjects, setClientProjects] = useState([]);
  // const [clientProjects, setClientProjects] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data, error } = await props.supabase.from("signitime-clients")
        .select(`
          name
          `);
      setClients(data);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const { data, error } = await props.supabase.from("signitime-projects")
        .select(`
          name
          `);
      setProjects(data);
      // console.log(data);
    }
    getData();
  }, []);

  // console.log(projects);
  // const displayClientProjects = () => {
  //   const clientProjects = projects;

  //   clients.forEach((client) => {
  //     projects.forEach((project) => {
  //       const exists = client.client_id == project.client_id;

  //       if (exists) {
  //         clientProjects.name = project.name;
  //       }
  //     });
  //   });

  //   return clientProjects;
  // };

  // const test = () => {
  //   console.log(this);
  // };
  // console.log(clientProjects);

  return (
    <>
      <div>
        <h1>Hello {props.user.first_name}, you are logged in!</h1>
        <div className="dropdown">
          <div className="dropdown-title title">1. Add client</div>
          {clients.map((client) => (
            <div
              className="dropdown-content"
              // oncClick={setClientProjects(client)}
              key={client.client_id}
            >
              {client.name}
            </div>
          ))}
        </div>
        <div className="dropdown">
          <div className="dropdown-title title">2. Add project</div>
          {projects.map((project) => (
            <div className="dropdown-content">{project.name}</div>
          ))}
        </div>
        {/* <button onClick={handleLogout}>Logout</button> */}
      </div>
    </>
  );
}
