import { Link, router } from 'expo-router';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface PetCardProps {
  id: string;
  name: string;
  species: string;
  gender: string;
  birthdate: string;
}

export default function CageListCard({
  id,
  name,
  species,
  gender,
  birthdate,
}: PetCardProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/cage/${id}`);
        console.log(`id값은? ${id}`); // id 값 확인용
      }}
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={
          species === 'leopard'
            ? require('@/assets/images/leopard.png')
            : require('@/assets/images/leopard_bw.png')
        }
      />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.species}>{species}</Text>
        <Text style={styles.species}>{gender}</Text>
        <Text style={styles.species}>{birthdate}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
  },
  species: {
    color: '#666',
    marginVertical: 2,
  },
});
