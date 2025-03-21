// HomeScreen.tsx
import { useGetList } from '@/hooks/useGetList';
import { View, Text, SafeAreaView } from 'react-native';

export default function HomeScreen() {
  const { data, isLoading, error } = useGetList();
  console.log(data);
  console.log(error);

  if (isLoading) return <Text>로딩 중...</Text>;
  if (error) return <Text>에러 발생: {error.message}</Text>;
  if (!data) return <>없음</>;

  return (
    <SafeAreaView>
      <Text>ID: {data.list.id}</Text>
      <Text>Name: {data.list.name}</Text>
      <Text>Type: {data.list.type}</Text>
      <Text>Duration: {data.list.duration}</Text>
    </SafeAreaView>
  );
}
