import Image from "next/image";
import Notifications from "../assets/icons/Notifications.svg";
import { Heart, Inbox } from "lucide-react";

const Header = ({ notificationCount }: { notificationCount: number }) => {
  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={require("../assets/icon.png")}
            className="h-7 w-7 rounded-sm"
            alt="homeicon"
          />

          <span className="text-xl font-bold text-foreground">Snapora</span>
        </div>

        <button className="relative p-2 rounded-lg hover:bg-muted transition-smooth">
          <Heart />
        </button>
      </div>
    </header>
  );
};

export default Header;
