import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RegisterButton() {
  const router = useRouter();

  const handlePress = (): void => {
    router.push('/cageForm'); // '/newScreen'으로 이동 (이동할 페이지 경로로 수정)
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.container}>
      <Ionicons
        name='add-circle'
        size={20}
        color='#555'
      />
      <Text style={styles.text}>새 케이지 등록하기</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    padding: 14,
    margin: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 8,
    color: '#555',
    fontWeight: '500',
  },
});
