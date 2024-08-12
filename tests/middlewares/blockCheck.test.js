import blockCheckMiddleware from '../../src/middlewares/blockCheck.js';

describe('blockCheckMiddleware', () => {
    let ctx;
    let next;

    beforeEach(() => {
        ctx = {
            state: {
                user: {
                    chatId: '12345',
                    blockedUntil: new Date(Date.now() + 10000).toISOString(),
                    scenario: 'regular',
                },
            },
        };
        next = jest.fn();
    });

    test('should set scenario to "blocked" if user is blocked', async () => {
        await blockCheckMiddleware(ctx, next);
        expect(ctx.state.user.scenario).toBe('blocked');
        expect(next).toHaveBeenCalled();
    });

    test('should not change scenario if user is not blocked', async () => {
        ctx.state.user.blockedUntil = new Date(Date.now() - 10000).toISOString();
        await blockCheckMiddleware(ctx, next);
        expect(ctx.state.user.scenario).toBe('regular');
        expect(next).toHaveBeenCalled();
    });
});