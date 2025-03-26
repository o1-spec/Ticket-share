"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

const TicketGenerationForm = () => {
  const [formData, setFormData] = useState({
    theme: "",
    venue: "",
    date: undefined as Date | undefined,
    time: "",
    section: "",
    row: "",
    startingSeatNumber: "",
    numberOfTickets: "",
    generalAdmission: false,
    eventImage: null as File | null,
  });
  const router = useRouter();

  // interface FormEvent {
  //   target: {
  //     name: string;
  //     value: string;
  //     type: string;
  //     checked: boolean;
  //     files: FileList | null;
  //   };
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files?.[0] : value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      generalAdmission: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedData = localStorage.getItem("ticketData");
    let ticketsArray = [];

    if (storedData) {
      try {
        ticketsArray = JSON.parse(storedData);

        if (!Array.isArray(ticketsArray)) {
          ticketsArray = [ticketsArray];
        }
      } catch (error) {
        console.error("Error parsing ticketData:", error);
        ticketsArray = [];
      }
    }
    ticketsArray.push(formData);
    localStorage.setItem("ticketData", JSON.stringify(ticketsArray));
    router.push("/");
  };

  return (
    <div className="p-6 rounded-md max-w-md mx-auto">
      <h1 className="text-2xl text-center font-bold my-8 text-gray-800">
        Create Your Tickets
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        {/* Theme */}
        <div>
          <Label className="text-gray-700 font-semi-bold pb-2 ">Theme</Label>
          <Input
            type="text"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Venue */}
        <div>
          <Label className="text-gray-700 font-semi-bold pb-2 ">Venue</Label>
          <Input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Date Picker */}
        <div>
          <Label className="text-gray-700 font-semi-bold pb-2 ">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex justify-between px-3 py-2 border-gray-300 bg-white text-gray-800 rounded-md shadow-sm hover:bg-gray-50"
              >
                {formData.date
                  ? format(formData.date, "MM/dd/yyyy")
                  : "Pick a date"}
                <CalendarIcon className="h-4 w-4 text-gray-600 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => setFormData((prev) => ({ ...prev, date }))}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Input */}
        <div>
          <Label className="text-gray-700 font-semi-bold pb-2 ">Time</Label>
          <Input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full text-gray-700 border-gray-300 bg-white px-3 py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Other Inputs */}
        {["section", "row", "startingSeatNumber", "numberOfTickets"].map(
          (field) => (
            <div key={field}>
              <Label className="text-gray-700 font-semi-bold pb-2">
                {field.replace(/([A-Z])/g, " $1").toUpperCase()}
              </Label>
              <Input
                type={field.includes("Number") ? "number" : "text"}
                name={field}
                value={String(formData[field as keyof typeof formData] || "")}
                onChange={handleChange}
                className="w-full border-gray-300"
              />
            </div>
          )
        )}

        {/* Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            name="generalAdmission"
            className="border-gray-300"
            checked={formData.generalAdmission}
            onCheckedChange={handleCheckboxChange}
          />
          <Label className="text-gray-700 font-medium">General Admission</Label>
        </div>

        {/* File Upload */}
        <Label className="text-gray-700 font-medium">
          Add Event Image (optional)
        </Label>
        <Input
          type="file"
          className="w-full border-gray-300"
          name="eventImage"
          onChange={handleChange}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white"
        >
          GENERATE TICKETS
        </Button>
      </form>
    </div>
  );
};

export default TicketGenerationForm;
