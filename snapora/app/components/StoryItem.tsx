import { View, Text, Image, TouchableOpacity } from "react-native";

type Story = {
  id: number;
  username: string;
  image: string;
  hasNew: boolean;
};

export const StoryItem = ({ story }: { story: Story }) => {
  return (
    <TouchableOpacity className="flex flex-col items-center gap-1 mx-1 flex-shrink-0">
      <View
        className={`rounded-full overflow-hidden border-2 ${
          story.hasNew ? "border-red-400" : "border-gray-300"
        }`}
      >
        <View className="p-1 bg-white rounded-full">
          <Image
            source={{ uri: story.image }}
            className="w-20 h-20 rounded-full"
          />
        </View>
      </View>

      <Text
        className="text-xs text-black font-medium max-w-[72px]"
        numberOfLines={1}
      >
        {story.username}
      </Text>
    </TouchableOpacity>
  );
};
