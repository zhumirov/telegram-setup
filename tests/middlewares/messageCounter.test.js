import messageCounterMiddleware from '../../src/middlewares/messageCounter.js';

describe('messageCounterMiddleware', () => {
    let ctx;
    let next;

    beforeEach(() => {
        process.env.MESSAGE_LIMIT = '5';
        ctx = {
            state: {
                user: {
                    chatId: '12345',
                    messageCount: {
                        date: new Date(Date.now() - 86400000).toISOString(),
                        count: 0,
                    },
                    scenario: 'regular',
                },
            },
        };
        next = jest.fn();
    });

    test('should reset message count if date is different', async () => {
        await messageCounterMiddleware(ctx, next);
        expect(ctx.state.user.messageCount.count).toBe(1);
        expect(next).toHaveBeenCalled();
    });

    test('should increment message count if date is the same', async () => {
        ctx.state.user.messageCount.date = new Date().toISOString();
        await messageCounterMiddleware(ctx, next);
        expect(ctx.state.user.messageCount.count).toBe(1);
        expect(next).toHaveBeenCalled();
    });

    test('should set scenario to "limited" if message count exceeds limit', async () => {
        ctx.state.user.messageCount.date = new Date().toISOString();
        ctx.state.user.messageCount.count = 5;
        await messageCounterMiddleware(ctx, next);
        expect(ctx.state.user.scenario).toBe('limited');
        expect(next).toHaveBeenCalled();
    });
});