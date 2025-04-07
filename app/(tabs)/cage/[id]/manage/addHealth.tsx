import React, { useMemo, useRef, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { colors } from '@/constants';
import { Controller, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import BottomSheet from '@/components/BottomSheet';
import SheddingSheet from '@/components/SheddingSheet';
export default function HealthAddScreen() {
  const router = useRouter();

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: { weight: '', shedding: '해당없음', memo: '', photo: '' },
  });

  const [isSheetVisible, setSheetVisible] = useState(false);
  const [shedding, setShedding] = useState('해당없음');
  const photo = watch('photo');
  const onSubmit = (data: any) => {
    console.log(data);
    router.back();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setValue('photo', result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{ title: '건강 추가', headerTitleAlign: 'center' }}
        />
        <ScrollView style={styles.content}>
          {/* 몸무게 입력 */}
          <View style={styles.row}>
            <Text style={styles.label}>몸무게</Text>
            <Controller
              control={control}
              name='weight'
              render={({ field: { value, onChange } }) => (
                <TextInput
                  style={styles.input}
                  placeholder='0.00'
                  keyboardType='numeric'
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Text style={styles.unit}>g</Text>
          </View>

          {/* 탈피 상태 */}
          <TouchableOpacity
            style={styles.row}
            onPress={() => setSheetVisible(true)}
          >
            <Text style={styles.label}>탈피</Text>
            <Text style={styles.selectedText}>{shedding}</Text>
          </TouchableOpacity>

          {/* 메모 */}
          <View style={styles.memoContainer}>
            <Text style={styles.label}>메모</Text>
            <Controller
              control={control}
              name='memo'
              render={({ field: { value, onChange } }) => (
                <TextInput
                  style={styles.memoInput}
                  placeholder='반려동물의 건강에 대한 메모를 남겨보세요.'
                  multiline
                  maxLength={100}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>

          {/* 사진 */}
          <View style={styles.photoContainer}>
            <Text style={styles.label}>사진</Text>
            <TouchableOpacity
              style={styles.photoPicker}
              onPress={pickImage}
            >
              {photo ? (
                <Image
                  source={{ uri: photo }}
                  style={styles.photoPicker}
                />
              ) : (
                <Text style={styles.photoText}>+</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.cta}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.ctaText}>저장</Text>
        </TouchableOpacity>

        {/* Bottom Sheet */}
        <SheddingSheet
          visible={isSheetVisible}
          onClose={() => setSheetVisible(false)}
          onSelect={(status: string) => {
            setShedding(status);
            setValue('shedding', status); // react-hook-form 값도 갱신
          }}
          selected={shedding}
          list={['해당없음', '탈피 예정', '탈피 중', '탈피 완료', '탈피 실패']}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.WHITE },
  content: { flex: 1, paddingHorizontal: 20 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_300,
  },
  label: { fontSize: 16, fontWeight: '500', color: colors.BLACK },
  input: { fontSize: 16, color: colors.BLACK, textAlign: 'right', flex: 1 },
  unit: { marginLeft: 8, fontSize: 16, fontWeight: '500', color: colors.BLACK },
  selectedText: { fontSize: 16, color: colors.BLUE_500 },
  memoContainer: { marginVertical: 20 },
  memoInput: {
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 10,
    padding: 10,
    minHeight: 80,
  },
  photoContainer: { marginVertical: 20 },
  photoPicker: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  photoText: { fontSize: 24, color: colors.GRAY_500 },
  cta: {
    backgroundColor: colors.BLUE_500,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    margin: 20,
  },
  ctaText: { color: colors.WHITE, fontSize: 18, fontWeight: '700' },
  sheetContent: { padding: 16 },
  sheetItem: { fontSize: 16, paddingVertical: 12 },
  selectedSheetItem: { color: colors.BLUE_500, fontWeight: '600' },
});
