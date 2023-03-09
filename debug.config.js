import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectFunctionsEmulator } from 'firebase/functions';

import { db, functions, auth } from '@services/app';

if (process.env.NODE_ENV === 'development') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8280);
    connectFunctionsEmulator(functions, 'localhost', 5201);
    connectAuthEmulator(auth, 'http://localhost:9399');
  } catch (e) {
    // no logic
  }
}
