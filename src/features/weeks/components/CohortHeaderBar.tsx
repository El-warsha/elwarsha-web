import React from "react";

type CohortHeaderBarProps = {
  name: string;
  startsOn: string;
  endsOn: string;
  currentWeekNumber: number;
};

export const CohortHeaderBar: React.FC<CohortHeaderBarProps> = ({
  name,
  startsOn,
  endsOn,
  currentWeekNumber,
}) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="text-sm text-gray-500">
          {startsOn} — {endsOn}
        </p>
      </div>
      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
        Current Week: {currentWeekNumber}
      </div>
    </div>
  );
};