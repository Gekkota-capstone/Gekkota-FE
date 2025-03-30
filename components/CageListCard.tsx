import { Link } from 'expo-router';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface PetCardProps {
  id: number;
  name: string;
  species: string;
  traits: string[];
  imageUri: string;
}

export default function CageListCard({
  id,
  name,
  species,
  traits,
  imageUri,
}: PetCardProps) {
  return (
    <Link
      href={`/cage/${id}`}
      asChild
    >
      <TouchableOpacity style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: imageUri }}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.species}>{species}</Text>
          <View style={styles.traitsContainer}>
            {traits.map((trait, idx) => (
              <View
                style={styles.trait}
                key={idx}
              >
                <Text style={styles.traitText}>{trait}</Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
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
    marginVertical: 4,
  },
  traitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  trait: {
    backgroundColor: '#E0E8FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 6,
    marginTop: 4,
  },
  traitText: {
    fontSize: 11,
    color: '#5A80FF',
  },
});
