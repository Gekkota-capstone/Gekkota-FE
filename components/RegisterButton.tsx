import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterButton() {
  return (
    <TouchableOpacity style={styles.container}>
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
