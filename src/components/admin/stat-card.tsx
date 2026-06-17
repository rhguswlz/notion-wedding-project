interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'red' | 'purple'
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  green: 'bg-green-50 text-green-700 border-green-200',
  red: 'bg-red-50 text-red-700 border-red-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
}

export function StatCard({
  label,
  value,
  icon,
  color = 'blue',
}: StatCardProps) {
  return (
    <div className={`rounded-lg border p-6 ${colorClasses[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{label}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
        {icon && <div className="text-2xl opacity-50">{icon}</div>}
      </div>
    </div>
  )
}
