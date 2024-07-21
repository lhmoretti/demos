import { Request, Response, NextFunction } from 'express';
import { MockController } from './mock.controller';

export class MockRouter {
    public controlador: MockController = new MockController();

    public routes(app): void {
        app.route('/api/v1/mock').get(
            (req: Request, res: Response, next: NextFunction) => {
                next();
            },
            this.controlador.mock,
        );
    }
}
