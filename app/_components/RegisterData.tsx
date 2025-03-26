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

// Initial form state (without ID as it will be generated)

const IMGBB_API_KEY = "198f4cb88bd84077426a3813645c61f9";

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

//198f4cb88bd84077426a3813645c61f9

const TicketGenerationForm: React.FC = () => {
  // Get addTicket function from context
  const { addTicket } = useTickets();

  // State for the current form
  const [formData, setFormData] =
    useState<Omit<TicketFormData, "id">>(initialFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  console.log(uploading);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file" && files) {
      setImageFile(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : type === "file"
            ? files?.[0] || null
            : value,
      }));
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // const handleCheckboxChange = (checked: boolean) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     generalAdmission: checked,
  //   }));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setUploading(true);

    let imageUrl = formData.eventImage;

    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        alert("Failed to upload image. Please try again.");
        setUploading(false);
        setIsGenerating(false);
        return;
      }
    }

    // Finalize form data with image URL
    const newTicket = { ...formData, eventImage: imageUrl };

    // Add to ticket context
    addTicket(newTicket);

    // Save to local storage
    const storedTickets = JSON.parse(
      localStorage.getItem("ticketData") || "[]"
    );
    localStorage.setItem(
      "ticketData",
      JSON.stringify([...storedTickets, newTicket])
    );

    // Reset form
    setFormData(initialFormState);
    setImageFile(null);
    setUploading(false);
    setIsGenerating(false); // Stop loading

    // Navigate to homepage
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
          <Label className="text-gray-700 font-semi-bold pb-2">Theme</Label>
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
          <Label className="text-gray-700 font-semi-bold pb-2">Venue</Label>
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
          <Label className="text-gray-700 font-semi-bold pb-2">Date</Label>
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
                onSelect={(date) =>
                  setFormData((prev) => ({ ...prev, date: date || undefined }))
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Input */}
        <div>
          <Label className="text-gray-700 font-semi-bold pb-2">Time</Label>
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
        {/* <div className="flex items-center space-x-2">
          <Checkbox
            id="generalAdmission"
            name="generalAdmission"
            className="border-gray-300"
            checked={formData.generalAdmission}
            onCheckedChange={handleCheckboxChange}
          />
          <Label
            htmlFor="generalAdmission"
            className="text-gray-700 font-medium"
          >
            General Admission
          </Label>
        </div> */}

        {/* File Upload */}
        <div>
          <Label className="text-gray-700 font-medium">
            Add Event Image (optional)
          </Label>
          <Input
            type="file"
            className="w-full border-gray-300"
            name="eventImage"
            onChange={handleChange}
            accept="image/*"
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
