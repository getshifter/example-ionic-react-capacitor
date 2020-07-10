import React, { useState, useCallback } from "react";
import { Plugins, CameraResultType } from '@capacitor/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
} from '@ionic/react';

const { Camera } = Plugins;

export const CameraDemo = () => {
    const [imageURL, setImageURL] = useState('')
    const takePicture = useCallback(() => {
        Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.DataUrl
        }).then(image => {
            if (image.dataUrl) setImageURL(image.dataUrl)
        }).catch(err => console.log(err))
    }, [setImageURL])
    const resetImage = useCallback(() => {
      setImageURL('')
    }, [setImageURL])


    return (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Take a Photo by Capacitor</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
              {imageURL ? (<IonImg src={imageURL} />) : null}
              <IonButton onClick={resetImage} fill='clear'>Reset</IonButton>
              <IonButton onClick={takePicture}>Take picture</IonButton>
          </IonCardContent>
        </IonCard>
    )
}