import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Create from "../../assets/icons/Create.svg"; // optional SVG icon
import { StoryItem } from "./StoryItem";

export const StoriesSection = ({ stories }: any) => {
  return (
    <View className="py-4 border-b border-gray-300">
      <View className="max-w-xl mx-auto">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          {/* Add Story Button */}
          <TouchableOpacity className="flex flex-col items-center gap-1 flex-shrink-0 mr-2 ml-4">
            <View className="!w-[80px] !h-[80px] rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
              {/* <Create className="h-6 w-6" /> */}
              <Text className="text-2xl text-gray-500">+</Text>
            </View>
            <Text className="text-xs text-black font-medium">Add Story</Text>
          </TouchableOpacity>

          {/* User Stories */}
          {stories.map((story: any) => (
            <StoryItem key={story.id} story={story} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
