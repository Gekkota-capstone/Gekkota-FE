// src/contexts/PetContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Context에서 사용할 타입 정의
interface PetContextType {
  petId: string | null;
  setPetId: (id: string) => void;
}

// PetContext 초기값 설정
const PetContext = createContext<PetContextType | undefined>(undefined);

// Context Provider 컴포넌트
export const PetProvider = ({ children }: { children: ReactNode }) => {
  const [petId, setPetId] = useState<string | null>(null);

  return (
    <PetContext.Provider value={{ petId, setPetId }}>
      {children}
    </PetContext.Provider>
  );
};

export default PetProvider;

// usePetContext 훅: Context 값을 쉽게 사용할 수 있도록 제공
export const usePetContext = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePetContext must be used within a PetProvider');
  }
  return context;
};
