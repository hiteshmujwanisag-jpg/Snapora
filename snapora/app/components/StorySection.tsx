import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
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
          <TouchableOpacity className="flex flex-col items-center gap-1 flex-shrink-0 mr-2 ml-3">
            <View
              className={
                "rounded-full overflow-hidden border-2 border-gray-300"
              }
            >
              <View className="p-1 bg-white rounded-full">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
                  }}
                  className="w-20 h-20 rounded-full"
                />
              </View>
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
