import React, { useCallback } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import moment from 'moment';

import { Post } from '@/services/api';

interface Props {
  post: Post;
  onToggleLike: (id: string) => void;
  onToggleSave: (id: string) => void;
}

export default function PostCard({ post, onToggleLike, onToggleSave }: Props) {
  const handleLike = useCallback(() => {
    onToggleLike(post.id);
  }, [onToggleLike, post.id]);

  const handleSave = useCallback(() => {
    onToggleSave(post.id);
  }, [onToggleSave, post.id]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{post.name}</Text>
          <Text style={styles.location}>{post.location}</Text>
        </View>
      </View>

      {/* Image */}
      <Image source={{ uri: post.image }} style={styles.image} />

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={handleLike} hitSlop={8}>
            {post.liked ? (
              <FontAwesome name="heart" size={24} color="#e91e63" />
            ) : (
              <FontAwesome name="heart-o" size={24} color="#222" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.commentIcon} hitSlop={8}>
            <Feather name="message-circle" size={24} color="#222" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSave} hitSlop={8}>
          {post.saved ? (
            <FontAwesome name="bookmark" size={24} color="#222" />
          ) : (
            <FontAwesome name="bookmark-o" size={24} color="#222" />
          )}
        </TouchableOpacity>
      </View>

      {/* Likes */}
      <Text style={styles.likes}>{post.likes} likes</Text>

      {/* Description */}
      <View style={styles.descriptionRow}>
        <Text style={styles.name}>{post.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {` ${post.description}`}
        </Text>
      </View>

      {/* Created at */}
      <Text style={styles.date}>{moment(post.createdAt).fromNow()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerInfo: {
    marginLeft: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  location: {
    fontSize: 12,
    color: '#666',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#ccc',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  leftActions: {
    flexDirection: 'row',
  },
  commentIcon: {
    marginLeft: 12,
  },
  likes: {
    fontWeight: 'bold',
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  descriptionRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  description: {
    flex: 1,
  },
  date: {
    paddingHorizontal: 12,
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
});
