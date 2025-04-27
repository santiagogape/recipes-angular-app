import {ID} from '@services/firebase/databaseAPI';

export interface User extends ID {
  name: string;
  username: string;
  email: string;
  picture: string;
  job: string
}
// friends: User[]

export function UserInitializer(): User {
  return new class implements User {
    email=  "";
    id=  "";
    job=  "";
    name=  "";
    picture=  "";
    username=  "";
  }
}
