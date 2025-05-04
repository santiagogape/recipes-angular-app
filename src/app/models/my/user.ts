import {ID} from '@services/firebase/databaseAPI';
import {NoJob, NoUserImage} from '@services/error.codes';

export interface User extends ID {
  name: string;
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
  }
}

export function defaultUser(uid:string, name: string, email: string): User {
  return {
    id: uid,
    email: email,
    name: name,
    job: NoJob,
    picture: NoUserImage,
  }
}
