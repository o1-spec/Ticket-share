"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import test from "../../public/test.jpg";
import { BarcodeIcon, Wallet2Icon } from "lucide-react";

// Dummy ticket data
const tickets = [
  {
    theme: "Live Concert Night",
    venue: "Madison Square Garden, NY",
    date: "April 15, 2025",
    time: "8:00 PM",
    section: "A3",
    row: "12",
    startingSeatNumber: "11",
    eventImage: test,
  },
  {
    theme: "Oasis Reunion Tour",
    venue: "Heaton Park, Manchester",
    date: "July 11, 2025",
    time: "3:30 PM",
    section: "B5",
    row: "8",
    startingSeatNumber: "12",
    eventImage: test,
  },
  {
    theme: "Coldplay World Tour",
    venue: "Wembley Stadium, London",
    date: "June 20, 2025",
    time: "7:00 PM",
    section: "C1",
    row: "5",
    startingSeatNumber: "13",
    eventImage: test,
  },
];

const TicketCard: React.FC = () => {
  return (
    <div className="w-full bg-white py-6">
      <Swiper
        spaceBetween={16}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full px-4"
      >
        {tickets.map((ticket, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <div className="border-2 w-80 rounded-2xl bg-white shadow-md">
              {/* Ticket Header */}
              <div className="bg-blue-600 text-white rounded-t-lg text-center py-2">
                <p className="text-sm font-medium">Standard Ticket</p>
              </div>

              {/* Seat Information */}
              <div className="flex justify-between px-4 py-2 h-16 bg-blue-500 text-white">
                <div className="text-center">
                  <p className="text-xs font-medium">SEC</p>
                  <p className="font-bold">{ticket.section || "GA"}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs">ROW</p>
                  <p className="font-bold">{ticket.row}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs">SEAT</p>
                  <p className="font-bold">
                    {ticket.startingSeatNumber || "-"}
                  </p>
                </div>
              </div>

              {/* Event Image */}
              <div className="relative w-full h-60">
                <Image
                  src={ticket.eventImage}
                  alt="Event"
                  layout="fill"
                  objectFit="cover"
                  className="grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 w-full text-center p-4 text-white">
                  <h2 className="text-lg font-bold">{ticket.theme}</h2>
                  <p className="text-sm">
                    {ticket.date} • {ticket.time}
                  </p>
                  <p className="text-sm">{ticket.venue}</p>
                </div>
              </div>

              {/* Barcode Section */}
              <div className="mx-auto w-[85%] my-6 text-center justify-center items-center bg-blue-600 flex gap-3 p-2 rounded-md">
                <BarcodeIcon />
                <p>View Barcode</p>
              </div>

              <p className="text-blue-600 text-center my-6 font-bold">
                Ticket Details
              </p>

              {/* Verified Badge */}
              <div className="text-white gap-1.5 bg-blue-600 flex items-center justify-center py-2 rounded-b-lg">
                <Wallet2Icon />
                <p>ticketmaster.verified</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom Buttons */}
      <div className="flex justify-center my-7 gap-4 mx-auto">
        <Button className="w-24 bg-blue-600 text-white">Tickets</Button>
        <Button className="w-24 bg-blue-600 text-white">Sell</Button>
      </div>
    </div>
  );
};

export default TicketCard;
