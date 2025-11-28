// Story type
type Story = {
  id: number;
  username: string;
  image: string;
  hasNew: boolean;
};

// Story Item Component
export const StoryItem = ({ story }: { story: Story }) => { return(
  <button className="flex flex-col items-center gap-2 group flex-shrink-0">
    <div className={`p-0.5 rounded-xl ${story.hasNew ? "gradient-stories" : "bg-border"} transition-smooth group-hover:scale-105`}>
      <div className="p-0.5 bg-card rounded-[10px]">
        <img
          src={story.image}
          alt={story.username}
          className="w-16 h-16 rounded-lg object-cover"
        />
      </div>
    </div>
    <span className="text-xs text-muted-foreground font-medium truncate max-w-[72px]">
      {story.username}
    </span>
  </button>
)};