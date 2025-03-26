// File: app/page.tsx - Main page component
import TicketCardSlider from "./tickets/page";

export default function Home() {
  return (
    <main className="flex flex-col items-center sm:justify-center p-4 pt-10 sm:p-4">
      <div className="w-full sm:max-w-md">
        <TicketCardSlider />
      </div>
    </main>
  );
}
