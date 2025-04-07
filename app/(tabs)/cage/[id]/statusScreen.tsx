import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FeedTab from './status/feed'
import CleanTab from './status/clean'
import HealthTab from './status/health'
import TabHeader from './status/tabHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

export type TabValue = 'feed' | 'clean' | 'health';

export default function StatusScreen() {
  const [activeTab, setActiveTab] = useState<TabValue>('feed');

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <FeedTab />;
      case 'clean':
        return <CleanTab />;
      case 'health':
        return <HealthTab />;
    }
  };

  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title: '관리', headerTitleAlign: 'center' }} />
      <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    marginTop: 40
},
  content: { 
    flex: 1, 
    padding: 16 
},
});
