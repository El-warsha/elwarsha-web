import React from "react";
import { Link } from "react-router-dom";

type WeekCardProps = {
  weekNumber: number;
  title: string;
  concept: string;
  status: string;
  cohortSlug: string;
};

export const WeekCard: React.FC<WeekCardProps> = ({
  weekNumber,
  title,
  concept,
  status,
  cohortSlug,
}) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition">
      <span className="text-xs font-bold text-blue-600 uppercase">Week {weekNumber}</span>
      <h3 className="text-lg font-semibold mt-1">{title}</h3>
      <p className="text-gray-600 text-sm mt-1">{concept}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
          {status}
        </span>
        <Link
          to={`/cohorts/${cohortSlug}/weeks/${weekNumber}`}
          className="text-blue-500 hover:underline text-sm font-medium"
        >
          View Details &rarr;
        </Link>
      </div>
    </div>
  );
};