# Firebase Course Notes

Course link:  https://www.udemy.com/course/reactjs-firebase-project/

Completed website:  https://realtor-v2.vercel.app/

## Install

### Build a new React application

From your usual project directory:

```console
npx create-react-app <application name>
```

## Remove unnecessary files

* From `public/`:  Remove all but index.html
* Inside of `index.html`: Remove all references to `favicon.ico`, `logo.png`, `manifest.json`.  Also consider changing the `title` tag and the `meta` `description` tag.
* From `src`: Remove all but `App.js`, `index.css`, and `index.js`. 
* `App.js`:  Replace with the following snippet

```javascript
function App() {
  return (
    <div>
      Hello World
    </div>
  );
}

export default App;

```

* `index.css`:  Delete all content
* `index.js`:  Delete references to `reportWebVitals`
* `package.json`:  Change the name of the project if needed, remove reference to `web-vitals` in the dependencies section.

Run the project to verify you get a Hello World message.

## Install Tailwindcss

See https://tailwindcss.com/docs/installation/framework-guides for other frameworks.

#### Install tailwind

From the console:

```console
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Configure tailwind

Update `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### Update `index.css`

Add this to `index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Restart the server and verify that tailwind styling is in place

Update `App.js` to look like this:

```javascript
function App() {
  return (
    <div className="text-4xl">
      Hello World
    </div>
  );
}

export default App;

```

Your hello world should now be quite large and sans-serif.

## Making a new favicon.ico file: 

See 

If you do this, you'll probably want to add the favicon link inside of `index.html`.

```html
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

## React Router

### Installation and basic usage

1. Install React Router

```console
npm install react-router-dom
```

2. Build routes

```jsx
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Home/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

```

Note:  Nav needs to be inside of the `<BrowserRouter>` tag, so that `<Link>` will work properly.

## Additional Tailwind Setup Notes

### Forms plugin

If you want to use Tailwind's base styling for your forms, this is the package to install. 

1. Install the package

`npm install -D @tailwindcss/forms`

2. Configure the plugin

Add the plugin to your `tailwind.config.js` file:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}
```

No further work need be done to get reasonable styles onto your form elements.  However, Tailwind is always there for the additional customization, so here's a good resource for all the other things that the forms plugin can do:

https://github.com/tailwindlabs/tailwindcss-forms

### Heroicons

Made by the creators of React, this is an excellent resource for tailwind friendly react friendly icons.

```
npm install @heroicons/react
```

Documentation:  https://github.com/tailwindlabs/heroicons

Main page and icon catalog:  https://heroicons.com/

### Styling the `<body>` tag (or other base styles)

In `index.css` you can add the following to change up how certain tags are styled across the board:

```css
//These lines should already be there for Tailwind to work
@tailwind base;
@tailwind components;
@tailwind utilities;

//This is how you add styling to the base elements
@layer base {
    body {
        @apply bg-green-50;
    }
}
```

While this works with any element, I heartily recommend that you only use this for the `body` tag, as that **should** be the only tag you can't access directly inside of React.  (Tailwind's preprocessor doesn't look at `index.html` and so won't catch if you put styles on the `body` tag there.)

## Setting up Firebase

### Setting up the project in Firebase

1. Set up a new project using the firebase console (new project, then add app/web)
2. Install the firebase library

```console
npm install firebase
```

3. Create `firebase.js` in the `src/` directory.
4. Copy and paste the firebase config given during app setup into `firebase.js`
5. Install libraries

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
//app specific details here, find in firebase console
};

// Initialize Firebase
initializeApp(firebaseConfig);

//Get handles for database and auth
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export {db, auth, storage}; //import these when you need to use them
```

#### Authentication

From the Firebase console...

1. Click Build -> Authentication
2. Click "Get Started"
3. Select the providers you want and enable them

#### Firestore Database

From the Firebase console...

