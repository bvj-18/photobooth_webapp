# Interview Prep

## 30-Second Explanation

Vintage Photobooth is a full-stack React and Node project that simulates a retro film photobooth. Users open a landing page, go to a camera screen, capture multiple photos with filters and a timer, and export a finished film strip as a PNG. The frontend uses React, Vite, TypeScript, and Capacitor, while the backend uses Express, MongoDB, bcrypt, and JWT authentication.

## 2-Minute Explanation

This project is a cross-platform photobooth built as a React single-page app with a Node/Express authentication backend. The frontend starts on a cinematic landing page and then moves into a camera experience where the browser webcam is streamed into a live preview. Users can choose filters, set a countdown, capture one to four photos, and generate a vintage film strip with dust, flicker, and sprocket-hole styling.

When the user signs up or logs in, the frontend talks to the Express backend. The backend validates the form, hashes the password with bcrypt, stores the user in MongoDB, and returns a signed JWT. The frontend stores the session in localStorage and restores it on refresh. For Android, Capacitor wraps the web build in a native shell so the app can save files to device storage.

The project is a good example of frontend state management, DOM-to-image export, REST authentication, and native packaging of a web app.

## Likely Interview Questions And Good Answers

### 1. What problem does this app solve?

It recreates a classic photobooth experience in the browser. The user can capture a set of photos, style them as a film strip, and download the result. The same code also runs as an Android app through Capacitor.

### 2. Why did you use React and Vite?

React works well for a component-based UI with multiple screens and shared state. Vite gives a fast dev server and simple production builds, which is useful for a project with lots of styling and iterative UI work.

### 3. Why did you use HashRouter instead of BrowserRouter?

Because the app needs to run from a local Capacitor WebView as well as the browser. HashRouter avoids server rewrite requirements and works reliably with file-based native loading.

### 4. How does the camera capture work?

The app requests webcam access with `getUserMedia`, shows the stream inside a video element, and draws frames into a hidden canvas when the user captures a photo. The canvas output is converted into a PNG data URL and stored in React state.

### 5. How do you create the final image?

After the photos are arranged in the DOM with the vintage frame and custom note, `html2canvas` renders that DOM node into a canvas. The canvas becomes a Blob that can be downloaded, copied, or saved on Android.

### 6. How does authentication work?

The frontend sends signup or login data to the backend. The backend hashes passwords, stores users in MongoDB, and returns a JWT plus user profile. The frontend stores that session and uses it to restore login state.

### 7. What are the main tradeoffs in your security design?

It is simple and good for a learning project, but it uses localStorage for tokens and open CORS. For production, I would move to safer token storage, restrict origins, and add JWT verification for protected routes.

### 8. Why did you add Capacitor?

Capacitor lets one codebase target the web and Android. It was the fastest way to package the existing React app as a mobile app without rewriting the UI natively.

### 9. What was the hardest part?

The camera and export flow. The app has to manage webcam access, timing, filter rendering, layout, and final image export without breaking the experience on mobile or native WebView.

### 10. How would you improve it next?

I would add protected routes, safer auth storage, runtime permission handling, a share button, better backend validation, and a user gallery backed by cloud storage.

## Concepts To Understand Before Discussing The Project Professionally

- React component design.
- Controlled form inputs.
- React Context for shared state.
- Browser camera APIs and canvas rendering.
- JWT authentication basics.
- Password hashing with bcrypt.
- REST API design.
- MongoDB and Mongoose schema design.
- Capacitor WebView packaging.
- Mobile permission and storage constraints.
- Frontend security basics such as token storage and CORS.
