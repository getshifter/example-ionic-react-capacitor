import React, { useState, useCallback } from 'react';
import { Message, getMessage } from '../data/messages';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  IonButton
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import { useClipboard, availableFeatures } from '@ionic/react-hooks/clipboard';
import { Plugins as CapPlugins } from '@capacitor/core';
import './ViewMessage.css';

interface ViewMessageProps extends RouteComponentProps<{ id: string; }> { }

const { Toast } = CapPlugins;
const ViewMessage: React.FC<ViewMessageProps> = ({ match }) => {

  const [message, setMessage] = useState<Message>();
  const { setValue } = useClipboard()
  const copyTitle = useCallback(() => {
    if (message && message.subject) {
      setValue(message.subject)
      Toast.show({
        text: "copied"
      });
    }
  }, [message, setValue])

  useIonViewWillEnter(() => {
    const msg = getMessage(parseInt(match.params.id, 10));
    setMessage(msg);
  });

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Inbox" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {message ? (
          <>
            <IonItem>
              <IonIcon icon={personCircle} color="primary"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {message.fromName}
                  <span className="date">
                    <IonNote>{message.date}</IonNote>
                  </span>
                </h2>
                <h3>To: <IonNote>Me</IonNote></h3>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{message.subject} {availableFeatures.useClipboard ? <IonButton fill='outline' onClick={copyTitle}>Copy</IonButton>: null}</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </>
        ) : <div>Message not found</div>}
      </IonContent>
    </IonPage>
  );
};

export default ViewMessage;
