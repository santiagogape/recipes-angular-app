import {ID} from '@services/firebase/databaseAPI';

export interface User extends ID {
  name: string;
  username: string;
  email: string;
  picture: string;
}
// friends: User[]
