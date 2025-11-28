import HomeIcon from '../assets/icons/HomeIcon.svg'
import { StoryItem } from './StoryItem';



// Stories Section Component
export const StoriesSection = ({stories}:any) => { return(
  <section className="py-4 border-b border-border">
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {/* Add Story Button */}
        <button className="flex flex-col items-center gap-2 flex-shrink-0 group">
          <div className="w-[68px] h-[68px] rounded-xl border-2 border-dashed border-border flex items-center justify-center transition-smooth group-hover:border-primary group-hover:bg-primary/5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground group-hover:text-primary transition-smooth">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <span className="text-xs text-muted-foreground font-medium">Add Story</span>
        </button>
        {stories.map((story:any) => (
          <StoryItem key={story.id} story={story} />
        ))}
      </div>
    </div>
  </section>
)};