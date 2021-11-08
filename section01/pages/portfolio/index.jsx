import Link from "next/link";
import { useRouter } from "next/router";

export default function Portfolio() {
  const router = useRouter();
  const projects = [
    {
      title: "Project1",
      id: "p1",
    },
    {
      title: "Project2",
      id: "p2",
    },
    {
      title: "Project3",
      id: "p3",
    },
  ];

  function loadProject() {
    router.push(`/portfolio/${projects[0].id}`);
  }
  return (
    <div>
      <h1>Portfolio</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              href={{
                pathname: "/portfolio/[projectId]",
                query: { projectId: project.id },
              }}
            >
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={loadProject}>Load project A</button>
    </div>
  );
}
