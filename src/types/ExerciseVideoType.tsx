export interface ExerciseVideoType{
    video: { 
        videoId: any; 
        thumbnails: { 
            url: string | undefined; 
        }[]; 
        title: string | undefined; 
        channelName: string;
    }; 
}