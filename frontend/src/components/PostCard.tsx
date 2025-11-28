import { useState } from "react";
import HomeIcon from '../assets/icons/HomeIcon.svg'
import Image from "next/image";

// Post Card Component
export const PostCard = ({ post }:any) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };

  return (
    <article className="bg-card rounded-xl shadow-card overflow-hidden transition-smooth hover:shadow-card-hover animate-fade-in">
      <img
        src={post.image}
        alt={post.caption}
        className="w-full aspect-[4/5] object-cover"
      />
      <div className="p-3">
        {/* User Info */}
        <div className="flex items-center gap-2 mb-2">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{post.user.name}</p>
            <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
          </div>
        </div>

        {/* Caption */}
        <p className="text-sm text-foreground mb-3 line-clamp-2">{post.caption}</p>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 transition-smooth ${
                liked ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
             <Image src={HomeIcon} alt='homeicon' />
              <span className="text-xs font-medium">{formatNumber(likeCount)}</span>
            </button>
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-smooth">
              <Image src={HomeIcon} alt='homeicon' />
              <span className="text-xs font-medium">{formatNumber(post.comments)}</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-muted-foreground hover:text-foreground transition-smooth">
             <Image src={HomeIcon} alt='homeicon' />
            </button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground transition-smooth">
             <Image src={HomeIcon} alt='homeicon' />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};