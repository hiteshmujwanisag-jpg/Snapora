import { View, ScrollView } from "react-native";
import { PostCard } from "./PostCard";

type Post = {
  id: number;
  user: { name: string; username: string; avatar: string };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
};

export const PostsGrid = ({ posts }: { posts: Post[] }) => {
  return (
    <View className="py-4">
      <View className="px-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-col flex-1 gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
