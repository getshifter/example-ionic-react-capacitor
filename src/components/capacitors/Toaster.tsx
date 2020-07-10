import React, { useCallback } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import { Plugins as CapPlugins } from '@capacitor/core';

const useToaster = () => {
  const { Toast } = CapPlugins;
  const showToast = useCallback(() => {
    Toast.show({
      text: 'Hello!' + Math.random()
    });
  }, [Toast])
  return {
    showToast
  }
}

export const ToasterDemo = () => {
    const { showToast } = useToaster()
    return (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Toast</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton onClick={showToast}>Show toast</IonButton>
          </IonCardContent>
        </IonCard>
    )
}