import MessageListItem from '../components/MessageListItem';
import React, { useState, useEffect, useCallback } from 'react';
import { useClipboard, availableFeatures } from '@ionic/react-hooks/clipboard';
import { Plugins, ClipboardReadResult } from '@capacitor/core';
import { Message, getMessages } from '../data/messages';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle
} from '@ionic/react';
import { Plugins as CapPlugins } from '@capacitor/core';
import './Home.css';

const useToaster = () => {
  const { Toast } = CapPlugins;
  const showToast = useCallback(() => {
    Toast.show({
      text: 'Hello!' + Math.random()
    });
  }, [])
  return {
    showToast
  }
}

const Home: React.FC = () => {

  const capHooks = useClipboard()
  const { showToast } = useToaster()
  const [messages, setMessages] = useState<Message[]>([]);

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              Toast
            </IonCardHeader>
            <IonCardContent>
              <IonButton onClick={showToast}>Show toast</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Use Capacitor</IonCardTitle>
            </IonCardHeader>
            {availableFeatures.useClipboard ? (
            <IonCardContent>
              <pre>{JSON.stringify(capHooks.value, null, 2)}</pre>
              <IonButton onClick={() => capHooks.setValue('Hello Ionic' + Math.random())}>Write</IonButton>
              <IonButton onClick={() => capHooks.getValue()}>Read</IonButton>
            </IonCardContent>
            ) : null}
          </IonCard>
        </IonContent>

        <IonList>
          {messages.map(m => <MessageListItem key={m.id} message={m} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
