import {Header} from '../general/header';
import {ImageSrc} from '../general/ImageSrc';
import {ID} from '@services/firebase/databaseAPI';

interface AboutUsTeamMember {
  name: string;
  job: string;
  description: string;
  icons: string[];
  image: ImageSrc;
}

export interface AboutUsTeam extends ID{
  header: Header;
  description: string;
  members: AboutUsTeamMember[]
}
