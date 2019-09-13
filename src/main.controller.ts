import { Application } from 'express';
import { TwitterService } from './services/twitter.service';

export class Controller {
  private twitterService: TwitterService;

  constructor(private app: Application) {
    this.twitterService = new TwitterService();
    this.routes();
  }

  public routes() {
    this.app.route('/').get(this.twitterService.welcomeMessage);

    this.app.route('/users/profile').post(this.twitterService.postProfile);
  }
}
