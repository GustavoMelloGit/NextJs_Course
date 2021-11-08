import { useRouter } from "next/router";

export default function ProjectPage() {
  const router = useRouter();
  const { projectId } = router.query;
  return (
    <div>
      <h1>Project {projectId}</h1>
    </div>
  );
}
