
export interface Student {
  id: string;
  originalImage?: {
    file: File;
    dataUrl: string;
    base64: string;
    mimeType: string;
  };
  profession: string;
  age: string;
  style: string;
  aspectRatio: string;
  background: string;
  specialRequest: string;
  generatedImage?: string;
  isGenerating: boolean;
  error?: string;
}

export type AspectRatio = '1:1' | '3:4' | '9:16';
