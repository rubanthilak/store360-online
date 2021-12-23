const admin = require('firebase-admin')
admin.initializeApp();

async function decodeIDToken(req, res, next) {
    // console.log(req);
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }
  next();
}

exports.AUTH = decodeIDToken;