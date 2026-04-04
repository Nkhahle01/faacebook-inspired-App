import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StoryItem from "../components/StoryItem";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("Home");
  const [postText, setPostText] = useState("");
  const [searchText, setSearchText] = useState("");

  // handles the stories
  const stories = [
    {
      id: "1",
      name: "Add Story",
      type: "add",
      image: "https://picsum.photos/seed/story1/100",
    },
    {
      id: "2",
      name: "Lerato Sithole",
      type: "normal",
      image: "https://picsum.photos/seed/story2/100",
    },
    {
      id: "3",
      name: "Palesa Mohapi",
      type: "normal",
      image: "https://picsum.photos/seed/story3/100",
    },
    {
      id: "4",
      name: "Mpho Nkosi",
      type: "normal",
      image: "https://picsum.photos/seed/story4/100",
    },
    {
      id: "5",
      name: "Nthabiseng Mofokeng",
      type: "normal",
      image: "https://picsum.photos/seed/story5/100",
    },
  ];

  const posts = [
    {
      id: "1",
      user: "Thabo Mokoena",
      time: "2h",
      content: "just had a really nice coffee and the sun came out",
      image: require("../assets/pexels-a-darmel-7862404.jpg"),
      avatar: "https://picsum.photos/seed/avatar1/100",
      likeCount: 14,
    },
    {
      id: "2",
      user: "Lerato Sithole",
      time: "4h",
      content: "weekend hiking plans with friends",
      image: require("../assets/pexels-artempodrez-7648279.jpg"),
      avatar: "https://picsum.photos/seed/avatar2/100",
      likeCount: 8,
    },
    {
      id: "3",
      user: "Mpho Nkosi",
      time: "1d",
      content: "this is a peaceful place, you should visit sometime",
      image: "https://picsum.photos/seed/post3/600/400",
      avatar: "https://picsum.photos/seed/avatar3/100",
      likeCount: 22,
    },
  ];

  const profilePosts = [
    {
      id: "p1",
      user: "Thabo Mokoena",
      time: "3h",
      content: "new profile shot from the weekend",
      image: require("../assets/pexels-rdne-7915243.jpg"),
      avatar: "https://picsum.photos/seed/avatar1/100",
      likeCount: 32,
    },
    {
      id: "p2",
      user: "Thabo Mokoena",
      time: "6h",
      content: "finding calm in a busy week",
      image: "https://picsum.photos/seed/profile2/600/400",
      avatar: "https://picsum.photos/seed/avatar1/100",
      likeCount: 19,
    },
    {
      id: "p3",
      user: "Thabo Mokoena",
      time: "1d",
      content: "little moments are the best ones",
      image: require("../assets/pexels-artempodrez-7648297.jpg"),
      avatar: "https://picsum.photos/seed/avatar1/100",
      likeCount: 27,
    },
  ];

  const notifications = [
    {
      id: "n1",
      title: "Lerato Sithole liked your photo",
      detail: "Tap to see the post",
      time: "5m ago",
    },
    {
      id: "n2",
      title: "Mpho Nkosi commented: 'Looks amazing!'",
      detail: "Commented on your latest update",
      time: "1h ago",
    },
    {
      id: "n3",
      title: "Palesa Mohapi started following you",
      detail: "You have a new follower",
      time: "2h ago",
    },
  ];

  const filteredPosts = posts.filter((item) => {
    const query = searchText.toLowerCase().trim();
    return (
      item.user.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query)
    );
  });

  const isSearch = activeTab === "Search";
  const isProfile = activeTab === "Profile";
  const isNotifications = activeTab === "Notifications";
  const isHomeFeed = !isSearch && !isProfile && !isNotifications;

  const handleFeaturePress = () => {
    Alert.alert("Feature coming soon");
  };

  const renderStory = ({ item }) => <StoryItem item={item} />;
  const renderPost = ({ item }) => <PostCard info={item} />;
  const renderProfilePost = ({ item }) => <PostCard info={item} />;
  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDetail}>{item.detail}</Text>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {isSearch && (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search for people, posts and more"
              placeholderTextColor="#7A8C8C"
            />
          </View>
        )}

        <View style={styles.createPostContainer}>
          <TextInput
            style={styles.createInput}
            value={postText}
            onChangeText={setPostText}
            placeholder="What's on your mind?"
            placeholderTextColor="#7A8C8C"
          />
          <View style={styles.createButtons}>
            <TouchableOpacity
              onPress={handleFeaturePress}
              style={styles.createButton}
            >
              <Text style={styles.createButtonText}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleFeaturePress}
              style={styles.createButton}
            >
              <Text style={styles.createButtonText}>Video</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.storiesWrap}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={stories}
            keyExtractor={(item) => item.id}
            renderItem={renderStory}
          />
        </View>

        {isSearch && !searchText.trim() && (
          <View style={styles.searchMessageBox}>
            <Text style={styles.searchMessageText}>
              Search for people, posts and more
            </Text>
          </View>
        )}

        {isSearch && searchText.trim() ? (
          filteredPosts.length ? (
            <FlatList
              style={styles.feed}
              data={filteredPosts}
              keyExtractor={(item) => item.id}
              renderItem={renderPost}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.searchMessageBox}>
              <Text style={styles.searchMessageText}>No results found</Text>
            </View>
          )
        ) : isNotifications ? (
          <FlatList
            style={styles.feed}
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderNotification}
            showsVerticalScrollIndicator={false}
          />
        ) : isProfile ? (
          <View style={styles.profileContainer}>
            <View style={styles.coverContainer}>
              <Image
                style={styles.coverPhoto}
                source={{ uri: "https://picsum.photos/seed/cover/900/300" }}
              />
              <View style={styles.profileImageWrapper}>
                <Image
                  style={styles.profilePhoto}
                  source={{ uri: "https://picsum.photos/seed/avatar1/140" }}
                />
              </View>
            </View>
            <Text style={styles.profileName}>Thabo Mokoena</Text>
            <Text style={styles.profileBio}>Living life one day at a time</Text>
            <View style={styles.profileExtras}>
              <Text style={styles.profileExtraText}>
                Enjoys quiet mornings, soft music, and good coffee
              </Text>
              <Text style={styles.profileExtraText}>
                Recent: shared a new story about a weekend hike
              </Text>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>1.5k</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>320</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <View style={styles.quickInfoRow}>
              <View style={styles.quickInfoItem}>
                <Text style={styles.quickInfoTitle}>Travel</Text>
              </View>
              <View style={styles.quickInfoItem}>
                <Text style={styles.quickInfoTitle}>Food</Text>
              </View>
              <View style={styles.quickInfoItem}>
                <Text style={styles.quickInfoTitle}>Music</Text>
              </View>
            </View>
            <FlatList
              style={styles.profilePosts}
              data={profilePosts}
              keyExtractor={(item) => item.id}
              renderItem={renderProfilePost}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : isSearch ? null : (
          <FlatList
            style={styles.feed}
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={renderPost}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F6",
  },
  innerContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  searchContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    borderColor: "#d9e2e2",
    borderWidth: 1,
  },
  searchInput: {
    height: 40,
    color: "#1E2A2A",
  },
  createPostContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  createInput: {
    height: 40,
    borderColor: "#d9e2e2",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 12,
    color: "#1E2A2A",
    marginBottom: 10,
  },
  createButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  createButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: "#F4F6F6",
  },
  createButtonText: {
    color: "#3D9E9E",
    fontWeight: "500",
  },
  storiesWrap: {
    marginBottom: 12,
    height: 110,
  },
  searchMessageBox: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  searchMessageText: {
    color: "#1E2A2A",
    fontSize: 14,
  },
  notificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderColor: "#d9e2e2",
    borderWidth: 1,
  },
  notificationTitle: {
    fontWeight: "700",
    color: "#1E2A2A",
    marginBottom: 4,
  },
  notificationDetail: {
    color: "#7A8C8C",
    marginBottom: 8,
  },
  notificationTime: {
    color: "#B0BFBF",
    fontSize: 12,
  },
  profileContainer: {
    flex: 1,
  },
  coverContainer: {
    marginBottom: 14,
  },
  coverPhoto: {
    width: "100%",
    height: 90,
    borderRadius: 14,
  },
  profileImageWrapper: {
    position: "absolute",
    left: 20,
    bottom: -18,
    borderWidth: 3,
    borderColor: "#F4F6F6",
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  profilePhoto: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  profileName: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "700",
    color: "#1E2A2A",
  },
  profileBio: {
    color: "#7A8C8C",
    marginTop: 2,
    marginBottom: 6,
    fontSize: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontWeight: "700",
    color: "#1E2A2A",
    fontSize: 14,
  },
  statLabel: {
    color: "#7A8C8C",
    fontSize: 11,
  },
  editButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 6,
    borderColor: "#d9e2e2",
    borderWidth: 1,
  },
  editButtonText: {
    color: "#3D9E9E",
    fontWeight: "700",
    fontSize: 13,
  },
  profileExtras: {
    marginBottom: 6,
  },
  profileExtraText: {
    color: "#7A8C8C",
    fontSize: 11,
    marginBottom: 2,
  },
  quickInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  quickInfoItem: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 6,
    marginRight: 6,
    alignItems: "center",
    borderColor: "#d9e2e2",
    borderWidth: 1,
  },
  quickInfoTitle: {
    color: "#1E2A2A",
    fontWeight: "600",
    fontSize: 12,
  },
  profilePosts: {
    flex: 1,
  },
  feed: {
    flex: 1,
  },
});
