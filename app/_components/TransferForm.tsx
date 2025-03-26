import React from "react";
import { useTickets } from "./TicketContext";

const TransferForm = () => {
  const {
    tickets,
    selectedTickets,
    toggleTicketSelection,
    isTransferMode,
    cancelTransfer,
  } = useTickets();

  if (!isTransferMode) return null;

  return (
    <div className="fixed bottom-0 bg-white p-5 w-[457px] shadow-lg rounded-t-lg">
      <div className="flex justify-between items-center pb-3 text-black ">
        <h3 className="text-center font-semibold">
          Select Tickets to Transfer
        </h3>
        <button
          className="text-gray-500 hover:text-red-500 cursor-pointer"
          onClick={cancelTransfer}
        >
          ✕
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-4 border-1 rounded-md p-2">
        Only transfer tickets to people you know and trust to ensure everyone
        stays safe and socially distanced
      </p>

      <div className="flex justify-center gap-3">
        {tickets.map((ticket) => (
          <button
            key={ticket.id}
            className={`px-4 py-2 rounded-md ${
              selectedTickets.includes(ticket.id)
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => toggleTicketSelection(ticket.id)}
          >
            Seat {ticket.seat}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-5">
        <span className="text-gray-500">
          {" "}
          {selectedTickets.length} Selected
        </span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
          Transfer To →
        </button>
      </div>
    </div>
  );
};

export default TransferForm;
