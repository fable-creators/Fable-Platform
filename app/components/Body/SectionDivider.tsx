import React from "react";

export const SectionDivider: React.FC = () => {
  return (
    <div className="w-full px-4 py-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t-2 border-plum dark:border-sand"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-sky dark:bg-midnight px-3 text-sm text-coffee dark:text-sky font-semibold">
            •••
          </span>
        </div>
      </div>
    </div>
  );
};