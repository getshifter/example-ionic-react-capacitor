import React from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import { useClipboard, availableFeatures } from '@ionic/react-hooks/clipboard';


export const ClipboardDemo = () => {
    const capHooks = useClipboard()
    return (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Access Native clipboard API</IonCardTitle>
          </IonCardHeader>
          {availableFeatures.useClipboard ? (
          <IonCardContent>
            <pre>{JSON.stringify(capHooks.value, null, 2)}</pre>
            <IonButton onClick={() => capHooks.setValue('Hello Ionic' + Math.random())}>Write</IonButton>
            <IonButton onClick={() => capHooks.getValue()}>Read</IonButton>
          </IonCardContent>
          ) : null}
        </IonCard>
    )
}