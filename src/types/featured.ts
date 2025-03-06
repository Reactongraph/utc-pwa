export interface FeaturedContent {
  id: number;
  title: string;
  description?: string;
  image_url?: string;
  link_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContentType {
  id: number;
  title: string;
  description?: string;
  image_url?: string;
  link_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface FeaturedResponse {
  status: string;
  message?: string;
  data: ContentType[];
} 