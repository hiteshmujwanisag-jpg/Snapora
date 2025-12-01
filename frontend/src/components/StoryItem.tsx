// Story type
type Story = {
  id: number;
  username: string;
  image: string;
  hasNew: boolean;
};

// Story Item Component
export const StoryItem = ({ story }: { story: Story }) => {
  return (
    <button className="flex flex-col items-center gap-1 group flex-shrink-0">
      <div className="border-2 border-red-400 rounded-full overflow-hidden">
        <div className="p-1 bg-card rounded-full">
          <img
            src={story.image}
            alt={story.username}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs text-black font-medium truncate max-w-[72px]">
        {story.username}
      </span>
    </button>
  );
};
