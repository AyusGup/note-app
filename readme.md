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
  "email": "test@example.com",
  "password": "Test123",
  "phoneNumber": "+919850094480"
}
```
### Response
![image](https://github.com/user-attachments/assets/df1151a1-bbb3-40bc-8ea1-43bca440e831)

## /userUpdate

### Method: `PUT`

### Request Body:
```json
{
    "name": "Ayush Gupta",
    "userId": "4mOSwDK0Nthdr4xlTGPfGgdprA83",
    "email": "test@example.com"
}
```
### Response
![image](https://github.com/user-attachments/assets/1115c525-426f-428d-b9ff-fd69a4af3851)

## /userDelete

### Method: `Delete`

### Request Body:
```json
{
  "userId": "EaMa1D4qJOMRVicDwtuylIqmGeq1"
}
```
### Response
![image](https://github.com/user-attachments/assets/5e9736f8-81a1-451d-9a39-24ccfc93f6d2)

## /userInfo

### Method: `GET`

### Headers:
```
Authorization: Bearer ID token
```
### Response
![image](https://github.com/user-attachments/assets/46a1b2e8-acce-4b6d-a186-ad5af6604c0d)


## /getNotes

### Method: `GET`

### Headers:
```
Authorization: Bearer ID token
```
### Response
![image](https://github.com/user-attachments/assets/fcd95b14-44db-47da-9bcc-a5a6d52668a2)

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

### Response
![image](https://github.com/user-attachments/assets/9be6c6c8-2354-49af-ab5b-12324e05a3f5)




