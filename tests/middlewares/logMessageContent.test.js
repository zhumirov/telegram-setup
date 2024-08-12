import logMessageContentMiddleware from '../../src/middlewares/logMessageContent.js';
import { logInfo } from '../../src/utils/logger.js';

jest.mock('../../src/utils/logger.js');

describe('logMessageContentMiddleware', () => {
    let ctx;
    let next;

    beforeEach(() => {
        ctx = {
            chat: { id: 12345, first_name: 'Test', last_name: 'User', username: 'testuser', type: 'private' },
            message: { message_id: 1, text: 'Hello' },
            callbackQuery: { id: 'callback_123', data: 'some_callback_data' },
            update: { update_id: 123 },
        };
        next = jest.fn();
    });

    test('should log message content', async () => {
        await logMessageContentMiddleware(ctx, next);
        expect(logInfo).toHaveBeenCalledWith(expect.stringContaining(`ctx = {'chat': ${JSON.stringify(ctx.chat)}, 'message': ${JSON.stringify(ctx.message)}, 'callbackQuery': ${JSON.stringify(ctx.callbackQuery)},'update': ${JSON.stringify(ctx.update)}}`));
        expect(next).toHaveBeenCalled();
    });
});