1. Click Build->Firestore Database  **NOT** Realtime Database, that's old.
2. Click "Create Database"
3. Select "Start In Production Mode"  
4. Select appropriate region for your primary userbase
5. Click Rules and apply security as per the Security Rules section

#### Storage 

From the FIrebase Console...

1. Click Build->Storage
2. Click "Get Started"
3. Start in Production Mode
4. Click Rules and apply security rules as per the Security Rules section

### Security Rules

##### Firestore

```console
// Firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Listings
    match /listings/{listing} {
    	allow read;
      allow create: if request.auth != null && request.resource.data.imgUrls.size() < 7;
    	allow delete: if resource.data.userRef == request.auth.uid;
      allow update: if resource.data.userRef == request.auth.uid;
    }
   
    // Users
    match /users/{user} {
    	allow read;
    	allow create;
    	allow update: if request.auth.uid == user
    }
  }
}
```

##### Storage 

```console
// Storage rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if
      request.auth != null &&
      request.resource.size < 2 * 1024 * 1024 && //2MB
      request.resource.contentType.matches('image/.*')
    }
  }
}
```

## Implementing Firebase In Your Web App

### Auth

#### Sign Up with Email and Password

Inside of `firebase.js`:

```javascript
import {getAuth} from "firebase/auth";
//...
//Config and other imports and such
//...
// Initialize Firebase
 initializeApp(firebaseConfig); //Already there from above setup
 export const auth = getAuth();
```

Inside of the code which needs to perform the signup:

```javascript
import {auth, db} from "../firebase"; //path may vary depending on your directory structure
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";

//The actual signup code:
const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            updateProfile(auth.currentUser, {displayName: full_name}); //Optional
        } catch (error) {
            console.log(error); //Better ways to do this but good enough for now
        }
    }
```

### Sign Up with OAuth (Google etc)

Documentation:  https://firebase.google.com/docs/auth/web/google-signin

For this, you'll be letting Google take the wheel and deliver their standard "choose which account to use" pop up.  Right now, this sample code is in a separate file from the email/password version above, but refactoring to keep the firestore user profile collection consistent shouldn't be terribly hard.

This button will also be used for signing in, since the google auth provider doesn't care whether or not the user has a profile in our application server- it just verifies that they have a google account they can sign in to (or create) and builds an auth object based on that account.  Once the auth system has verified the user they're signed in.

```jsx
import Button from "./ui/Button";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile
} from "firebase/auth";
import {db} from "../firebase";
import {doc, serverTimestamp, setDoc, getDoc} from "firebase/firestore";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function OAuth() {
    const navigate = useNavigate();

    const signUp = async () => {
        try {
            //Set up our firebase interface
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            
            //Perform the sign up/sign in step
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
           //Build the user profile record (optional)
            const docRef = doc(db, "users", user.uid)
            const docSnap = await getDoc(docRef);
            
            if (!docSnap.exists()) { //We don't have a user profile for this person
                //Build the user profile data
                const dbProfileData = {
                    email: user.email,
                    displayName: auth.currentUser.displayName
                };
                dbProfileData.timestamp = serverTimestamp();
                await setDoc(docRef, dbProfileData);
                
                //Let them know the account was created successfully
                toast.success("Account created!");
            }
			//Whether or not we created a profile, they're signed in
            //Navigate back to the home page
            navigate("/");
        } catch (error) {
            //Report the error
            //TODO:  Maybe look up the error codes and/or put in a 
            //more generic message.
            toast.error(error.message);
        }
    }
    
    //The UI
    return (
        <div>
            <Button text={"Register with google"} color={"red"} text_color={"white"}
                    onClick={signUp}
            />
        </div>
    );
}

export default OAuth;
```

### Sign In

At this point, sign in is practically done for us.  For signing in with email/password, the process looks like this:

```jsx
// Call this via an onClick event (or whatever makes sense for your application)
const signIn = async () => {
        try {
            // Get a reference to the auth component
            const auth = getAuth();
            
            //Call the signin functionality
            const credentials = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            if (credentials.user) {
                //Signin was successful, do whatever navigation and 
                //notification makes sense here
                navigate("/");
                toast.success("User: " + credentials.user.email);
            }
        } catch (error){
            //Signin failed, notify the user
            toast.error(error.message)
        }
    }
```

