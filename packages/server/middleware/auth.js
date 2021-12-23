const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "prototype2-daec0",
    clientEmail:
      "firebase-adminsdk-uuebp@prototype2-daec0.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+Z6GrnTZRTX3M\n9HUrigEBJo3L3xHwwUNvtuokjQUYL+FbH8g2D5lm5lWPHSaLVWCYIOq1MpUQ3noL\n0x3swmjqrEfFBT9475ijWESD1ssQ4Yr6YKb/HtaO68PsamligA8AG58eQz3e3ZKa\nZ76FWNBnEmn9ZH17tdGxpLJYHC81OEwg6eAQvp8p4lZYFS2ry+6plSBZyfmQNGo2\n/M24Bj44uf/m0ZusenRWj3DT7XtLCwiE8cKvx3Ghd7YksgToYJipFGmMlOcrqAzK\ncDUvNB7hF5OBKkInkmSfpShMAVBuNUzYeDKW882aa7gGo2A6f3aWIZNfvvV+x2sE\nM+2r3kErAgMBAAECggEAGMZEg59EbrZrL1HXimoTJg0tggttECsgFSxzBtJ6iTfM\nVh5VNK45mD6m1KTxsPYo8rfFvPyZ529V6K1NmtLTnUVRXqdc0jrgB3uis+zXe0N9\ni9qA9Xe+adZE0JbVTjBkw0TUzWE+bv3cPM78O+mJzv+BtFYbpbnLURahm1P/fdMI\nolOr01vsWaHJI+97wvbxDoTYtx9tn8AoHzBsI/pMIC/20we3tPnuwZov2FHlcvQZ\nhD6i5c6yhn1SreAHUqScFVag6WWBDzn40GoGCgfMIWJSonO/N8hP8mr8zo4PRiLY\niLNOc4s0aPjjlCyDtUIAPElzNHqPKTaPYSAWTnumEQKBgQDhqRW3gYb+urTzPaym\nnRzN0BMupBqoBvxM8wI7m0W99G3LmmmbIrDKHFBdk6grJf/lC4fxs0bqmmzHON2j\nxwqE0z+1/jPu+LJTjzc2LJ6FQMQ/d+DndpzR47Bp/GnCOr7NyTKGj4l/AZ+c6ysq\nwb8qg0eFYXK4NjSBFpH01wELJwKBgQDYARiaG75ewu6erGRp7GYdyJ5d/JxDQCeG\nx4PTzna532yOgxakjYBNJ/H6Qh6sPnR1YawMdHBEGtdXifCF9LoWBLPUrb+VFmOK\nIGsthWvYjhld8KNEcyFAg7Vcsizitu6FRxOAjYo1+Wf/vHXALRERtDb0iZ9y3jUc\nLErypmmsXQKBgQCpg8nzitKs4fZyTt82Xgm4NdljDRWVKYI4D8ianD6cvlQIQZuZ\nVUr22KQqV3RZzXbYSXw6vdDFBXI3iek9UZT+SG6wuR+sIZhcGtZ/1K7ULN3/S39g\ngQK2zNLGGz4bEOQqVDynRoYkKUUMrMBFozuGpQ2CDb0O0nFIk3rbMPPwuwKBgCoy\nlJ7OmrMie8FNxlQXFZ/t6FpOFizhJJek9HD1XaZUKn3wyASfjBgGnLQaJKnbjZ68\n1QKd4Ky9XaJBVVamB5BznLoIs2upswpx6N48uWPV5si+UPb3UuCqmkygljo4KIKq\n7vlnLT/8GEASjiJb64C85xuAo0Cqfk+hq4aZ0f0VAoGAOUETmdbZxjcraZx/9wVW\nwUv6s7xv/NkYfFNFRM0L7+X70gAtdAfyEwhkyIee1E3pUyYZs/gxtFRYQ6f+LGJn\nUHLpveX7ra17Xv/YRuV2vh8bsBDsrOA3+9uedICbFgWrofmmMh2kVi0wHCRv3aQm\n1Dvl9dg7cNTh50xWpr4bwfs=\n-----END PRIVATE KEY-----\n",
  }),
});

async function decodeIDToken(req, res, next) {
  // console.log(req);
  if (req.headers?.authorization?.startsWith("Bearer ")) {
    const idToken = req.headers.authorization.split("Bearer ")[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req["currentUser"] = decodedToken.email;
      next();
    } catch (err) {
      res.status(401).json({message:"Not auth"})
      req["currentUser"] = false;
      console.log(err);
    }
  }
}

exports.AUTH = decodeIDToken;
