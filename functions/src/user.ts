const admin = require('firebase-admin');

async function getUserInfo(req: any, res: any) {
  const token = req.headers.authorization?.split(' ')[1];  // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  try {
    // Verify the custom token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Retrieve the user info from Firestore
    const userRef = admin.firestore().collection('users').doc(decodedToken.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User information retrieved successfully',
      userData: userDoc.data(),  // Return user data from Firestore
    });
  } catch (error: any) {
    console.error('Error retrieving user info:', error);
    res.status(403).json({ error: 'Invalid token' });
  }
}

// User Edit API: Update user information in Firestore
async function updateUserInfo(req: any, res: any) {
  const { userId, name, email, phoneNumber }: { userId: string; name?: string; email?: string; phoneNumber?: string } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Check if the user exists in Firebase Authentication
    const userRecord = await admin.auth().getUser(userId);

    // Log the userRecord to inspect the user details
    console.log("User Record from Firebase:", userRecord);

    // Prepare update data for Firebase Authentication
    const updateAuthData: any = {};

    if (email) updateAuthData.email = email;

    // Update Firebase Authentication user details if necessary
    if (Object.keys(updateAuthData).length > 0) {
      await admin.auth().updateUser(userId, updateAuthData);
      console.log('User updated in Firebase Authentication');
    }

    // Update Firestore document with new user data
    const userRef = admin.firestore().collection('users').doc(userId);

    const updateData: any = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;

    // Update Firestore with new data
    await userRef.update(updateData);

    res.status(200).json({ message: 'User information updated successfully' });
  } catch (error: any) {
    console.error('Error updating user information:', error);
    res.status(400).json({ error: error.message });
  }
}

// User Delete API: Delete user from Firebase Authentication and Firestore
async function deleteUser(req: any, res: any) {
  const { userId }: { userId: string } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Delete user from Firebase Authentication
    await admin.auth().deleteUser(userId);

    // Delete user document from Firestore
    const userDocRef = admin.firestore().collection('users').doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found in Firestore' });
    }

    await userDocRef.delete();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting user:', error);
    res.status(400).json({ error: error.message });
  }
}

// SaveNotesAPI: Allow users to save personal notes
async function saveNote(req: any, res: any) {
  const { title, content }: { title: string; content: string } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const userId = req.user.uid;

    // Create a new note document in Firestore under 'notes' collection
    const newNote = {
      title,
      content,
      timestamp: new Date().toISOString(),
      userId,  // Store the userId to associate the note with the user
    };

    // Save the note in Firestore
    await admin.firestore().collection('notes').add(newNote);

    res.status(201).json({ message: 'Note saved successfully' });
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ error: 'Failed to save note' });
  }
}

// GetNotesAPI: Retrieve all notes for the authenticated user
async function getNotes(req: any, res: any) {
  const userId = req.user.uid;

  try {
    // Retrieve notes for the authenticated user from Firestore
    const notesSnapshot = await admin.firestore().collection('notes')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')  // Optional: Order notes by timestamp
      .get();

    if (notesSnapshot.empty) {
      return res.status(404).json({ message: 'No notes found' });
    }

    // Map Firestore documents to an array of notes
    const notes = notesSnapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });

    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to retrieve notes' });
  }
}

export = {getNotes, saveNote, updateUserInfo, deleteUser, getUserInfo};