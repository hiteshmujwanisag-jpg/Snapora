// Tabs Component
export const Tabs = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) => { return (
  <div className="sticky top-16 z-40 bg-background border-b border-border">
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex">
        {["Home", "For You"].map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex-1 py-3 text-sm font-semibold transition-smooth relative ${
              activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  </div>
)};