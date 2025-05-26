import { useState, useRef } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import Tab from '@/components/Tab';

import { colors } from '@/constants';
import FeedScreen from './FeedScreen';
import CleanScreen from './CleanScreen';
import HealthScreen from './HealthScreen';
export default function ManageScreen() {
  const { id } = useLocalSearchParams();
  const pagerRef = useRef<PagerView>(null);
  const [currentTab, setCurrentTab] = useState(0);

  const handlePressTab = (index: number) => {
    pagerRef.current?.setPage(index);
    setCurrentTab(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {['급여', '청소', '건강'].map((tab, index) => (
          <Tab
            key={tab}
            isActive={currentTab === index}
            onPress={() => handlePressTab(index)}
          >
            {tab}
          </Tab>
        ))}
      </View>

      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
      >
        <FeedScreen key='1' />
        <CleanScreen key='2' />
        <HealthScreen key='3' />
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  tabContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
  },
  pagerView: {
    flex: 1,
  },
});
