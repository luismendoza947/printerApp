Troubleshooting:

## Android

- If this error appears when building on android studio: `more recent version of the Java Runtime (class file version 55.0), this version of the Java Runtime only recognizes class file versions up to 52.0`, follow this steps:
1. Go to Files > Project Structure.
2. Once a window opens, go to SDK Location
3. Select Gradle Settings option.
4. The Gradle settings will open, now locate Gradle SDK selector and finally choose `Android Studio default SDK Version`
5. Now reload all resources from File > Sync Project with Gradle Files.