For OAuth, the OAuth component above can already handle login, so you can reuse it for that.

### Sign Out

Signing out a logged in user is very simple.  Here is the code:

```javascript
import {getAuth, signOut} from "firebase/auth";

//inside your component
const auth = getAuth();
const signOutHandler = () => signOut(auth) //call this as appropriate
```

### Forgot Password

Firebase handles the password reset logic as well.  All you need to do is provide a way to obtain the user's email address and pass it along.  Here's an example:

```jsx
import {getAuth, sendPasswordResetEmail} from "firebase/auth"; //required
import {toast} from "react-toastify"; //optional - for notifications
import {useNavigate} from "react-router-dom"; //optional - for sending
                                              //the user back to the
                                              //sign in page

//This method is called by the onClick event of a button
const submit =async () => {
        try {
            //Grab an auth handle from firebase
            const auth = getAuth();
            
            //email is tracked in state to be passed along here
            await sendPasswordResetEmail(auth, email); 
            
            //react-toastify notifies the user that 
            //their request has been processed
            toast.success("Reset email sent");
            
            //react-router-dom sends them back to the sign in page
            navigate("/sign-in")
        } catch (error) {
            //Generic react-toastify error notification
            toast.error(error.message);
        }
    }
```

### General notes on user authentication

Documentation:  https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data

User object docs: https://firebase.google.com/docs/reference/js/firebase.User

If you want to use the logged in state / user information across your application, it's probably a good idea to compartmentalize all of the auth logic into a single React Context that can track the current logged in user as state and let your components access that Context so that they update when the auth state changes.  In order to subscribe to that state change, use `auth.onAuthStateChanged()` like this:

```javascript
import { getAuth, onAuthStateChanged } from "firebase/auth";

useEffect(() => {
	const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    }); 
}, []);

```

You must call `auth.onAuthStateChanged()` inside of a `useEffect` hook (or some other way to make sure it only gets called once), otherwise it'll subscribe every time the component is rendered and throw you into a loop of doom.

## Creating a Document/Record

Documentation: https://firebase.google.com/docs/firestore/manage-data/add-data

Earlier we looked at a signup process that involved a custom profile record inside of the app.  In that example, we first tried to look up the profile to see if it existed, and then stored it if it did not.  Here, we're going to break this down to the simplest form.

In order to create a document, we need simply

```javascript
import {getFirestore, doc, setDoc} from "firebase/firestore";
const db = getFirestore();
await setDoc(doc(db, "collectionName", key), {values: "in document"});
```

Note that this will also overwrite a document that already exists.  This might be what you want, but it's important to keep in mind that there might be a value to checking for document existence first.  If you want to do that:

```javascript
const docRef = doc(db, "collectionName", key);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
	//Record already exists, make your decisions here
}
```

Sometimes you don't have a key for the new document.  In this case, use the `addDoc` method:

```javascript
import { collection, addDoc } from "firebase/firestore"; 

const docRef = await addDoc(collection(db, "collectionName"), {
	contents: "Of the document"
});

console.log("Document written with ID: ", docRef.id);
```



## Updates

Documentation: https://firebase.google.com/docs/firestore/manage-data/add-data

There are a couple of ways to handle updating documents in Firebase.  The first simply follows the create logic under **Creating a Document**.  The second will merge new information in with existing.  This can be done in two steps.

1. Identify the document that needs to be updated
2. Send the new state of that document

```javascript
import {getFirestore} from "firebase/firestore";
const db = getFirestore();

//Identifty the document to update
const docRef = doc(db, "collectionName", key);

//Update it
setDoc(docRef, { newState: "For old value", newValue: "that didn't exist before" }, { merge: true }); //merge: true is the magic here
                             //It tells Firebase to merge the new data in
                             //with the old so that you don't have to
                             //specify the whole document
```

