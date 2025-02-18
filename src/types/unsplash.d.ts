export interface UnsplashPhoto {
    id: string;
    width: number;
    height: number;
    urls: {
      small: string;
      regular: string;
      thumb: string;
    };
    alt_description: string;
  }
  
  export interface UnsplashSearchResponse {
    results: UnsplashPhoto[];
    total_pages: number;
  }