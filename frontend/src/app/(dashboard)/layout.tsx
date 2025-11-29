import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main className="w-full ">
        {children}
      </main>
  );
}