There are four ways to manipulate data in your collections:

1. **setDoc - merge: false**: Create if doesn't exist, overwrite if does
2. **setDoc - merge: true:** Create if doesn't exist, update if does
3. **create**:  Create if doesn't exist, fail if does
4. **update**: Fail if doesn't exist, update if does

Their syntaxes are all very similar, review the documentation (linked above) if needed.

## Queries - Single Document

### Retrieve Once

Documentation: https://firebase.google.com/docs/firestore/query-data/get-data

```javascript
import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "collectionName", key);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
```

This does a single retrieve.

### Subscribe To Changes

Documentation:  https://firebase.google.com/docs/firestore/query-data/listen

```javascript
import { doc, onSnapshot } from "firebase/firestore";

const unsub = onSnapshot(doc(db, "collectionName", key), (doc) => {
    console.log("Current data: ", doc.data());
});
```

This allows you to provide a callback function to react to changes to the given document.

## Query - Multiple Documents and Indexes

Up to now, we've been looking at single documents.  Firebase makes it easy to do key/value searches.  Let's look at queries that will return multiple documents.

### `where()`

Documentation: https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection

The process here is three steps:

1. Define the query
2. Call `getDocs` to perform the retrieval
3. Loop through the snapshot returned by `getDocs` and process each document

```javascript
import { collection, query, where, getDocs } from "firebase/firestore";

const q = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
```

### Retrieve all documents in a collection

Documentation: https://firebase.google.com/docs/firestore/query-data/get-data#get_all_documents_in_a_collection

The process here is similar to above, only without the query creation step.  We simply ask `getDocs` to retrieve the collection and process the resulting snapshot.

```javascript
import { collection, getDocs } from "firebase/firestore";

const querySnapshot = await getDocs(collection(db, "cities"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
```

### Query Operators

Documentation: https://firebase.google.com/docs/firestore/query-data/queries#query_operators

Here are the operators that can be used in a query:

