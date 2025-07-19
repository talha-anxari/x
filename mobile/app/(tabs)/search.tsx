import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const TRENDING_TOPICS = [
  { topic: "AIinEducation", tweets: "87K" },
  { topic: "CricketWorldCup", tweets: "152K" },
  { topic: "SpaceXLaunch", tweets: "119K" },
  { topic: "EcoFriendlyLiving", tweets: "76K" },
  { topic: "PakistanTechSummit", tweets: "104K" },
  { topic: "PakistanTechSummit", tweets: "104K" },
  { topic: "PakistanTechSummit", tweets: "104K" },
];

const Search = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center px-4 py-3 bg-gray-100 rounded-full">
          <Feather name="search" size={20} color={"#657786"} />
          <TextInput
            placeholder="Search Twitter"
            className="flex-1 ml-3 text-base outline-0"
            placeholderTextColor={"#657786"}
          />
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="mb-4 text-xl font-bold text-gray-900">
            Trending for you
          </Text>
          {TRENDING_TOPICS.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="py-3 border-b border-gray-100"
            >
              <Text className="text-sm text-gray-500">
                Trending in Technology
              </Text>
              <Text className="text-lg font-bold text-gray-900">
                {item.topic}
              </Text>
              <Text className="text-sm text-gray-500">
                {item.tweets} Tweets
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
