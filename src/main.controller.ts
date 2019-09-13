import { Application } from 'express';
import { TwitterService } from './services/twitter.service';
import { HashTagsService } from './services/hashtags.service';

export class Controller {
  private twitterService: TwitterService;
  private hashTagsService: HashTagsService;
  constructor(private app: Application) {
    this.twitterService = new TwitterService();
    this.hashTagsService = new HashTagsService();
    this.routes();
  }

  public routes() {
    this.app.route('/').get(this.twitterService.welcomeMessage);

    this.app.route('/users/profile').post(this.twitterService.postProfile);

    this.app.route('/search/hashtags').post(this.hashTagsService.findHashTag);
  }
}
