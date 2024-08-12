import constructMessageMiddleware from '../../src/middlewares/constructMessage.js';
import Message from '../../src/models/Message.js';

describe('constructMessageMiddleware', () => {
    let ctx;
    let next;

    beforeEach(() => {
        ctx = {
            state: {
                user: {
                    chatId: '12345',
                },
                messageType: 'regular text',
            },
            message: {
                text: 'Hello, world!',
                message_id: 1,
                date: Date.now(),
            },
        };
        next = jest.fn();
    });

    test('should construct message correctly', async () => {
        await constructMessageMiddleware(ctx, next);
        expect(ctx.state.message).toEqual(expect.objectContaining({
            chatId: '12345',
            type: 'regular text',  // Ensure this matches the type set in the middleware
            content: 'Hello, world!',
        }));
        expect(next).toHaveBeenCalled();
    });
});