[<img src="https://about.mappls.com/images/mappls-b-logo.svg" height="60"/> </p>](https://www.mapmyindia.com/api)


# Mappls Intouch React Native SDK
## Introduction
Get Real-Time Location Tracking for your apps with Mappls InTouch SDK. Track a user's live location with our simplified InTouch React native SDK integration, highly customizable to your specific needs.

The InTouch SDK comes with a variety of events that enable better control and power over your tracking needs. Also get location benefits built for various applications including logistics, delivery tracking, employee tracking, and live location sharing.

To get started, explore the InTouch Demo App.

Already have an application which is build on React Native? Give it a boost with the powerful features of InTouch. Learn how to  [Integrate the InTouch SDK](#add-intouch-sdk)

-   [Setup](#Setup): Please contact  [apisupport@mapmyindia.com](mailto:apisupport@mapmyindia.com)  to get the Intouch SDK authorization for your Client ID and Client Secret.
-   [Quick Start](#intouchdemo-app): Start with a ready-to-go app
-   [Integrate the SDK](#IntegrateIntouchSDK): Integrate the SDK into your app
-   [Dashboard](https://intouch.mappls.com/nextgen): See all your devices' locations on Mappls InTouch Dashboard

## [Setup](#setup)

We use your Client ID to identify your account details and assign all your user's devices under a single account. 

To get your Outh2 Rest API Client ID and Client Secret please login to Mappls [API Dashboard](https://apis.mappls.com/console/)  

Please contact [apisupport@mapmyindia.com](mailto:apisupport@mapmyindia.com) to get InTouch SDK access to your Client ID

After getting the access, you can [start with the InTouchDemo app](#InTouchDemoApp), or [Integrate the InTouch SDK](#AddInTouchSDK) in your app.

## [InTouchDemo app](#intouchdemo-app)
This guide allows you to add live location tracking to your react native app. [Visual Studio](https://code.visualstudio.com/?wt.mc_id=DX_841432) is the recommended development environment for building an app with the Mappls InTouch React native SDK or you can use any other IDE.

#### Step 1. Download the InTouchDemo App.
[Click here](https://github.com/mappls-api/mappls-android-sdk/archive/refs/heads/main.zip) to download the InTouchDemo App Project. Open this project in [Visual Studio](https://code.visualstudio.com/?wt.mc_id=DX_841432)

#### Step 2. Set your key

1.  Add the Client Id and Client Secret to InputScreen.js file.
    
2.  Run npm install

3.  Run project on your device using simulator instance using below mentioned command line.

     `npx react-native run-android`

#### Step 3. Check your location on the InTouch [dashboard](https://intouch.mappls.com/nextgen)



## [Integrate the InTouch React Native  SDK](#add-intouch-sdk)

## Getting started
Install the below mentioned library in your project.

`npm install mappls-intouch-react-native --save`

* If using React-native<0.60
` react-native link mappls-intouch-react-native`

##  Installation
For Android and Ios add the below mentioned lines

### Android
* Add following line in `android/build.gradle` file:-
```groovy
allprojects {
   repositories {
            mavenLocal()
            maven {
// All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
           url("$rootDir/../node_modules/react-native/android")
            }
           maven {
 // Android JSC is installed from npm
    url("$rootDir/../node_modules/jsc-android/dist")
          }

  
+       maven { url 'https://maven.mappls.com/repository/mappls/'}

           google()
           jcenter()
           maven { url 'https://www.jitpack.io' }

         }

}
```
  * Add following line in `android/app/build.gradle` file:-
  
  ```groovy
  defaultConfig {

applicationId "com.intouch_react_native_sample"

minSdkVersion rootProject.ext.minSdkVersion

targetSdkVersion rootProject.ext.targetSdkVersion

versionCode 1

versionName "1.0"

+ multiDexEnabled true

}
```

#### Note:
1. Java Version 11 Required
2. minimum compileSdkVersion 31 required

### IOS
*  Add follwoing permissions in your project's plist.info

~~~
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Your location is used to personalize content.</string>
 
<key>NSLocationAlwaysUsageDescription</key>
<string>Your location is used to personalize content.</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>Your location is used to personalize content.</string> 

<key>NSMotionUsageDescription</key> 
<string>In order to count steps I need an access to your pedometer</string>

<key>UIBackgroundModes</key>
<array>
<string>fetch</string>
<string>location</string>
</array>
~~~
* Add following function in your project's **AppDelegate.h**
~~~objectivec
#import <MapplsIntouchCore/MapplsIntouchCore.h>
~~~
* Add following function in your project's **AppDelegate.m**

~~~objectivec

- (void)application:(UIApplication *)application performFetchWithCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler
{
[Intouch.shared backgroundfetchWithCompletionHandler:completionHandler];
}
~~~


* Enable **background fetch** and **location updates** from Signing and Capabilities

* run **pod install** from ios folder
## Steps to use SDK into your project

#### Step 1: Import Intouch SDK
```javascript
import  MapplsIntouch  from  'mappls-intouch-react-native';

```

#### Step 2.  Check if Intouch SDK is already initialized
```javascript
const  status = await  MapplsIntouch.isInitialized();
```

#### Step 3: Initialize Intouch SDK

Initialize the SDK with your Client ID and Client Secret and device name.Device name helps to identify the user on Portal.

```javascript
MapplsIntouch.initialize(deviceName,clientId,clientSecret)
   .then(entityId  => {
   console.log(entityId);
   }).catch(err=>{
     console.log(err.message)
   });
```
  
### OR
Initialize the SDK with your Client ID , Client Secret , device name and deviceId. deviceId should be unique ID for every user.
*  deviceId will be used to store the data against the particular user.
* deviceName will be used to identify the user on Portal
  
~~~javascript
MapplsIntouch.initializeWithDeviceId(deviceName,clientId,clientSecret,deviceId,
(result) => {
if (result === 'success') {
//success
 } else {
//error 
});
~~~
  
**Note**:This method can be used in case if your users uses two mobile phone. In this case, Both the mobile phone data will be pushed against the same deviceID. So ensure that before user logging into the new phone, logout the user from previous phone and call the stop tracking method. So that always tracking data will come from the single phone.

#### Step 4:  Check if Intouch SDK is already running
```javascript
const  status = await  MapplsIntouch.isRunning()
```
#### Step 5. Start tracking
Track your app user's phone live location by using the below method.
```javascript
MapplsIntouch.startTracking();
```
**You can start tracking using below three options**

-   MapplsIntouch.BEACON_PRIORITY_FAST
-   MapplsIntouch.BEACON_PRIORITY_OPTIMAL(default)
-   MapplsIntouch.BEACON_PRIORITY_SLOW
~~~javascript
MapplsIntouch.startTracking(MapplsIntouch.BEACON_PRIORITY_OPTIMAL);
~~~
Note: If no priority provided default will be used.

#### OR

~~~javascript
MapplsIntouch.startTrackingWithCustomConfig({
  standByTimeInMins: 1,//mandatory
  timeWhileMovingInSec: 10,//mandatory
  enableRequestPermissionIfMissing:true
  autoTrackingConfig: {endTimeConfig: {hour:  7, minute:  58, amPm:  "pm"}}
  });
~~~

  

*  **timeWhileMovingInSec**:(number) tracking api hit time while moving in seconds.

*  **standByTimeInMins**:(number) tracking api hit time while standby in minutes.

  

#### Only for android Platform

*  **enableRequestPermissionIfMissing**(boolean) Location permissions will handle by SDK if set to true.Default value is true
*  **autoTrackingConfig**(object): To set auto tracking settings:
	*  **endTimeConfig**(object): To set option to stop the tracking at time
		* **hour**(number): To set hours (1-12)
		* **minute**(number): To set minutes (0 - 59). Default value 0
		* **second**(number): To set seconds (0 - 59). Default is 0
		* **amPm**(String): `am` or `pm`. Default value is `am`

#### Step 6. Stop tracking
To stop your app user's phone live location tracking use the below mentioned method.
```javascript
MapplsIntouch.stopTracking();
```
#### Step 7. Listen for tracking events
This method will be called when tracking starts, stops or some tracking error is caught.
```javascript
MapplsIntouch.addTrackingStateListener((event) => {
if(event === 'onTrackingStart'){

}else if(event === 'onTrackingStop'){

}
},(error)=>{
console.log(error.message);
});
```
#### Step 8. Remove Listener
This method will remove TrackingStateListener. Call this method before Unmounting component.
```javascript
MapplsIntouch.removeTrackingStateListener();
```
#### Step 9. getCurrentLocationUpdate 
Updates single location on server and return to the user
~~~javascript
try {
const  res= await  MapplsIntouch.getCurrentLocationUpdate();
//do something with response
} catch (e) {
//error log
}
~~~
*  optional parameter(Android)
**enableRequestPermissionIfMissing**(boolean) Location permissions will be handled by SDK if set to true.Default value is true.

<br><br><br>

For any queries and support, please contact: 

[<img src="https://about.mappls.com/images/mappls-logo.svg" height="40"/> </p>](https://about.mappls.com/api/)
Email us at [apisupport@mappls.com](mailto:apisupport@mappls.com)


![](https://www.mapmyindia.com/api/img/icons/support.png)
[Support](https://about.mappls.com/contact/)
Need support? contact us!

<br></br>
<br></br>

[<p align="center"> <img src="https://www.mapmyindia.com/api/img/icons/stack-overflow.png"/> ](https://stackoverflow.com/questions/tagged/mappls-api)[![](https://www.mapmyindia.com/api/img/icons/blog.png)](https://about.mappls.com/blog/)[![](https://www.mapmyindia.com/api/img/icons/gethub.png)](https://github.com/Mappls-api)[<img src="https://mmi-api-team.s3.ap-south-1.amazonaws.com/API-Team/npm-logo.one-third%5B1%5D.png" height="40"/> </p>](https://www.npmjs.com/org/mapmyindia) 



[<p align="center"> <img src="https://www.mapmyindia.com/june-newsletter/icon4.png"/> ](https://www.facebook.com/Mapplsofficial)[![](https://www.mapmyindia.com/june-newsletter/icon2.png)](https://twitter.com/mappls)[![](https://www.mapmyindia.com/newsletter/2017/aug/llinkedin.png)](https://www.linkedin.com/company/mappls/)[![](https://www.mapmyindia.com/june-newsletter/icon3.png)](https://www.youtube.com/channel/UCAWvWsh-dZLLeUU7_J9HiOA)




<div align="center">@ Copyright 2022 CE Info Systems Ltd. All Rights Reserved.</div>

<div align="center"> <a href="https://about.mappls.com/api/terms-&-conditions">Terms & Conditions</a> | <a href="https://about.mappls.com/about/privacy-policy">Privacy Policy</a> | <a href="https://about.mappls.com/pdf/mapmyIndia-sustainability-policy-healt-labour-rules-supplir-sustainability.pdf">Supplier Sustainability Policy</a> | <a href="https://about.mappls.com/pdf/Health-Safety-Management.pdf">Health & Safety Policy</a> | <a href="https://about.mappls.com/pdf/Environment-Sustainability-Policy-CSR-Report.pdf">Environmental Policy & CSR Report</a>

<div align="center">Customer Care: +91-9999333223</div>