// CameraScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import { usePostDevicesInfo } from '@/hooks/usePostDevicesInfo';
import { DevicesInfo } from '@/api/resposeType';

export default function CameraScreen() {
  // const [devices, setDevices] = useState<null | DevicesInfo>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { mutate, isPending, isError } = usePostDevicesInfo();

  useEffect(() => {
    mutate(undefined, {
      onSuccess: (data: DevicesInfo) => {
        console.log(data.rtsp_url);
        setUrl(data.rtsp_url);
      },
      onError: () => {},
    });
  }, []);

  if (isPending && !url) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size='large' />
      </SafeAreaView>
    );
  }

  if (isError || !url) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>기기 정보를 불러오는 중 오류가 발생했습니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>카메라1</Text>
        <View style={styles.videoContainer}>
          {isLoading && (
            <View style={styles.loaderOverlay}>
              <ActivityIndicator
                size='large'
                color='#000'
              />
            </View>
          )}
          <VLCPlayer
            style={styles.video}
            videoAspectRatio='16:9'
            source={{ uri: 'rtsp://192.168.0.159:8554/stream' }}
            autoplay={true}
            paused={false}
            onBuffering={() => {
              console.log('⏳ Buffering...');
            }}
            onPlaying={() => {
              console.log('✅ Playing started');
              setIsLoading(false);
            }}
            onError={(e) => {
              console.warn('❌ VLC Error:', e);
              setIsLoading(false);
            }}
          />
        </View>

        <Text style={styles.title}>카메라2</Text>
        <View style={styles.videoContainer}>
          <VLCPlayer
            style={styles.video}
            videoAspectRatio='16:9'
            source={{ uri: 'rtsp://192.168.0.159:8554/stream' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { padding: 16 },
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
  video: { width: '100%', height: '100%' },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
