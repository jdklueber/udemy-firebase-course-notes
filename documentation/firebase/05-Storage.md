# Firebase Storage 

## Setup

From the FIrebase Console...

1. Click Build->Storage
2. Click "Get Started"
3. Start in Production Mode
4. Click Rules and apply security rules as per the Security Rules section

## Security Rules

This is a reasonable default for storage security rules

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

## Implementing Firebase Storage in your web app

Documentation: https://firebase.google.com/docs/storage/web/start

WIP
