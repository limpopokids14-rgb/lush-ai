
export type MediaFormat = '1:1' | '9:16' | '16:9';
export type MediaType = 'image' | 'video';

export interface StyleTemplate {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  promptPrefix: string;
  mood: string;
}

export interface GeneratedItem {
  id: string;
  url: string;
  type: MediaType;
  timestamp: number;
  prompt: string;
  format: MediaFormat;
  styleId: string;
}

export enum AppTab {
  HOME = 'home',
  GENERATE = 'generate',
  LIBRARY = 'library'
}
