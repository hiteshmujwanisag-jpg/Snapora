import React, { useRef } from "react";
import { View, Dimensions, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export default function CustomCarosuel() {
  const data = [
    require("@/assets/onboarding/onboarding_slide_1.png"),
    require("@/assets/onboarding/onboarding_slide_1.png"),
    require("@/assets/onboarding/onboarding_slide_1.png"),
  ];

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Carousel
        loop
        autoPlay
        autoPlayInterval={2500}
        width={width}
        height={500}
        data={data}
        pagingEnabled
        scrollAnimationDuration={800}
        renderItem={({ item }) => (
          <Image
            source={item}
            style={{ width: width, height: 500, resizeMode: "contain" }}
          />
        )}
      />
    </View>
  );
}
