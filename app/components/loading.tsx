import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black dark:bg-black">
      <div className="text-center">
        <div className="glitch" data-glitch="Loading...">
          <span className="glitch-text">Loading...</span>
        </div>
      </div>
    </div>
  );
}
