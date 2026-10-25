import React from "react";

type LockedWeekCardProps = {
  weekNumber: number;
  title: string;
  concept: string;
};

export const LockedWeekCard: React.FC<LockedWeekCardProps> = ({
  weekNumber,
  title,
  concept,
}) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-gray-50 opacity-60 cursor-not-allowed">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-gray-500 uppercase">Week {weekNumber}</span>
        <span className="text-gray-400">🔒</span>
      </div>
      <h3 className="text-lg font-semibold mt-1 text-gray-700">{title}</h3>
      <p className="text-gray-500 text-sm mt-1">{concept}</p>
      <div className="mt-4">
        <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
          Locked
        </span>
      </div>
    </div>
  );
};