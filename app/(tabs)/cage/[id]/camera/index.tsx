import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import { useGetLiveCameras } from '@/hooks/useGetLiveCameras';
import { useLocalSearchParams } from 'expo-router';

export default function CameraScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError } = useGetLiveCameras(Number(id));

  if (isLoading) return <Text style={styles.loading}>로딩 중...</Text>;
  if (isError || !data) return <Text style={styles.loading}>에러 발생</Text>;

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>카메라1</Text>
        <View style={styles.videoContainer}>
          {data?.camera1?.streamUrl ? (
            <VLCPlayer
              style={styles.video}
              videoAspectRatio='16:9'
              source={{ uri: data.camera1.streamUrl }}
            />
          ) : (
            <ActivityIndicator size='large' />
          )}
        </View>

        <Text style={styles.title}>카메라2</Text>
        <View style={styles.videoContainer}>
          {data?.camera2?.streamUrl ? (
            <VLCPlayer
              style={styles.video}
              videoAspectRatio='16:9'
              source={{ uri: data.camera2.streamUrl }}
            />
          ) : (
            <ActivityIndicator size='large' />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  videoContainer: {
    backgroundColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 24,
    aspectRatio: 16 / 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loading: {
    position: 'absolute',
    zIndex: 10,
  },
});
