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
                    scenario: { value: 'regular', priority: 0 },
                },
            },
        };
        next = jest.fn();
    });

    test('should set scenario to "blocked" if user is blocked', async () => {
        await blockCheckMiddleware(ctx, next);
        expect(ctx.state.user.scenario.value).toBe('blocked');
        expect(ctx.state.user.scenario.priority).toBe(10);
        expect(next).toHaveBeenCalled();
    });

    test('should not change scenario if user is not blocked', async () => {
        ctx.state.user.blockedUntil = new Date(Date.now() - 10000).toISOString();
        await blockCheckMiddleware(ctx, next);
        expect(ctx.state.user.scenario.value).toBe('regular');
        expect(ctx.state.user.scenario.priority).toBe(0);
        expect(next).toHaveBeenCalled();
    });
});