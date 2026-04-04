import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import Avatar from "./Avatar";

export default function PostCard({ info }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(info.likeCount || 0);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((count) => (liked ? count - 1 : count + 1));
  };

  const handleCommentToggle = () => {
    setShowComment((prev) => !prev);
  };

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    Alert.alert("Comment sent");
    setCommentText("");
    setShowComment(false);
  };

  const handleShare = () => {
    Alert.alert("Link copied to clipboard");
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Avatar size={48} source={{ uri: info.avatar }} />
        <View style={styles.meta}>
          <Text style={styles.username}>{info.user}</Text>
          <Text style={styles.timestamp}>{info.time}</Text>
        </View>
      </View>

      <Text style={styles.text}>{info.content}</Text>
      <Image
        style={styles.image}
        source={
          typeof info.image === "number" ? info.image : { uri: info.image }
        }
      />

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleLike}>
          <Text style={[styles.actionText, liked && styles.activeText]}>
            Like {likeCount > 0 ? `• ${likeCount}` : ""}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={handleCommentToggle}
        >
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>

      {showComment && (
        <View style={styles.commentBox}>
          <TextInput
            style={styles.commentInput}
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Write a comment..."
            placeholderTextColor="#7A8C8C"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendComment}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  meta: {
    marginLeft: 10,
  },
  username: {
    fontWeight: "700",
    color: "#1E2A2A",
    fontSize: 15,
  },
  timestamp: {
    fontSize: 12,
    color: "#7A8C8C",
  },
  text: {
    color: "#1E2A2A",
    marginBottom: 8,
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#F4F6F6",
  },
  actionText: {
    color: "#7A8C8C",
    fontWeight: "600",
  },
  activeText: {
    color: "#3D9E9E",
  },
  commentBox: {
    marginTop: 12,
    backgroundColor: "#F4F6F6",
    borderRadius: 12,
    padding: 10,
  },
  commentInput: {
    height: 38,
    borderColor: "#d9e2e2",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "#1E2A2A",
    marginBottom: 8,
  },
  sendButton: {
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#3D9E9E",
  },
  sendText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
