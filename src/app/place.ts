import {Event} from './event';

export class Place {
  uuid: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  events: Event[];
}
