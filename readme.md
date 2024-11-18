# Firestore Notes App

A scalable and secure application using Firebase Authentication and Firestore to manage user registration and notes.

## Overview

This application allows users to register with their email and password (managed by Firebase Authentication) and store additional details in Firestore. Users can create, fetch, update, and delete their notes stored in Firestore, linked via the `userId` obtained from Firebase Authentication.

## Features

- **User Management**:
  - Registration and authentication via Firebase Authentication.
  - Additional user details stored in Firestore.

- **Notes Management**:
  - Notes linked to individual users using `userId`.
  - Supports creating, retrieving, updating, and deleting notes.

- **Security**:
  - User authentication ensures only authorized users access their data.
  - Firestore security rules to enforce data access policies.

## Tech Stack

- **Backend**: Firebase Authentication, Firestore
- **Frontend**: React (if applicable)
- **Database**: Firestore (NoSQL)

## Database Structure

### Users Collection

This collection stores user-specific data and uses the Firebase Authentication UID as the document ID.

**Collection Name**: `users`

| Field       | Type   | Description                          |
|-------------|--------|--------------------------------------|
| `name`      | String | User's full name                    |
| `email`     | String | User's email address                |
| `phoneNumber` | String | User's phone number                |
| `createdAt` | String | Timestamp when the user was created |
| `updatedAt` | String | Timestamp when the data was updated |

**Example Document**:
```json
{
  "name": "Ayush Ji",
  "email": "testuser11@example.com",
  "phoneNumber": "+919810094880",
  "createdAt": "2024-11-18T18:22:12.018Z",
  "updatedAt": "2024-11-18T18:22:12.018Z"
}
```

**Collection Name**: `notes`

| Field       | Type   | Description                          |
|-------------|--------|--------------------------------------|
| `userId`      | String | UID of the user who created the note |                   |
| `title`     | String | Title of the note               |
| `content` | String | Content of the note                |
| `timestamp` | String | Timestamp when the note was created |

**Example Document**:
```json
{
  "userId": "uT0iVcLez0fe3P4zUC3SghLwZPl1",
  "title": "Note Title2",
  "content": "This is the content of the note2",
  "timestamp": "2024-11-18T11:01:04.239Z"
}
```

## Relationships
### User and Notes:
- Each note document is associated with a user via the userId field.
-  The userId is obtained from Firebase Authentication's UID.

## Required Index:
### Collection: notes
### Fields:
- userId (Ascending)
- timestamp (Descending)

# API Documentation

## /register

### Method: `POST`

### Request Body:
```json
{
  "name": "Ayush",
  "email": "testuser@example.com",
  "password": "Test123",
  "phoneNumber": "+919850094480"
}
```
## /userUpdate

### Method: `POST`

### Request Body:
```json
{
  "name": "Ayush",
  "email": "testuser@example.com",
  "password": "Test123",
  "phoneNumber": "+919850094480"
}
```
## /userDelete

### Method: `POST`

### Request Body:
```json
{
  "userId": "EaMa1D4qJOMRVicDwtuylIqmGeq1"
}
```
## /userInfo

### Method: `GET`

### Headers:
```
Authorization: Bearer ID token
```

## /getNotes

### Method: `GET`

### Headers:
```
Authorization: Bearer ID token
```

## /saveNote

### Method: `POST`

### Headers:
```
Authorization: Bearer ID token
```
### Body: 
```json
{
  "title": "notes",
  "content": "this is note"
}
```



