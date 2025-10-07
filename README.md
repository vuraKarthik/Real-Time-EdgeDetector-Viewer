# Real-Time Edge Detection Viewer

This project is an Android application that demonstrates real-time image processing. It captures frames from the device's camera, applies a Canny edge detection filter using native C++ code with OpenCV, and displays the result. It also includes a minimal web-based viewer to display a static processed frame.

## 🎥 Demo

<img src="https://github.com/vuraKarthik/Real-Time-EdgeDetector-Viewer/blob/main/Images/demo.gif?raw=true" alt="Edge Detection in Action" width="400" />

## Features Implemented

### Android Application
- **Real-Time Camera Feed**: Utilizes `CameraX` with a `PreviewView` to display a live feed from the camera.
- **Native Image Processing**: Camera frames are passed via the Java Native Interface (JNI) to a C++ layer.
- **OpenCV Integration**: Canny edge detection is performed on each frame using the OpenCV library in C++.
- **View Toggling**: A button allows the user to switch between the raw camera feed and the processed edge-detected output.
- **Performance Monitoring**: An on-screen overlay displays the current Frames Per Second (FPS) and the processing time for each frame in milliseconds.
  
<table>
  <tr>
    <td>
      <img src="https://github.com/vuraKarthik/Real-Time-EdgeDetector-Viewer/blob/main/Images/Raw_camera.png?raw=true" alt="Android App Raw Camera Feed" width="400" /><br/>
      <em>Raw camera feed from the Android app</em>
    </td>
    <td>
      <img src="https://github.com/vuraKarthik/Real-Time-EdgeDetector-Viewer/blob/main/Images/EdgeDetected_image.png?raw=true" alt="Android App Edge Detected Output" width="400" /><br/>
      <em>Edge detected output from the Android app</em>
    </td>
  </tr>
</table>


### Web Viewer
- **Static Frame Display**: A simple web page built with HTML and TypeScript that displays a sample processed frame.
- **Frame Statistics**: Shows basic information about the displayed frame, such as its resolution.
- **DOM Manipulation**: Demonstrates a basic TypeScript setup for updating DOM elements.

## Architecture

The project is split into two main components: the Android app and the web viewer.

### Android Frame Flow
1.  **CameraX**: The `ImageAnalysis` use case provides access to camera frames on a background thread.
2.  **Bitmap Conversion**: The `ImageProxy` from CameraX is converted to a `Bitmap` object.
3.  **JNI Bridge**: The `Bitmap` is passed to the native C++ layer through a JNI function call (`processImage`).
4.  **OpenCV Processing**: In C++, the `Bitmap` is converted into an `cv::Mat` object. OpenCV's `cvtColor` and `Canny` functions are used to perform the edge detection.
5.  **Return to Java**: The processed `cv::Mat` is converted back to a `Bitmap` and returned to the Java/Kotlin layer.
6.  **UI Update**: The final `Bitmap` is displayed in an `ImageView` that overlays the camera preview.

### Web Architecture
- The `web` directory contains a standalone static web page.
- `index.html` sets up the basic page structure, including a `<canvas>` for the image and a `<div>` for stats.
- `src/main.ts` contains the TypeScript code. It loads a Base64-encoded image string, draws it onto the canvas, and updates the stats text. It must be compiled into JavaScript using `tsc`.

## Setup and Build Instructions

### Prerequisites
- Android Studio (latest version recommended)
- Android NDK (installed via the SDK Manager in Android Studio)
- TypeScript (`npm install -g typescript`)

### 1. Android Application

1.  **Clone the Repository**:
    ```bash
    git clone <your-repo-url>
    ```
2.  **Add OpenCV SDK**:
    - Download the [OpenCV Android SDK](https://opencv.org/releases/).
    - Unzip the package and copy the `sdk` directory into the `app/` directory of the project.
    - The final path should be `EdgeViewer/app/sdk`.

3.  **Open in Android Studio**:
    - Open the `EdgeViewer` project in Android Studio.
    - Let Gradle sync the project. The build scripts are already configured to find the local OpenCV SDK.

4.  **Build and Run**:
    - Build and run the app on an Android device or emulator.
    - Grant camera permissions when prompted.

### 2. Web Viewer

1.  **Navigate to the Web Directory**:
    ```bash
    cd EdgeViewer/web
    ```

2.  **Compile TypeScript**:
    ```bash
    tsc
    ```
    This command reads `tsconfig.json` and compiles `src/main.ts` into `dist/main.js`.

3.  **View in Browser**:
    - Open the `web/index.html` file in any web browser.

4.  **(Optional) Update the Static Image**:
    - Run the Android app and check Logcat in Android Studio. Filter by the tag `Base64`.
    - Copy the entire Base64 string from a log message.
    - Paste the string into the `image.src` variable in `web/src/main.ts`.
    - Re-run `tsc` and refresh the browser to see the new image.
