const admin = require('firebase-admin');

interface AuthRequestBody {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;  
}

// Middleware to verify Firebase ID token
async function authenticateUser(req: any, res: any, next: any) {
    const idToken = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
  
    if (!idToken) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }
  
    try {
      // Verify the ID token using Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken; 
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(403).json({ error: 'Invalid token' });
    }
}

// User Registration API
async function registerUser(req: any, res: any){
    const { name, email, password, phoneNumber }: AuthRequestBody = req.body;
  
    try {
      // Creating the user with email and password (handled by Firebase Admin SDK)
      const userRecord = await admin.auth().createUser({
        email,
        password,    
      });

      const userRef = admin.firestore().collection('users').doc(userRecord.uid);

      await userRef.set({
        name,
        email,
        phoneNumber,
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(), 
      });
  
      res.status(201).json({
        message: 'User created successfully',
        userId: userRecord.uid,
      });
    } catch (error: any) {
      console.error('Error creating user:', error);
      res.status(400).json({ error: error.message });
    }
}

// Secure route to demonstrate token verification 
async function verifyUser(req:any, res:any){
    const userId = req.user.uid; 
    res.status(200).json({ message: 'Access granted', userId });
}

export = {registerUser, authenticateUser, verifyUser};