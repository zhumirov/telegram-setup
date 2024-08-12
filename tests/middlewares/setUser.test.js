import setUserMiddleware from '../../src/middlewares/setUser.js';
import User from '../../src/models/User.js';

jest.mock('../../src/models/User.js');

describe('setUserMiddleware', () => {
    let ctx;
    let next;

    beforeEach(() => {
        ctx = {
            chat: {
                id: '12345',
            },
            state: {},
        };
        next = jest.fn();
    });

    test('should create a new user if not found', async () => {
        User.findOne.mockResolvedValue(null);
        User.prototype.save = jest.fn().mockResolvedValue({});

        await setUserMiddleware(ctx, next);
        expect(User.findOne).toHaveBeenCalledWith({ chatId: '12345' });
        expect(ctx.state.user).toBeInstanceOf(User);
        expect(next).toHaveBeenCalled();
    });

    test('should retrieve existing user if found', async () => {
        const mockUser = { chatId: '12345' };
        User.findOne.mockResolvedValue(mockUser);

        await setUserMiddleware(ctx, next);
        expect(User.findOne).toHaveBeenCalledWith({ chatId: '12345' });
        expect(ctx.state.user).toEqual(mockUser);
        expect(next).toHaveBeenCalled();
    });
});