import { useState } from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";

// SVG icons (after SVG transformer setup)
import Like from "../../assets/icons/Like.svg";
import Liked from "../../assets/icons/Liked.svg";
import Comment from "../../assets/icons/Comment.svg";
import ShareIcon from "../../assets/icons/Share.svg";
import Save from "../../assets/icons/Save.svg";
import Saved from "../../assets/icons/Saved.svg";
import Elipse from "../../assets/icons/elipse.svg";

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
    <View className="bg-white rounded-xl shadow border border-gray-300 overflow-hidden mb-4">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2 p-2">
          <Image
            source={{ uri: post.user.avatar }}
            className="w-12 h-12 rounded-full"
          />
          <View className="">
            <View className="flex-row items-center gap-1">
              <Text className="text-md font-semibold text-black">
                {post.user.name}
              </Text>
              <Text className="text-gray-500 text-sm">• {post.timeAgo}</Text>
            </View>
            <Text className="text-sm text-gray-500">Jaipur, Rajasthan</Text>
          </View>
        </View>

        <Pressable className="p-3">
          <Elipse width={24} height={24} />
        </Pressable>
      </View>

      {/* Post Image */}
      <Image
        source={{ uri: post.image }}
        className="w-full aspect-square"
        resizeMode="cover"
      />

      {/* Actions */}
      <View>
        <View className="flex-row items-center justify-between border-b border-gray-300 p-3">
          <View className="flex-row items-center gap-3">
            {/* Like Button */}
            <Pressable
              onPress={handleLike}
              className="flex-row items-center gap-1"
            >
              {liked ? (
                <Liked width={24} height={24} />
              ) : (
                <Like width={24} height={24} />
              )}
              <Text className="text-lg font-medium">
                {formatNumber(likeCount)}
              </Text>
            </Pressable>

            {/* Comment */}
            <Pressable className="flex-row items-center gap-1">
              <Comment width={24} height={24} />
              <Text className="text-lg font-medium">
                {formatNumber(post.comments)}
              </Text>
            </Pressable>

            {/* Share */}
            <Pressable className="flex-row items-center gap-1">
              <ShareIcon width={24} height={24} />
              <Text className="text-lg font-medium">
                {formatNumber(post.comments)}
              </Text>
            </Pressable>
          </View>

          {/* Save */}
          <Pressable>
            <Save width={24} height={24} />
          </Pressable>
        </View>

        {/* Caption */}
        <View className="flex flex-row gap-2 p-3">
          <Text className="text-md flex-1" numberOfLines={3}>
            <Text className="font-bold text-black">{post.user.name} </Text>
            <Text className="text-black font-light">{post.caption}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
