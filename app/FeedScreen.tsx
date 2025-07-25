import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';

import PostCard from '@/components/PostCard';
import { fetchPosts, Post } from '@/services/api';

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadPosts = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await fetchPosts(page);
      setPosts((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleLike = useCallback(
    (id: string) => {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                liked: !p.liked,
                likes: p.liked ? p.likes - 1 : p.likes + 1,
              }
            : p,
        ),
      );
    },
    [setPosts],
  );

  const toggleSave = useCallback(
    (id: string) => {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p)),
      );
    },
    [setPosts],
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard post={item} onToggleLike={toggleLike} onToggleSave={toggleSave} />
        )}
        onEndReached={loadPosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator style={{ margin: 16 }} /> : null}
      />
    </View>
  );
}
