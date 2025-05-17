import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import RegisterButton from '@/components/RegisterButton';
import CageListCard from '@/components/CageListCard';
import { useGetList } from '@/hooks/useGetList';

export default function HomeScreen() {
  const { data, isLoading, error } = useGetList();
  console.log(data);

  if (isLoading) return <Text style={styles.loading}>로딩 중...</Text>;
  if (error || !data) return <Text style={styles.loading}>에러 발생</Text>;

  const list = Array.isArray(data) ? data : [data];

  return (
    <SafeAreaView style={styles.container}>
      <RegisterButton />
      <Text style={styles.subtitle}>나의 반려동물</Text>
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <CageListCard
              id={item.pet_id}
              name={item.name}
              species={item.species}
              gender={item.gender}
              birthdate={item.birthdate}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subtitle: {
    marginHorizontal: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '700',
  },
  loading: {
    marginTop: 50,
    textAlign: 'center',
    color: '#555',
  },
});
