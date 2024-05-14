import axios from "axios";
import axiosInstance from "@/api/portal-user/request-adapter";

export const getYoutubeResults = (searchQuery: string) => axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q= ${searchQuery}&type=video&maxResults=2&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`)