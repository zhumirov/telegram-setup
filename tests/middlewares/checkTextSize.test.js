import checkTextSizeMiddleware from '../../src/middlewares/checkTextSize.js';

describe('checkTextSizeMiddleware', () => {
    let ctx;
    let next;

    beforeEach(() => {
        process.env.MAX_TEXT_SIZE = '1000';
        ctx = {
            state: {
                user: {
                    chatId: '12345',
                    scenario: { value: 'regular', priority: 0 },
                },
            },
            message: {
                text: 'a'.repeat(1001),
            },
        };
        next = jest.fn();
    });

    test('should set scenario to "too_big_text" if message exceeds max size', async () => {
        await checkTextSizeMiddleware(ctx, next);
        expect(ctx.state.user.scenario.value).toBe('too_big_text');
        expect(ctx.state.user.scenario.priority).toBe(7);
        expect(next).toHaveBeenCalled();
    });

    test('should not change scenario if message is within max size', async () => {
        ctx.message.text = 'a'.repeat(999);
        await checkTextSizeMiddleware(ctx, next);
        expect(ctx.state.user.scenario.value).toBe('regular');
        expect(ctx.state.user.scenario.priority).toBe(0);
        expect(next).toHaveBeenCalled();
    });
});