- `<` less than
- `<=` less than or equal to
- `==` equal to
- `>` greater than
- `>=` greater than or equal to
- [`!=` not equal to](https://firebase.google.com/docs/firestore/query-data/queries#not_equal)
- [`array-contains`](https://firebase.google.com/docs/firestore/query-data/queries#array_membership)
- [`array-contains-any`](https://firebase.google.com/docs/firestore/query-data/queries#in_and_array-contains-any)
- [`in`](https://firebase.google.com/docs/firestore/query-data/queries#in_and_array-contains-any)
- [`not-in`](https://firebase.google.com/docs/firestore/query-data/queries#in_and_array-contains-any)

### Compound Queries

Documentation: https://firebase.google.com/docs/firestore/query-data/queries#compound_queries

You can chain where clauses in a query by separating them with a comma in the `query` call.  This implies that they are handled with a vararg in the library, but that's just conjecture.  Here are some examples:

```javascript
import { query, where } from "firebase/firestore";  

//Multiple == comparisons can be unlimited
const q1 = query(citiesRef, where("state", "==", "CO"), where("name", "==", "Denver"));

//Only one field can be tested with inequality operators (<=, >=, <, >, !=)
//This is valid
const q2 = query(citiesRef, where("state", "==", "CA"), where("population", "<", 1000000));

//This is not
const q = query(citiesRef, where("state", ">=", "CA"), where("population", ">", 100000));
```

Per the documentation, here are the rules:

> You can perform range (`<`, `<=`, `>`, `>=`) or not equals (`!=`) comparisons only on a single field, and you can include at most one `array-contains` or `array-contains-any` clause in a compound query.

When setting up a compound query, it will fail the first time out because compound queries need an index.  It is easiest to do, however, if you run the query and let it fail first because then Firebase will capture that attempt and give you a quick way to build the necessary index.  Here's how:

1. Go to the **Cloud Firestore** section of the [Firebase console](https://console.firebase.google.com/project/_/firestore/data).
2. Go to the **Indexes** tab and click **Add Index**.
3. Enter the collection name and set the fields you want to order the index by.
4. Click **Create**.

For more details, see the documentation on indexes:  https://firebase.google.com/docs/firestore/query-data/indexing#use_the_firebase_console

### `orderBy` and `limit`

To enforce an ordering on your results, use the `orderBy` function.

Example:

```javascript
import { query, orderBy, limit } from "firebase/firestore";  

const q = query(citiesRef, orderBy("name"), limit(3));
```

This will order cities by the "name" field and limit you to three results.  Ascending order is assumed by default.  To mark as descending, add "desc" to the `orderBy` call:

```javascript
import { query, orderBy, limit } from "firebase/firestore";  

const q = query(citiesRef, orderBy("name", "desc"), limit(3));
```

This will return the last three cities alphabetized by name.

Calls to `orderBy` can be chained:

```javascript
import { query, orderBy } from "firebase/firestore";  

const q = query(citiesRef, orderBy("state"), orderBy("population", "desc"));
```

And, of course, you can combine these with `where` statements:

```javascript
import { query, where, orderBy, limit } from "firebase/firestore";  

const q = query(citiesRef, where("population", ">", 100000), orderBy("population"), limit(2));
```

There are some limitations on how `orderBy` can be used.  

* When you query with `orderBy` you will only get documents that contain the requested field.  If your data schema has changed over time, you might not get all the documents you're expecting due to this.
* If you include a range comparison in your `where` statements (>, >=, <, <=), your first ordering **must** be on the same field.
* You cannot order your query by any field included in an equality (`=`) or `in` clause. (Why would you?)

For the full discussion, see the documentation: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations

###  Server Side Document Count

Documentation: https://firebase.google.com/docs/firestore/query-data/aggregation-queries

```javascript
import { query, where, orderBy, limit, getCountFromServer } from "firebase/firestore";  
const coll = collection(db, "cities");
const snapshot = await getCountFromServer(coll);
console.log('count: ', snapshot.data().count);
```

This will give you a count of documents without actually downloading them.

### Pagination Queries

Documentation: https://firebase.google.com/docs/firestore/query-data/query-cursors

WIP

### Deleting Data

Documentation: https://firebase.google.com/docs/firestore/manage-data/delete-data

WIP

### Transactions

Documentation: https://firebase.google.com/docs/firestore/manage-data/transactions

WIP

## Cloud Storage

Documentation: https://firebase.google.com/docs/storage/web/start

WIP

## Appendices

### `react-toastify`

Documentation: https://fkhadra.github.io/react-toastify/introduction/

1. Install

```console
npm install react-toastify
```

2. Configure: https://fkhadra.github.io/react-toastify/introduction/#the-playground

3. Import the css into `index.js`

   ```jsx
   import 'react-toastify/dist/ReactToastify.min.css';
   ```

4. Add to the page(s) that need to display toasts (at the bottom of the `App.js` component is a good call if you're using `react-router` and want toasts potentially everywhere.)

   ```jsx
   import {ToastContainer} from "react-toastify";
   	<ToastContainer //copied and pasted from the configure page
               position="bottom-center"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="dark"
           />
   ```

5. Make toasts

```jsx
toast.success("Account created!"); //Green check
toast.error(error.message);        //Red !
```

## 

### `react-router-dom` v6 updates

Setting up the routes:

**`App.java`**

```jsx
import {BrowserRouter, Routes, Route} from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Home/>}/>
              <Route path={"/profile"} element={<Profile/>}/>
              <Route path={"/sign-in"} element={<SignIn/>}/>
              <Route path={"/sign-up"} element={<SignUp/>}/>
              <Route path={"/forgot-password"} element={<ForgotPassword/>}/>
              <Route path={"/offers"} element={<Offers/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}
```

Programmatic navigation (the `useNavigate` hook) and current location detection (the `useLocation` hook):

```jsx
import {useLocation, useNavigate} from "react-router-dom";

const location = useLocation();
    const navigate = useNavigate();
	
	//If you want to change up styling based on current location
	//Called from the roll your own links below
    const routeStyling = (route) => {
        return route === location.pathname ? "text-black border-b-red-500" : "";
    }
    
    // setting up the page
    // ...
    <ul className={"flex flex-row space-x-10"}>
        <li className={`${routeStyling("/")}` }
            onClick={() => navigate("/")}>Home</li>
        <li className={`${routeStyling("/offers")}`}
            onClick={() => navigate("/offers")}>Offers</li>
        <li className={`${routeStyling("/sign-in")}`}
            onClick={() => navigate("/sign-in")}>Sign In</li>
	</ul>
    
```

`react-router-dom` `Link` elements still work:

```jsx
import {Link} from "react-router-dom";
// ...
<Link to={"/forgot-password"}}>Forgot password?</Link>
```

Presumably `NavLink` works too.

### Private routes

Sometimes you need pages that can only be seen by signed in users.  **Note that this technique only works to redirect users, but anyone with web development skills can still see these pages with a little bit of work.** Only use this for UX reasons, not security reasons.  Secure your data on the server, not by hiding it with private routes!

There is a simple technique for handling private routes using some basic components of the `react-router-dom` package.  Here's the code:

`PrivateRoute.js`

```jsx
import {Outlet, Navigate} from "react-router-dom";

function PrivateRoute() {
    const loggedin = false; //This needs to actually know what the sign in state is (or whatever condition you're checking for)

    return loggedin ? <Outlet/>  //If logged in, <Outlet/> is set to 
                                 //whatever is enclosed by the
    				             //<PrivateRoute> tag
    							 //This is roughly equivalent to {children}
                    : <Navigate to={"/sign-in"}/>
                                //If not logged in, <Navigate> will redirect
                                //to the given route.
}

export default PrivateRoute;
```

One way you can accomplish the sign in test is with a custom hook, like so:

`useAuthStatus.js`

```jsx
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";

function useAuthStatus() {
    //Keep the current log in status / waiting for info status in state
    const [loggedIn, setLoggedIn] = useState(false);
    const [waiting, setWaiting] = useState(true);

    //Set up the onAuthStateChanged listener to update the logged in state
    //whenever Firebase reports that it has changed
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false);
            }
            //If this fires once, then we're connected to Firebase
            //and no longer need to report that we are waiting
            setWaiting(false);
        })
    }, []);

    //These are the variables that will be exposed by the hook
    return {loggedIn, waiting};
}

export {useAuthStatus};
```

Meanwhile, back in our `PrivateRoute` component...

`PrivateRoute.js`

```jsx
import {Outlet, Navigate} from "react-router-dom";
import {useAuthStatus} from "../hooks/useAuthStatus";

function PrivateRoute() {
    const {loggedIn, waiting} = useAuthStatus(); //Calling the hook

    if (waiting) {
        <h3>Loading...</h3> //Do better here, this is ugly
    } else {
        //The navigate to might need to be changed for your application
        return loggedIn ? <Outlet/> : <Navigate to={"/sign-in"}/>
    }
}

export default PrivateRoute;
```

Finally, let's look at how `PrivateRoute` is used to protect a `Route`:

`App.js`

```jsx
//skipping all the other imports
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
          <Header/>
          <Content>
              <Routes>
                  <!-- skipping the routes we don't care about -->
                  <!-- The PrivateRoute has Profile as a sub route -->
                  <!-- this is how the Outlet tag gets its target -->
                  <Route path={"/profile"} element={<PrivateRoute/>}>
                    <Route path={"/profile"} element={<Profile/>}/>
                  </Route>
                  <!-- skipping the routes we don't care about -->
              </Routes>
          </Content>
      </BrowserRouter>
      <!-- Skipping the toast section -->
    </div>
  );
}

export default App;

```



## Resources

Free images site:  https://unsplash.com/
