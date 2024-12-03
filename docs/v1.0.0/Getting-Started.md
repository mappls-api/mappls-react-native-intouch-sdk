[<img src="https://about.mappls.com/images/mappls-b-logo.svg" height="60"/> </p>](https://www.mapmyindia.com/api)

# Mappls Intouch React Native SDK
## Introduction
Get Real-Time Location Tracking for your apps with Mappls InTouch SDK. Track a user's live location with our simplified InTouch React native SDK integration, highly customizable to your specific needs.

The InTouch SDK comes with a variety of events that enable better control and power over your tracking needs. Also get location benefits built for various applications including logistics, delivery tracking, employee tracking, and live location sharing.

## [Getting Started](#getting-started)

### [Installation](#installation)

**Dependencies**

* [node](https://nodejs.org)
* [npm](https://www.npmjs.com/)
* [React Native](https://facebook.github.io/react-native/):  recommended version 0.60 or greater

**npm**
~~~
npm install mappls-intouch-react-native --save
~~~

#### IOS Installation
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

* Enable **background fetch** and **location updates** from Signing and Capabilities

**React-Native >=  `0.60.0`**

If you are using autolinking feature introduced in React-Native  `0.60.0`  you do not need any additional steps.
Just run  `pod install`  and rebuild your project.

**React-Native < `0.60.0`**

##### Using CocoaPods
To install with CocoaPods, add the following to your  `Podfile`:
```
  # Mappls
  pod 'mappls-intouch-react-native', :path => '../node_modules/mappls-intouch-react-native'

  # Make also sure you have use_frameworks! enabled
  use_frameworks!

```

Then run  `pod install`  and rebuild your project.

#### Android Installation
**React-Native >=  `0.60.0`**
If you are using autolinking feature introduced in React-Native  `0.60.0`   have to add only following lines in `android/build.gradle` file:-

* We need to add an additional repository in order to get our dependencies.
```diff
allprojects {
    repositories {
        mavenLocal()
        google()
        jcenter()
        maven { url "https://jitpack.io" }
+       maven { url 'https://maven.mappls.com/repository/mappls/'}
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
    }
}
```

**React-Native < `0.60.0`**

`react-native link` should get you almost there,  
however we need to add some additional lines to `build.gradle`.

    
## 1. `android/build.gradle`
We need to add an additional repository in order to get our dependencies.

* `https://jitpack.io`
* `https://maven.mappls.com/repository/mappls/ `
```diff
allprojects {
    repositories {
        mavenLocal()
        google()
+       maven { url "https://jitpack.io" }
+       maven { url 'https://maven.mappls.com/repository/mappls/'}
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
    }
}
```

Make sure that your `buildscript > ext` settings are correct.

```
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
        compileSdkVersion = 34
        targetSdkVersion = 34
    }
}
```

Everything below should've been covered by `react-native link`,   
however it never hurts to make sure it actually did what it was supposed to

---


## 2. `android/app/build.gradle`

Add project under `dependencies`

```diff
dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"
    implementation "com.facebook.react:react-native:+"  // From node_modules
+   implementation project(':mappls-intouch-react-native')
}
```


## 3. `android/settings.gradle`

Include project, so gradle knows where to find the project

```diff
rootProject.name = <YOUR_PROJECT_NAME>

+include ':mappls-intouch-react-native'
+project(':mappls-intouch-react-native').projectDir = new File(rootProject.projectDir, '../node_modules/mappls-intouch-react-native/android/app')

include ':app'¬
```

## 4. `android/app/src/main/java/com/PROJECT_NAME/MainApplication.java`

We need to register our package

Add `import com.mappls.sdk.intouch.reactnative.MapplsIntouchPackage;`  
as an import statement and  
`new MapplsIntouchPackage()` within the `getPackages()` method

```diff
package <YOUR_PROJECT_NAME>;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
+import com.mappls.sdk.intouch.reactnative.MapplsIntouchPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
+         new MapplsIntouchPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
```

### [Added Import]()
~~~javascript
import  MapplsIntouch  from  'mappls-intouch-react-native';
~~~

### [To Check Intouch is Initialised]()
Check if Intouch SDK is already initialized or not:
~~~javascript
const  status = await  MapplsIntouch.isInitialized();
~~~

### [Intouch Initialisation]()
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

### [Check Intouch Running]()
```javascript
const  status = await  MapplsIntouch.isRunning()
```

### [Start tracking]()
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

#### OR (Only for android Platform)

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
*  **enableRequestPermissionIfMissing**(boolean) Location permissions will handle by SDK if set to true.Default value is true
*  **autoTrackingConfig**(object): To set auto tracking settings:
	*  **endTimeConfig**(object): To set option to stop the tracking at time
		* **hour**(number): To set hours (1-12)
		* **minute**(number): To set minutes (0 - 59). Default value 0
		* **second**(number): To set seconds (0 - 59). Default is 0
		* **amPm**(String): `am` or `pm`. Default value is `am`

### [Stop tracking]()
To stop your app user's phone live location tracking use the below mentioned method.
```javascript
MapplsIntouch.stopTracking();
```

### [Tracking Event Listener]()
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

To remove this listener
```javascript
MapplsIntouch.removeTrackingStateListener();
```

### [Get Current Locaton]()
Updates single location on server and return to the user
~~~javascript
try {
const  res= await  MapplsIntouch.getCurrentLocationUpdate();
//do something with response
} catch (e) {
//error log
}
~~~

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




<div align="center">@ Copyright 2024 CE Info Systems Ltd. All Rights Reserved.</div>

<div align="center"> <a href="https://about.mappls.com/api/terms-&-conditions">Terms & Conditions</a> | <a href="https://about.mappls.com/about/privacy-policy">Privacy Policy</a> | <a href="https://about.mappls.com/pdf/mapmyIndia-sustainability-policy-healt-labour-rules-supplir-sustainability.pdf">Supplier Sustainability Policy</a> | <a href="https://about.mappls.com/pdf/Health-Safety-Management.pdf">Health & Safety Policy</a> | <a href="https://about.mappls.com/pdf/Environment-Sustainability-Policy-CSR-Report.pdf">Environmental Policy & CSR Report</a>

<div align="center">Customer Care: +91-9999333223</div> 