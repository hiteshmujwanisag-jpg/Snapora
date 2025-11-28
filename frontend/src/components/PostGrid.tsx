import HomeIcon from '../assets/icons/HomeIcon.svg'
import { PostCard } from './PostCard';

// Post type
type Post = {
  id: number;
  user: { name: string; username: string; avatar: string };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
};

// Posts Grid Component
export const PostsGrid = ({ posts }: { posts: Post[] }) =>{
  return(
  <section className="py-6">
    <div className="max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-2 gap-4">
        {posts.map((post) => (
         
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  </section>
)
} ;