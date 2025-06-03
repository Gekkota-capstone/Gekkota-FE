export type FeedKey =
  | '사료'
  | '귀뚜라미'
  | '밀웜'
  | '슈퍼밀웜'
  | '왁스웜'
  | '누에'
  | '과일'
  | '채소';

export const feedData: { name: string; key: FeedKey }[] = [
  { name: '사료', key: '사료' },
  { name: '귀뚜라미', key: '귀뚜라미' },
  { name: '밀웜', key: '밀웜' },
  { name: '슈퍼밀웜', key: '슈퍼밀웜' },
  { name: '왁스웜', key: '왁스웜' },
  { name: '누에', key: '누에' },
  { name: '과일', key: '과일' },
  { name: '채소', key: '채소' },
];

export const feedImages: Record<FeedKey, { color: any; bw: any }> = {
  사료: {
    color: require('@/assets/images/feed/feed.png'),
    bw: require('@/assets/images/feed/feed_bw.png'),
  },
  귀뚜라미: {
    color: require('@/assets/images/feed/cricket.png'),
    bw: require('@/assets/images/feed/cricket_bw.png'),
  },
  밀웜: {
    color: require('@/assets/images/feed/mealworm.png'),
    bw: require('@/assets/images/feed/mealworm_bw.png'),
  },
  슈퍼밀웜: {
    color: require('@/assets/images/feed/superworm.png'),
    bw: require('@/assets/images/feed/superworm_bw.png'),
  },
  왁스웜: {
    color: require('@/assets/images/feed/waxworm.png'),
    bw: require('@/assets/images/feed/waxworm_bw.png'),
  },
  누에: {
    color: require('@/assets/images/feed/silkworm.png'),
    bw: require('@/assets/images/feed/silkworm_bw.png'),
  },
  과일: {
    color: require('@/assets/images/feed/fruit.png'),
    bw: require('@/assets/images/feed/fruit_bw.png'),
  },
  채소: {
    color: require('@/assets/images/feed/vegetable.png'),
    bw: require('@/assets/images/feed/vegetable_bw.png'),
  },
};

export const sizes = ['극소', '소', '중', '대', '특대'];
