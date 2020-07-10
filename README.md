# Ionic React with Capacitor example


## Just try the demo site

You can deploy the demo site to the following services.

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/getshifter/example-ionic-react-capacitor)


[![netlifybutton](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/getshifter/example-ionic-react-capacitor)

## Getting started

```bash
$ git clone git@github.com:getshifter/example-ionic-react-capacitor.git
$ cd example-ionic-react-capacitor
$ npm install
$ npm start
```

## Production build

```bash
$ npm run build
```

## iOS

We can run it as a ios application using XCode.


```bash
$ npx cap add ios
$ yarn run build 
$ npx cap sync
$ npx cap open ios
```

## Desktop application

We can run it as a Desktop application


```bash
$ npx cap add electron
$ yarn run build 
$ npx cap sync
$ npx cap open electron
```


### Build for Desktop

```bash
$ yarn run build && npx cap copy
$ cd electron
$ npx electron-packager . sample --platform=darwin --arch=x64
$ open ./sample-darwin-x64
```
