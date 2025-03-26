// File: components/TicketDetails.tsx - Ticket details view
'use client';

import { useTickets } from './TicketContext';
import { Button } from '@/components/ui/button';

export default function TicketDetails() {
  const { startTransfer } = useTickets();
  
  return (
    <div>
      {/* Ticket Info */}
      <div className="bg-blue-500 p-4 text-white">
        <div className="text-center font-medium mb-2">Standard Ticket</div>
        <div className="flex justify-between text-center">
          <div className="flex-1">
            <div className="text-sm opacity-90">SEC</div>
            <div className="font-bold">GA</div>
          </div>
          <div className="flex-1">
            <div className="text-sm opacity-90">ROW</div>
            <div className="font-bold">General</div>
            <div className="font-bold">Admission</div>
          </div>
          <div className="flex-1">
            <div className="text-sm opacity-90">SEAT</div>
            <div className="font-bold">-</div>
          </div>
        </div>
      </div>
      
      {/* Event Image */}
      <div className="relative h-64 bg-gradient-to-b from-gray-700 to-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 bg-gray-800 bg-opacity-60 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-white p-4 text-center">
          <div className="font-bold text-xl mb-1">Oasis</div>
          <div className="text-sm">Fri • 11 Jul, 2025 • 3:30 pm • Heaton Park •</div>
          <div className="text-sm">Manchester</div>
        </div>
      </div>
      
      {/* Barcode Button */}
      <div className="p-4">
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2">
          <span className="mr-2">≡</span> View Barcode
        </Button>
      </div>
      
      {/* Ticket Details Link */}
      <div className="text-center text-blue-400 pb-4">
        Ticket Details
      </div>
      
      {/* Ticketmaster Verified */}
      <div className="px-4 pb-4">
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2">
          <span className="mr-2">🔒</span> ticketmaster.verified
        </Button>
      </div>
      
      {/* Navigation Dots */}
      <div className="flex justify-center pb-4">
        <div className="flex space-x-2">
          <div className="h-2 w-2 rounded-full bg-gray-500"></div>
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <Button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3"
          onClick={startTransfer}
        >
          Transfer
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3">
          Sell
        </Button>
      </div>
    </div>
  );
}