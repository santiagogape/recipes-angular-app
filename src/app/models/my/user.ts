import {ID} from '@services/firebase/firestore.service';

export interface User extends ID {
  name: string;
  username: string;
  email: string;
  picture: string;
}
// friends: User[]
