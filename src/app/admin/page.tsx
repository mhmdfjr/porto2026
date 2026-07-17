import {
  getProjects,
  getWorks,
  getSkills,
  getEducations,
} from "@/lib/database";

export default async function AdminDashboardPage() {
  const [projects, works, skills, educations] = await Promise.all([
    getProjects(),
    getWorks(),
    getSkills(),
    getEducations(),
  ]);

  const stats = [
    { label: "Projects", value: projects.length },
    { label: "Work Experience", value: works.length },
    { label: "Skills", value: skills.length },
    { label: "Education", value: educations.length },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg bg-neutral-900 p-4">
            <p className="text-sm text-neutral-400">{s.label}</p>
            <p className="text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
