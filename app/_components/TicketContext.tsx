"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define types
export interface TicketFormData {
  id: number; // Add id field
  theme: string;
  venue: string;
  date: Date | undefined;
  time: string;
  section: string;
  row: string;
  startingSeatNumber: string;
  numberOfTickets: string;
  generalAdmission: boolean;
  eventImage?: string | null;
  seat: string;
}

interface TicketContextType {
  tickets: TicketFormData[];
  setTickets: React.Dispatch<React.SetStateAction<TicketFormData[]>>;
  addTicket: (ticket: Omit<TicketFormData, "id">) => void; // New function to add tickets
  selectedTickets: number[];
  activeTicketIndex: number;
  setActiveTicketIndex: (index: number) => void;
  toggleTicketSelection: (ticketId: number) => void;
  startTransfer: () => void;
  cancelTransfer: () => void;
  isTransferMode: boolean;
}

// Create context with undefined initial value
const TicketContext = createContext<TicketContextType | undefined>(undefined);

// Props interface for the provider
interface TicketProviderProps {
  children: ReactNode;
}

export function TicketProvider({ children }: TicketProviderProps) {
  const [tickets, setTickets] = useState<TicketFormData[]>([]);
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
  const [activeTicketIndex, setActiveTicketIndex] = useState(0);
  const [isTransferMode, setIsTransferMode] = useState(false);

  // Add a function to add a new ticket with auto-generated ID
  const addTicket = (ticketData: Omit<TicketFormData, "id">) => {
    const newTicket = {
      ...ticketData,
      id: Date.now(), // Generate a unique ID using timestamp
    };

    setTickets((prevTickets) => [...prevTickets, newTicket]);
  };

  // Load tickets from storage on initial render
  useEffect(() => {
    const storedData = localStorage.getItem("ticketData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setTickets(Array.isArray(parsedData) ? parsedData : [parsedData]);
      } catch (error) {
        console.error("Error parsing ticket data:", error);
      }
    }
  }, []);

  // Save tickets to storage whenever they change
  useEffect(() => {
    if (tickets.length > 0) {
      localStorage.setItem("ticketData", JSON.stringify(tickets));
    }
  }, [tickets]);

  const toggleTicketSelection = (ticketId: number) => {
    setSelectedTickets((prev) => {
      if (prev.includes(ticketId)) {
        return prev.filter((id) => id !== ticketId);
      } else {
        return [...prev, ticketId];
      }
    });
  };

  const startTransfer = () => {
    setIsTransferMode(true);
  };

  const cancelTransfer = () => {
    setIsTransferMode(false);
    setSelectedTickets([]);
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        setTickets,
        addTicket,
        selectedTickets,
        activeTicketIndex,
        setActiveTicketIndex,
        toggleTicketSelection,
        startTransfer,
        cancelTransfer,
        isTransferMode,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export const useTickets = (): TicketContextType => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return context;
};
