import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { VLCPlayer } from 'react-native-vlc-media-player';

export default function CameraScreen() {
  const player1 = useVideoPlayer('rtsp://192.168.0.153:8554/test', (player) => {
    player.loop = true;
    player.play();
  });

  const player2 = useVideoPlayer(
    'https://your-cdn/video2/stream.m3u8',
    (player) => {
      player.loop = true;
      player.play();
    }
  );

  const { status: status1 } = useEvent(player1, 'statusChange', {
    status: player1.status,
  });
  const { status: status2 } = useEvent(player2, 'statusChange', {
    status: player2.status,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>카메라1</Text>
      <View style={styles.videoContainer}>
        {status1 === 'loading' && (
          <ActivityIndicator
            style={styles.loading}
            size='large'
          />
        )}
        <VLCPlayer
        style={[styles.video]}
        videoAspectRatio='16:9'
        source={{
          uri: 'rtsp://192.168.0.153:8554/test',
        }}
      />
      </View>

      <Text style={styles.title}>카메라2</Text>
      <View style={styles.videoContainer}>
        {status2 === 'loading' && (
          <ActivityIndicator
            style={styles.loading}
            size='large'
          />
        )}
        <VideoView
          player={player2}
          style={styles.video}
        />
      </View>
      
    </ScrollView>
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
