"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Notification {
  id: string;
  type: "like" | "comment" | "follow";
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  postImage?: string;
  comment?: string;
  time: string;
}

interface FollowRequest {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
}

const followRequests: FollowRequest[] = [
  {
    id: "fr1",
    user: {
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    id: "fr2",
    user: {
      name: "James Miller",
      username: "jamesmiller",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  },
];

const todayNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    user: {
      name: "Sarah Connor",
      username: "sarahc",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    postImage: "https://picsum.photos/seed/post1/200",
    time: "2h",
  },
  {
    id: "2",
    type: "comment",
    user: {
      name: "Mike Johnson",
      username: "mikej",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    postImage: "https://picsum.photos/seed/post2/200",
    comment: "This is amazing! 🔥",
    time: "3h",
  },
  {
    id: "3",
    type: "follow",
    user: {
      name: "Lisa Park",
      username: "lisapark",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    time: "5h",
  },
];

const yesterdayNotifications: Notification[] = [
  {
    id: "4",
    type: "like",
    user: {
      name: "David Lee",
      username: "davidlee",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    postImage: "https://picsum.photos/seed/post3/200",
    time: "1d",
  },
  {
    id: "5",
    type: "comment",
    user: {
      name: "Anna Smith",
      username: "annas",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    postImage: "https://picsum.photos/seed/post4/200",
    comment: "Love this shot!",
    time: "1d",
  },
  {
    id: "6",
    type: "follow",
    user: {
      name: "Chris Brown",
      username: "chrisb",
      avatar: "https://i.pravatar.cc/150?img=13",
    },
    time: "1d",
  },
];

const thisWeekNotifications: Notification[] = [
  {
    id: "7",
    type: "like",
    user: {
      name: "Rachel Green",
      username: "rachelg",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    postImage: "https://picsum.photos/seed/post5/200",
    time: "3d",
  },
  {
    id: "8",
    type: "follow",
    user: {
      name: "Joey Tribbiani",
      username: "joeyt",
      avatar: "https://i.pravatar.cc/150?img=16",
    },
    time: "5d",
  },
];

const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-red-500"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const CommentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-red-600"
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);

const UserPlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-red-600"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" x2="19" y1="8" y2="14" />
    <line x1="22" x2="16" y1="11" y2="11" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-muted-foreground"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const getNotificationText = () => {
    switch (notification.type) {
      case "like":
        return <span className="text-muted-foreground">liked your post</span>;
      case "comment":
        return (
          <span className="text-muted-foreground">
            commented:{" "}
            <span className="text-foreground">{notification.comment}</span>
          </span>
        );
      case "follow":
        return (
          <span className="text-muted-foreground">started following you</span>
        );
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case "like":
        return <HeartIcon />;
      case "comment":
        return <CommentIcon />;
      case "follow":
        return <UserPlusIcon />;
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors">
      <div className="relative">
        <Image
          src={require("@/assets/grid-1.jpg")}
          className="h-11 w-11 rounded-full"
          alt="userimage"
        />

        <div className="absolute -bottom-1 -right-1 bg-card rounded-full p-1">
          {getIcon()}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm leading-tight">
          <span className="font-semibold text-foreground">
            {notification.user.name}
          </span>{" "}
          {getNotificationText()}{" "}
          <span className="text-muted-foreground text-xs">
            {notification.time}
          </span>
        </p>
      </div>

      {notification.type === "follow" ? (
        <Button
          size="sm"
          className="h-8 px-4 text-xs font-semibold"
          onClick={() => setIsFollowing(!isFollowing)}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      ) : (
        notification.postImage && (
          <img
            src={notification.postImage}
            alt="Post"
            className="h-11 w-11 rounded-lg object-cover"
          />
        )
      )}
    </div>
  );
};

const FollowRequestsSection = () => {
  const navigate = useRouter();

  return (
    <div
      className="sticky top-14 z-10 bg-background border-b border-border cursor-pointer hover:bg-secondary/30 transition-colors"
      onClick={() => navigate.push("/follow-requests")}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="relative">
          <div className="flex -space-x-2">
            {followRequests.slice(0, 2).map((request, index) => (
              <div key={index}>
                <Image
                  src={require("@/assets/grid-1.jpg")}
                  className="h-10 w-10 border-2 border-background rounded-full"
                  alt={request.user.name}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <p className="font-semibold text-sm text-foreground">
            Follow requests
          </p>
          <p className="text-xs text-muted-foreground">
            {followRequests[0].user.username} + {followRequests.length - 1}{" "}
            others
          </p>
        </div>

        <ChevronRightIcon />
      </div>
    </div>
  );
};

const NotificationSection = ({
  title,
  notifications,
}: {
  title: string;
  notifications: Notification[];
}) => {
  if (notifications.length === 0) return null;

  return (
    <div className="mb-2">
      <h3 className="px-4 py-2 text-sm font-semibold text-foreground">
        {title}
      </h3>
      <div>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

const Notifications = () => {
  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-background max-w-xl border-r border-l mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-4 px-4 h-14">
          <button
            onClick={() => navigate.back()}
            className="p-1 -ml-1 text-foreground hover:text-primary transition-colors"
          >
            <BackIcon />
          </button>
          <h1 className="text-lg font-semibold text-foreground">
            Notifications
          </h1>
        </div>
      </header>

      {/* Follow Requests - Sticky */}
      <FollowRequestsSection />

      {/* Notifications List */}
      <div className="pb-24">
        <NotificationSection title="Today" notifications={todayNotifications} />
        <NotificationSection
          title="Yesterday"
          notifications={yesterdayNotifications}
        />
        <NotificationSection
          title="This Week"
          notifications={thisWeekNotifications}
        />
      </div>
    </div>
  );
};

export default Notifications;
