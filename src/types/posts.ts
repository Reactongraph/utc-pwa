export interface Post {
  id: number;
  title: string;
  content: string;
  author?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreatePostDto {
  title: string;
  content: string;
  image_url?: string;
}

export interface UpdatePostDto {
  id: number;
  title?: string;
  content?: string;
  image_url?: string;
} 