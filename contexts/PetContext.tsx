import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PetContextType {
  petId: string | null;
  setPetId: (id: string) => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider = ({ children }: { children: ReactNode }) => {
  const [petId, setPetId] = useState<string | null>(null);

  return (
    <PetContext.Provider value={{ petId, setPetId }}>
      {children}
    </PetContext.Provider>
  );
};

export default PetProvider;

export const usePetContext = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePetContext must be used within a PetProvider');
  }
  return context;
};
