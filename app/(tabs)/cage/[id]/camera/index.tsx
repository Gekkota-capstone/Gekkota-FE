import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import { usePostDevicesInfo } from '@/hooks/usePostDevicesInfo';
import { DevicesInfo } from '@/api/resposeType';
import { colors } from '@/constants';

export default function CameraScreen() {
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { mutate, isPending, isError } = usePostDevicesInfo();

  useEffect(() => {
    mutate(undefined, {
      onSuccess: (data: DevicesInfo) => {
        console.log('RTSP URL:', data.rtsp_url);
        setUrl(data.rtsp_url);
      },
      onError: () => {
        console.error('❌ 기기 정보 요청 실패');
      },
    });
  }, []);

  if ((isPending || !url) && !isError) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator
          size='large'
          color={colors.BLUE_500}
        />
        <Text style={styles.loadingText}>카메라 스트림을 불러오는 중...</Text>
      </SafeAreaView>
    );
  }

  if (isError || !url) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>
          ❌ 기기 정보를 불러오는 데 실패했습니다.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.title}>실시간 카메라 스트리밍</Text>
      <View style={styles.videoContainer}>
        {isLoading && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator
              size='large'
              color={colors.BLUE_500}
            />
          </View>
        )}
        <VLCPlayer
          style={styles.video}
          videoAspectRatio='16:9'
          source={{ uri: url }}
          autoplay
          paused={false}
          onBuffering={() => {
            console.log('⏳ Buffering...');
            setIsLoading(true);
          }}
          onPlaying={() => {
            console.log('✅ Playing');
            setIsLoading(false);
          }}
          onError={(e) => {
            console.warn('❌ VLC Error:', e);
            setIsLoading(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: colors.WHITE,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.BLACK,
  },
  videoContainer: {
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
    aspectRatio: 16 / 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 12,
  },
  loadingText: {
    color: colors.GRAY_600,
    fontSize: 14,
    marginTop: 12,
  },
});
