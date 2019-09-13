import { Request, Response } from 'express';
import { WELCOME_MESSAGE, API_SEARCH_HASH_TAG } from '../constants/usfa.constants';

import { ClientTwitter } from '../config/ClientTwitter';

export class HashTagsService {
  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send(WELCOME_MESSAGE);
  }

  public async findHashTag(req: Request, res: Response) {
    const { values } = req.body;
    if (typeof values === 'object') {
      const usersRequest: any = [];

      values.forEach((user: string) => {
        const params = { q: user };
        usersRequest.push(ClientTwitter.get(API_SEARCH_HASH_TAG, params));
      });

      await Promise.all(usersRequest)
        .then((response: any) => {
          return res.status(200).json({ status: true, data: response });
        })
        .catch((error) => {
          return res.status(404).send({ status: false, message: 'Not exists HashTags, am sorry XD' });
        });
    } else if (typeof values === 'string') {
      const params = { q: values };

      ClientTwitter.get(API_SEARCH_HASH_TAG, params, function(error: any, tweets: any, response: any) {
        if (!error) {
          return res.status(200).json({ status: true, data: [tweets] });
        }
        return res.status(404).send(error);
      });
    } else {
      return res.status(404).send(values);
    }
  }
}
