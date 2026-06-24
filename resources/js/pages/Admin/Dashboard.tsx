export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <Card title="Users" value="1240" />
        <Card title="Students" value="980" />
        <Card title="Teachers" value="120" />
        <Card title="Reports" value="8" />
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