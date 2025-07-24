import axios from 'axios';

export interface Post {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  description: string;
  likes: number;
  image: string;
  comments: number;
  liked: boolean;
  saved: boolean;
  location: string;
}

const API_URL = 'https://662029f13bf790e070af2cd8.mockapi.io/api/v1/posts';

export async function fetchPosts(page = 1, limit = 10) {
  const response = await axios.get<Post[]>(API_URL, {
    params: { page, limit },
  });
  return response.data;
}
