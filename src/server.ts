import app from './app';
import { PORT } from './constants/usfa.constants';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
