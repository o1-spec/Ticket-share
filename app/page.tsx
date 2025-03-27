// File: app/page.tsx - Main page component
"use client";
import { useState } from "react";
import TicketCardSlider from "./tickets/page";

export default function Home() {
  const [showTransfer, setShowTransfer] = useState<boolean>(false);

  const handleOutsideClick = () => {
    setShowTransfer(false);
  };

  return (
    <main className="flex flex-col items-center sm:justify-center p-4 pt-1 sm:pt-10 sm:p-4">
      {showTransfer && (
        <div
          className="absolute top-0 right-0 bottom-0 left-0 bg-gray-800 opacity-40 z-50"
          onClick={handleOutsideClick}
        ></div>
      )}
      <div className="w-full sm:max-w-md">
        <TicketCardSlider
          setShowTransfer={setShowTransfer}
          showTransfer={showTransfer}
        />
      </div>
    </main>
  );
}
