import { Place } from './place';
import { User } from './user';

export class Event {
  uuid: string;
  name: string;
  event_date: string;
  description: string;
  place: Place;
  participants: User[];
}
