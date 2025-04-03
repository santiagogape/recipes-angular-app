import {Marketing} from '../../models/interfaces/index-marketing';

export interface indexMarketingService {
   getMarketingSections(src: string): Promise<Marketing[]>
}
