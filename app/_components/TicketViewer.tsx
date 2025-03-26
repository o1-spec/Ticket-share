// // File: components/TicketViewer.tsx - Main ticket viewer component
// 'use client';

// import { useTickets } from './TicketContext';
// import TicketTransfer from './TicketTransfer';
// import { Button } from '@/components/ui/button';
// import TicketDetails from './TicketDetail';
// import { X } from 'lucide-react';

// export default function TicketViewer(){
//   const { activeView, cancelTransfer } = useTickets();

//   return (
//     <div className="rounded-lg overflow-hidden bg-slate-900 text-white">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b border-slate-800">
//         <div>
//           <X size={24} className="text-white cursor-pointer" />
//         </div>
//         <div className="text-lg font-semibold">My Tickets</div>
//         <div className="text-sm text-blue-400">Help</div>
//       </div>

//       {/* Network and Battery Status */}
//       <div className="absolute top-0 left-0 right-0 bg-black p-1 flex justify-between text-xs text-white">
//         <div className="flex items-center space-x-1">
//           <div>•••</div>
//           <div>MTN Nigeria LTE</div>
//         </div>
//         <div className="flex items-center space-x-2">
//           <div>{activeView === 'details' ? 'Recording' : '12:27'}</div>
//           <div>25%</div>
//         </div>
//       </div>

//       {/* Content */}
//       {activeView === 'details' ? <TicketDetails /> : <TicketTransfer />}
//     </div>
//   );
// }
