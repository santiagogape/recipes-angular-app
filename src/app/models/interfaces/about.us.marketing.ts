import {Header} from './header';
import {ImageSrc} from './ImageSrc';

export interface AboutUsMarketing {
  header: Header
  description: string
  features: AboutUsMarketingFeatures[]
}

export interface AboutUsMarketingFeatures {
  header: Header
  image: ImageSrc
}
