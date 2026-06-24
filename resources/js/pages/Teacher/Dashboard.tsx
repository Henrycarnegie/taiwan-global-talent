export default function TeacherDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Teacher Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <Card title="Students" value="120" />
        <Card title="Classes" value="5" />
        <Card title="Assignments" value="12 Pending" />
      </div>
    </div>
  )
}

const Card = ({ title, value }: { title: string; value: string }) => (
  <div className="p-4 bg-white rounded-xl shadow">
    <p className="text-gray-500">{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
)