import { removeString } from '../utils/remove-string';

/**
 * @description Interface for Profile, specific data type.
 */
interface IProfile {
  id_str: string;
  name: string;
  screen_name: string;
  profile_image_url: string;
  status: {
    text: string;
  };
  followers_count: number;
  friends_count: number;
}

/**
 * @description Class for Profile
 */
export default class Profile {
  id: string = '';
  name: string = '';
  screen_name: string = '';
  profile_image_url: string = '';
  last_status: string;
  followers: number = 0;
  friends: number = 0;

  constructor(params: IProfile) {
    this.id = params.id_str;
    this.name = params.name;
    this.screen_name = params.screen_name;
    this.profile_image_url = removeString(params.profile_image_url);
    this.last_status = params.status.text;
    this.followers = params.followers_count;
    this.friends = params.friends_count;
  }
}
