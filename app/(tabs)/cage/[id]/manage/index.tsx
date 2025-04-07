import { useState, useRef } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import Tab from '@/components/Tab';
import FeedScreen from './components/FeedScreen';
import CleanScreen from './components/CleanScreen';
import HealthScreen from './components/HealthScreen';
import { colors } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        <View>
          <FeedScreen key='1' />
        </View>
        <View>
          <CleanScreen key='2' />
        </View>
        <View>
          <HealthScreen key='3' />
        </View>
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
