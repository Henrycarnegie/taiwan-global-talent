// components/MetricCard.tsx
import type { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  graph?: ReactNode;
  className?: string;
}

export default function MetricCard({ title, value, icon, graph, className = "" }: MetricCardProps) {
  return (
    <div className={`p-6 bg-white rounded-3xl shadow-xl border border-gray-100 flex items-center justify-between transition-transform hover:scale-105 ${className}`}>
      <div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</p>
        <p className="text-5xl font-extrabold text-gray-900 mt-2">{value}</p>
      </div>
      {graph && (
        <div className="w-24 h-24">
          {graph}
        </div>
      )}
      {!graph && icon && (
        <div className="p-4 bg-gray-100 rounded-full text-blue-600">
          {icon}
        </div>
      )}
    </div>
  );
}