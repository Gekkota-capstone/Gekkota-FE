export type FeedKey =
  | 'feed'
  | 'cricket'
  | 'mealworm'
  | 'superworm'
  | 'waxworm'
  | 'silkworm'
  | 'fruit'
  | 'vegetable';

export const feedData: { name: string; key: FeedKey }[] = [
  { name: '사료', key: 'feed' },
  { name: '귀뚜라미', key: 'cricket' },
  { name: '밀웜', key: 'mealworm' },
  { name: '슈퍼밀웜', key: 'superworm' },
  { name: '왁스웜', key: 'waxworm' },
  { name: '누에', key: 'silkworm' },
  { name: '과일', key: 'fruit' },
  { name: '채소', key: 'vegetable' },
];

export const feedImages: Record<FeedKey, { color: any; bw: any }> = {
  feed: {
    color: require('@/assets/images/feed/feed.png'),
    bw: require('@/assets/images/feed/feed_bw.png'),
  },
  cricket: {
    color: require('@/assets/images/feed/cricket.png'),
    bw: require('@/assets/images/feed/cricket_bw.png'),
  },
  mealworm: {
    color: require('@/assets/images/feed/mealworm.png'),
    bw: require('@/assets/images/feed/mealworm_bw.png'),
  },
  superworm: {
    color: require('@/assets/images/feed/superworm.png'),
    bw: require('@/assets/images/feed/superworm_bw.png'),
  },
  waxworm: {
    color: require('@/assets/images/feed/waxworm.png'),
    bw: require('@/assets/images/feed/waxworm_bw.png'),
  },
  silkworm: {
    color: require('@/assets/images/feed/silkworm.png'),
    bw: require('@/assets/images/feed/silkworm_bw.png'),
  },
  fruit: {
    color: require('@/assets/images/feed/fruit.png'),
    bw: require('@/assets/images/feed/fruit_bw.png'),
  },
  vegetable: {
    color: require('@/assets/images/feed/vegetable.png'),
    bw: require('@/assets/images/feed/vegetable_bw.png'),
  },
};

export const sizes = ['극소', '소', '중', '대', '특대'];
