import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Slider from "@react-native-community/slider";

const EmojiSlider = () => {
  const emojiData = [
    {
      bwImageSource: require("../../assets/bwEmoji/BwWorst.png"),
      colorImageSource: require("../../assets/emoji/Worst.png"),
      label: "Worst",
    },
    {
      bwImageSource: require("../../assets/bwEmoji/Bwnot_good.png"),
      colorImageSource: require("../../assets/emoji/not_good.png"),
      label: "Not good",
    },
    {
      bwImageSource: require("../../assets/bwEmoji/BwFine.png"),
      colorImageSource: require("../../assets/emoji/Fine.png"),
      label: "Fine",
    },
    {
      bwImageSource: require("../../assets/bwEmoji/BwGood.png"),
      colorImageSource: require("../../assets/emoji/Good.png"),
      label: "Look good",
    },
    {
      bwImageSource: require("../../assets/bwEmoji/BwLoveit.png"),
      colorImageSource: require("../../assets/emoji/Loveit.png"),
      label: "Very good",
    },
  ];

  const [selectedEmoji, setSelectedEmoji] = useState(0);
  const [hoveredEmoji, setHoveredEmoji] = useState(null);

  const handleEmojiSliderChange = (value) => {
    setSelectedEmoji(value);
  };

  const handleEmojiHover = (index) => {
    setHoveredEmoji(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.emojiContainer}>
        {emojiData.map((emojiItem, index) => (
          <View
            key={index}
            style={[
              styles.emojiItem,
              hoveredEmoji === index && styles.hoveredEmojiItem,
            ]}
            onMouseEnter={() => handleEmojiHover(index)}
            onMouseLeave={() => handleEmojiHover(null)}
          >
            <Image
              style={[styles.emojiImage]}
              source={
                selectedEmoji === index
                  ? emojiItem.colorImageSource
                  : emojiItem.bwImageSource
              }
            />
            <Text
              style={[
                styles.labelText,
                (selectedEmoji === index || hoveredEmoji === index) &&
                styles.hoveredLabelText,
              ]}
            >
              {emojiItem.label}
            </Text>
          </View>
        ))}
      </View>

      <Slider
        style={styles.slider}
        value={selectedEmoji}
        minimumValue={0}
        maximumValue={emojiData.length - 1}
        step={1}
        onValueChange={handleEmojiSliderChange}
        minimumTrackTintColor="#7781FB"
        maximumTrackTintColor="#7781FB"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emojiContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  emojiItem: {
    alignItems: "center",
    marginRight: 14,
  },
  emojiImage: {
    width: 30,
    height: 30,
  },
  emojiText: {
    fontSize: 18,
  },
  labelText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#105955",
  },
  hoveredLabelText: {
    color: "#7781FB",
  },
  slider: {
    width: "96%",
  },
});

export default EmojiSlider;
