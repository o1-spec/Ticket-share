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
import { useRouter } from "next/navigation";
import { useTickets, TicketFormData } from "./TicketContext";

const initialFormState: Omit<TicketFormData, "id"> = {
  theme: "",
  venue: "",
  date: undefined,
  time: "",
  section: "",
  row: "",
  startingSeatNumber: "",
  numberOfTickets: "",
  generalAdmission: false,
  eventImage: "", 
  seat: "",
};

const requiredFields = ["theme", "venue", "date", "time", "section", "row", "startingSeatNumber", "numberOfTickets"];

const TicketGenerationForm: React.FC = () => {
  const { addTicket } = useTickets();

  const [formData, setFormData] = 
    useState<Omit<TicketFormData, "id">>(initialFormState);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_submitted, setSubmitted] = useState(false);
  
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1").charAt(0).toUpperCase() + field.replace(/([A-Z])/g, " $1").slice(1)} is required`;
        isValid = false;
      }
    });
    
    if (formData.numberOfTickets && parseInt(formData.numberOfTickets as string) <= 0) {
      newErrors.numberOfTickets = "Number of tickets must be greater than 0";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsGenerating(true);

    const newTicket = { ...formData };

    addTicket(newTicket);

    const storedTickets = JSON.parse(
      localStorage.getItem("ticketData") || "[]"
    );
    localStorage.setItem(
      "ticketData",
      JSON.stringify([...storedTickets, newTicket])
    );

    setTimeout(() => {
      setFormData(initialFormState);
      setIsGenerating(false);
      setSubmitted(false);
      
      router.push("/");
    }, 1000);
  };

  const ErrorMessage = ({ message }: { message: string }) => (
    <p className="text-red-500 text-sm mt-1">{message}</p>
  );

  return (
    <div className="p-6 rounded-md max-w-md mx-auto">
      <h1 className="text-2xl text-center font-bold my-8 text-gray-800">
        Create Your Tickets
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        {/* Theme */}
        <div>
          <Label className="text-gray-700 font-semi-bold pb-2">Theme</Label>
          <Input
            type="text"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className={`w-full ${errors.theme ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.theme && <ErrorMessage message={errors.theme} />}
        </div>

        {/* Venue */}
        <div>
          <Label className="text-gray-700 font-semi-bold pb-2">Venue</Label>
          <Input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className={`w-full ${errors.venue ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.venue && <ErrorMessage message={errors.venue} />}
        </div>

        {/* Date Picker */}
        <div>
          <Label className="text-gray-700 font-semi-bold pb-2">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full flex justify-between px-3 py-2 ${
                  errors.date ? "border-red-500" : "border-gray-300"
                } bg-white text-gray-800 rounded-md shadow-sm hover:bg-gray-50`}
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
                onSelect={(date) => {
                  setFormData((prev) => ({ ...prev, date: date || undefined }));
                  if (errors.date) {
                    setErrors(prev => {
                      const newErrors = {...prev};
                      delete newErrors.date;
                      return newErrors;
                    });
                  }
                }}
              />
            </PopoverContent>
          </Popover>
          {errors.date && <ErrorMessage message={errors.date} />}
        </div>

        {/* Time Input */}
        <div>
          <Label className="text-gray-700 font-semi-bold pb-2">Time</Label>
          <Input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={`w-full text-gray-700 ${
              errors.time ? "border-red-500" : "border-gray-300"
            } bg-white px-3 py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500`}
          />
          {errors.time && <ErrorMessage message={errors.time} />}
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
                className={`w-full ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[field] && <ErrorMessage message={errors[field]} />}
            </div>
          )
        )}

        {/* Image URL Input */}
        <div>
          <Label className="text-gray-700 font-medium">
            Event Image URL
          </Label>
          <Input
            type="text"
            placeholder="https://example.com/image.jpg"
            className="w-full border-gray-300"
            name="eventImage"
            value={formData.eventImage || ""}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className={`w-full cursor-pointer text-white transition-all ${
            isGenerating ? "bg-blue-400" : "bg-blue-600"
          }`}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "GENERATE TICKETS"}
        </Button>
      </form>
    </div>
  );
};

export default TicketGenerationForm;