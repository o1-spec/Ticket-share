import { X } from "lucide-react";
import Link from "next/link";

function TicketHeading() {
  return (
    <div className="flex justify-between items-center bg-[#212530] w-full p-3">
      <div>
        <Link href="/register">
          <X size={24} color="white" />
        </Link>
      </div>
      <div>
        <span className="text-white text-[17px]">My Tickets</span>
      </div>
      <div>
        <span className="text-white text-[17px]">Help</span>
      </div>
    </div>
  );
}

export default TicketHeading;
