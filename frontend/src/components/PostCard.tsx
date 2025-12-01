import { useState } from "react";
import Like from "../assets/icons/Like.svg";
import Liked from "../assets/icons/Liked.svg";
import Comment from "../assets/icons/Comment.svg";
import Image from "next/image";
import share from "../assets/icons/Share.svg";
import save from "../assets/icons/Save.svg";
import saved from "../assets/icons/Saved.svg";
import elipse from "../assets/icons/elipse.svg";
// Post Card Component
export const PostCard = ({ post }: any) => {
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
    <article className="bg-card rounded-xl shadow-card overflow-hidden transition-smooth hover:shadow-card-hover animate-fade-in border">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 p-2">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex gap-2 items-center">
              <p className="text-md font-semibold text-foreground truncate">
                {post.user.name}
              </p>
              <p className="text-muted-foreground text-sm">• {post.timeAgo}</p>
            </div>
            <p className="text-sm text-muted-foreground">Jaipur , Rajasthan</p>
          </div>
        </div>
        <div className="p-3">
          <button>
            <Image alt="dots" src={elipse} className="w-6 h-6" />
          </button>
        </div>
      </div>
      <img
        src={post.image}
        alt={post.caption}
        className="w-full aspect-[1/1] object-cover"
      />
      <div className="">
        {/* User Info */}
        {/* Actions */}
        <div className="flex items-center justify-between border-b border-border p-3">
          <div className="flex items-center gap-3 ">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 transition-smooth 1`}
            >
              <Image src={Like} alt="Like" className="h-6 w-6" />
              {/* <Image src={Liked} alt="Liked" className="h-6 w-6" /> */}
              <span className="text-lg font-bold">
                {formatNumber(likeCount)}
              </span>
            </button>
            <button className="flex items-center gap-1.5 text-black hover:text-foreground transition-smooth">
              <Image src={Comment} alt="Liked" className="h-6 w-6" />
              <span className="text-lg font-bold">
                {formatNumber(post.comments)}
              </span>
            </button>
            <button className="flex items-center gap-1.5 text-black hover:text-foreground transition-smooth">
              <Image src={share} alt="share" className="h-6 w-6" />
              <span className="text-lg font-bold">
                {formatNumber(post.comments)}
              </span>
            </button>
          </div>
          <div className="flex items-center">
            <button className=" text-muted-foreground hover:text-foreground transition-smooth">
              {/* <Image src={saved} alt="saved" className="w-6 h-6" /> */}
              <Image src={save} alt="save" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Caption */}
        <div className="flex gap-2 p-3 items-center">
          <p className="text-md line-clamp-2">
            <span className="font-bold text-black">
              {post.user.name}{" "}
              <span className="text-black font-light">
                {post.caption}
                {post.caption}
                {post.caption}
                {post.caption}
                {post.caption}
                {post.caption}
              </span>
            </span>
          </p>
          <p className="text-md text-foreground mb-3 line-clamp-2"></p>
        </div>
      </div>
    </article>
  );
};
