import { Request, Response } from 'express';
import { WELCOME_MESSAGE } from '../constants/usfa.constants';
import Profile from '../models/profile';
import { ClientTwitter } from '../config/ClientTwitter';

export class TwitterService {
  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send(WELCOME_MESSAGE);
  }

  public async postProfile(req: Request, res: Response) {
    const { users } = req.body;
    if (typeof users === 'object') {
      const usersRequest: any = [];

      users.forEach((user: string) => {
        const params = { screen_name: user };
        usersRequest.push(ClientTwitter.get('users/show.json', params));
      });

      await Promise.all(usersRequest)
        .then((response: any) => {
          console.log('response', response.length);
          console.log('response', response);
          const users = response.map(function(value: any) {
            return new Profile(value);
          });
          return res.status(200).json({ status: true, data: users });
        })
        .catch((error) => {
          return res.status(404).json({ status: false, message: 'Not exists user or users in Twitter' });
        });
    } else if (typeof users === 'string') {
      const params = { screen_name: users };

      ClientTwitter.get('users/show.json', params, function(error: any, tweets: any, response: any) {
        if (!error) {
          const profile = new Profile(tweets);
          return res.status(200).json({ status: true, data: [profile] });
        }
        return res.status(404).send(error);
      });
    } else {
      return res.status(404).send(users);
    }
  }
}
