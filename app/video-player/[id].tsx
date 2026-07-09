import { useLocalSearchParams } from 'expo-router';
import VideoPlayerScreen from '../../screens/video-player/VideoPlayerScreen';

export default function VideoPlayerRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const surahNumber = parseInt(id || '1', 10);
  
  return <VideoPlayerScreen surahNumber={surahNumber} />;
}
