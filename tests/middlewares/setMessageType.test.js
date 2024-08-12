import setMessageTypeMiddleware from '../../src/middlewares/setMessageType.js';

describe('setMessageTypeMiddleware', () => {
    let ctx;
    let next;

    beforeEach(() => {
        ctx = {
            state: {
                user: {},
            },
            message: {
                text: '/start',
            },
        };
        next = jest.fn();
    });

    test('should set message type to "command" for commands', async () => {
        await setMessageTypeMiddleware(ctx, next);
        expect(ctx.state.messageType).toBe('command');
        expect(next).toHaveBeenCalled();
    });

    test('should set message type to "regular text" for regular text messages', async () => {
        ctx.message.text = 'Hello, world!';
        await setMessageTypeMiddleware(ctx, next);
        expect(ctx.state.messageType).toBe('text');
        expect(next).toHaveBeenCalled();
    });

    test('should set message type to "callback" for callback queries', async () => {
        ctx = {
            state: {
                user: {},
            },
            callbackQuery: {
                data: 'callback_data',
            },
        };
        await setMessageTypeMiddleware(ctx, next);
        expect(ctx.state.messageType).toBe('callback');
        expect(next).toHaveBeenCalled();
    });
});