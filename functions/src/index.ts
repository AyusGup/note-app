const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const serviceAccount = require('./serviceAccountKey.json');
const {registerUser, verifyUser, authenticateUser} = require('./auth');
const {getNotes, saveNote, updateUserInfo, deleteUser, getUserInfo} = require('./user');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON request bodies


app.post('/register', registerUser);
app.get('/secure', authenticateUser, verifyUser);
app.get('/userInfo', getUserInfo);
app.put('/userUpdate', updateUserInfo);
app.delete('/userDelete', deleteUser);
app.get('/getNotes', authenticateUser, getNotes);
app.post('/saveNote', authenticateUser, saveNote);


// Export the Express app as a Firebase Function
exports.app = functions.https.onRequest(app);
