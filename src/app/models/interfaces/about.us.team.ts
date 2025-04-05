import {Header} from './header';
import {ImageSrc} from './ImageSrc';

interface AboutUsTeamMember {
  name: string;
  job: string;
  description: string;
  icons: string[];
  image: ImageSrc;
}

export interface AboutUsTeam {
  header: Header;
  description: string;
  members: AboutUsTeamMember[]
}
