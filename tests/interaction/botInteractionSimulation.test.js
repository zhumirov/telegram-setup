import bot from '../../src/bot.js';
import mongoose from 'mongoose';

describe('Bot Integration Tests', () => {
    const ctxList = [
        {
            chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
            message: {
                message_id: 490,
                from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                date: 1723491968,
                text: 'test message'
            },
            callbackQuery: undefined,
            update: {
                update_id: 513166696,
                message: {
                    message_id: 490,
                    from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                    chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                    date: 1723491968,
                    text: 'test message'
                }
            }
        },
        {
            chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
            message: {
                message_id: 491,
                from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                date: 1723491977,
                text: '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
            },
            callbackQuery: undefined,
            update: {
                update_id: 513166697,
                message: {
                    message_id: 491,
                    from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                    chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                    date: 1723491977,
                    text: '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
                }
            }
        },
        {
            chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
            message: {
                message_id: 492,
                from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                date: 1723491984,
                voice: {
                    duration: 3,
                    mime_type: 'audio/ogg',
                    file_id: 'AwACAgIAAxkBAAIB7Ga6ZpAIQgNSqmWpW0RjgGF50JRiAAKFUwAC5s_YSd95aYMcSo_SNQQ',
                    file_unique_id: 'AgADhVMAAubP2Ek',
                    file_size: 12464
                }
            },
            callbackQuery: undefined,
            update: {
                update_id: 513166698,
                message: {
                    message_id: 492,
                    from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                    chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                    date: 1723491984,
                    voice: {
                        duration: 3,
                        mime_type: 'audio/ogg',
                        file_id: 'AwACAgIAAxkBAAIB7Ga6ZpAIQgNSqmWpW0RjgGF50JRiAAKFUwAC5s_YSd95aYMcSo_SNQQ',
                        file_unique_id: 'AgADhVMAAubP2Ek',
                        file_size: 12464
                    }
                }
            }
        },
        {
            chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
            message: {
                message_id: 493,
                from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                date: 1723491996,
                document: {
                    file_name: 'резюме_080824 (1).docx',
                    mime_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    file_id: 'BQACAgIAAxkBAAIB7Wa6Zpyz6_geZ1m5sYR2AtlQU2HdAAKGUwAC5s_YSYyd0TENIV-gNQQ',
                    file_unique_id: 'AgADhlMAAubP2Ek',
                    file_size: 113645
                }
            },
            callbackQuery: undefined,
            update: {
                update_id: 513166699,
                message: {
                    message_id: 493,
                    from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                    chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                    date: 1723491996,
                    document: {
                        file_name: 'резюме_080824 (1).docx',
                        mime_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        file_id: 'BQACAgIAAxkBAAIB7Wa6Zpyz6_geZ1m5sYR2AtlQU2HdAAKGUwAC5s_YSYyd0TENIV-gNQQ',
                        file_unique_id: 'AgADhlMAAubP2Ek',
                        file_size: 113645
                    }
                }
            }
        },
        {
            chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
            message: {
                message_id: 494,
                from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                date: 1723492000,
                document: {
                    file_name: 'm_product_requisites (2).pdf',
                    mime_type: 'application/pdf',
                    thumbnail: {
                        file_id: 'AAMCAgADGQEAAgHuZrpmoOUyJasKbSk0nhKwAg9WpCMAAodTAALmz9hJQVuPJ7CCynoBAAdtAAM1BA',
                        file_unique_id: 'AQADh1MAAubP2Ely',
                        file_size: 2597,
                        width: 226,
                        height: 320
                    },
                    thumb: {
                        file_id: 'AAMCAgADGQEAAgHuZrpmoOUyJasKbSk0nhKwAg9WpCMAAodTAALmz9hJQVuPJ7CCynoBAAdtAAM1BA',
                        file_unique_id: 'AQADh1MAAubP2Ely',
                        file_size: 2597,
                        width: 226,
                        height: 320
                    },
                    file_id: 'BQACAgIAAxkBAAIB7ma6ZqDlMiWrCm0pNJ4SsAIPVqQjAAKHUwAC5s_YSUFbjyewgsp6NQQ',
                    file_unique_id: 'AgADh1MAAubP2Ek',
                    file_size: 64093
                }
            },
            callbackQuery: undefined,
            update: {
                update_id: 513166700,
                message: {
                    message_id: 494,
                    from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                    chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                    date: 1723492000,
                    document: {
                        file_name: 'm_product_requisites (2).pdf',
                        mime_type: 'application/pdf',
                        thumbnail: {
                            file_id: 'AAMCAgADGQEAAgHuZrpmoOUyJasKbSk0nhKwAg9WpCMAAodTAALmz9hJQVuPJ7CCynoBAAdtAAM1BA',
                            file_unique_id: 'AQADh1MAAubP2Ely',
                            file_size: 2597,
                            width: 226,
                            height: 320
                        },
                        thumb: {
                            file_id: 'AAMCAgADGQEAAgHuZrpmoOUyJasKbSk0nhKwAg9WpCMAAodTAALmz9hJQVuPJ7CCynoBAAdtAAM1BA',
                            file_unique_id: 'AQADh1MAAubP2Ely',
                            file_size: 2597,
                            width: 226,
                            height: 320
                        },
                        file_id: 'BQACAgIAAxkBAAIB7ma6ZqDlMiWrCm0pNJ4SsAIPVqQjAAKHUwAC5s_YSUFbjyewgsp6NQQ',
                        file_unique_id: 'AgADh1MAAubP2Ek',
                        file_size: 64093
                    }
                }
            }
        },
        {
            chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
            message: {
                message_id: 495,
                from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                date: 1723492015,
                photo: [
                    { file_id: 'AgACAgIAAxkBAAIB72a6Zq75lHHeoRF7r_iARf3FVY1SAAJG4jEb5s_YSS7_FAI6GeLaAQADAgADcwADNQQ', file_unique_id: 'AQADRuIxG-bP2El4', file_size: 1381, width: 90, height: 90 },
                    { file_id: 'AgACAgIAAxkBAAIB72a6Zq75lHHeoRF7r_iARf3FVY1SAAJG4jEb5s_YSS7_FAI6GeLaAQADAgADbQADNQQ', file_unique_id: 'AQADRuIxG-bP2Ely', file_size: 17479, width: 320, height: 320 },
                    { file_id: 'AgACAgIAAxkBAAIB72a6Zq75lHHeoRF7r_iARf3FVY1SAAJG4jEb5s_YSS7_FAI6GeLaAQADAgADeAADNQQ', file_unique_id: 'AQADRuIxG-bP2El9', file_size: 68110, width: 800, height: 800 },
                    { file_id: 'AgACAgIAAxkBAAIB72a6Zq75lHHeoRF7r_iARf3FVY1SAAJG4jEb5s_YSS7_FAI6GeLaAQADAgADeQADNQQ', file_unique_id: 'AQADRuIxG-bP2El-', file_size: 73797, width: 1024, height: 1024 }
                ],
                caption: '123'
            },
            callbackQuery: undefined,
            update: {
                update_id: 513166701,
                message: {
                    message_id: 495,
                    from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                    chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                    date: 1723492015,
                    photo: [
                        { file_id: 'AgACAgIAAxkBAAIB72a6Zq75lHHeoRF7r_iARf3FVY1SAAJG4jEb5s_YSS7_FAI6GeLaAQADAgADcwADNQQ', file_unique_id: 'AQADRuIxG-bP2El4', file_size: 1381, width: 90, height: 90 },
                        { file_id: 'AgACAgIAAxkBAAIB72a6Zq75lHHeoRF7r_iARf3FVY1SAAJG4jEb5s_YSS7_FAI6GeLaAQADAgADbQADNQQ', file_unique_id: 'AQADRuIxG-bP2Ely', file_size: 17479, width: 320, height: 320 },
                        { file_id: 'AgACAgIAAxkBAAIB72a6Zq75lHHeoRF7r_iARf3FVY1SAAJG4jEb5s_YSS7_FAI6GeLaAQADAgADeAADNQQ', file_unique_id: 'AQADRuIxG-bP2El9', file_size: 68110, width: 800, height: 800 },
                        { file_id: 'AgACAgIAAxkBAAIB72a6Zq75lHHeoRF7r_iARf3FVY1SAAJG4jEb5s_YSS7_FAI6GeLaAQADAgADeQADNQQ', file_unique_id: 'AQADRuIxG-bP2El-', file_size: 73797, width: 1024, height: 1024 }
                    ],
                    caption: '123'
                }
            }
        },
        {
            chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
            message: {
                message_id: 496,
                from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                date: 1723492023,
                document: {
                    file_name: 'резюме_080824.docx',
                    mime_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    file_id: 'BQACAgIAAxkBAAIB8Ga6ZrcJfClyNVtCBcZusBUq8sM1AAKJUwAC5s_YSc-jdDiDbFFQNQQ',
                    file_unique_id: 'AgADiVMAAubP2Ek',
                    file_size: 113645
                },
                caption: '123'
            },
            callbackQuery: undefined,
            update: {
                update_id: 513166702,
                message: {
                    message_id: 496,
                    from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                    chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                    date: 1723492023,
                    document: {
                        file_name: 'резюме_080824.docx',
                        mime_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        file_id: 'BQACAgIAAxkBAAIB8Ga6ZrcJfClyNVtCBcZusBUq8sM1AAKJUwAC5s_YSc-jdDiDbFFQNQQ',
                        file_unique_id: 'AgADiVMAAubP2Ek',
                        file_size: 113645
                    },
                    caption: '123'
                }
            }
        },
        {
            chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
            message: {
                message_id: 497,
                from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                date: 1723492029,
                document: {
                    file_name: 'm_product_requisites (2).pdf',
                    mime_type: 'application/pdf',
                    thumbnail: {
                        file_id: 'AAMCAgADGQEAAgHxZrpmvYx47-89lNBRBt5Dq-WBeYQAAopTAALmz9hJ3a_CAfScRHwBAAdtAAM1BA',
                        file_unique_id: 'AQADilMAAubP2Ely',
                        file_size: 2597,
                        width: 226,
                        height: 320
                    },
                    thumb: {
                        file_id: 'AAMCAgADGQEAAgHxZrpmvYx47-89lNBRBt5Dq-WBeYQAAopTAALmz9hJ3a_CAfScRHwBAAdtAAM1BA',
                        file_unique_id: 'AQADilMAAubP2Ely',
                        file_size: 2597,
                        width: 226,
                        height: 320
                    },
                    file_id: 'BQACAgIAAxkBAAIB8Wa6Zr2MeO_vPZTQUQbeQ6vlgXmEAAKKUwAC5s_YSd2vwgH0nER8NQQ',
                    file_unique_id: 'AgADilMAAubP2Ek',
                    file_size: 64093
                },
                caption: '123'
            },
            callbackQuery: undefined,
            update: {
                update_id: 513166703,
                message: {
                    message_id: 497,
                    from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                    chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                    date: 1723492029,
                    document: {
                        file_name: 'm_product_requisites (2).pdf',
                        mime_type: 'application/pdf',
                        thumbnail: {
                            file_id: 'AAMCAgADGQEAAgHxZrpmvYx47-89lNBRBt5Dq-WBeYQAAopTAALmz9hJ3a_CAfScRHwBAAdtAAM1BA',
                            file_unique_id: 'AQADilMAAubP2Ely',
                            file_size: 2597,
                            width: 226,
                            height: 320
                        },
                        thumb: {
                            file_id: 'AAMCAgADGQEAAgHxZrpmvYx47-89lNBRBt5Dq-WBeYQAAopTAALmz9hJ3a_CAfScRHwBAAdtAAM1BA',
                            file_unique_id: 'AQADilMAAubP2Ely',
                            file_size: 2597,
                            width: 226,
                            height: 320
                        },
                        file_id: 'BQACAgIAAxkBAAIB8Wa6Zr2MeO_vPZTQUQbeQ6vlgXmEAAKKUwAC5s_YSd2vwgH0nER8NQQ',
                        file_unique_id: 'AgADilMAAubP2Ek',
                        file_size: 64093
                    },
                    caption: '123'
                }
            }
        },
        {
            chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
            message: {
                message_id: 498,
                from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                date: 1723492038,
                text: '/command',
                entities: [{ offset: 0, length: 8, type: 'bot_command' }]
            },
            callbackQuery: undefined,
            update: {
                update_id: 513166704,
                message: {
                    message_id: 498,
                    from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                    chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                    date: 1723492038,
                    text: '/command',
                    entities: [{ offset: 0, length: 8, type: 'bot_command' }]
                }
            }
        },
        {
            chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
            message: undefined,
            callbackQuery: {
                id: '666844329276244214',
                from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                message: {
                    message_id: 337,
                    from: { id: 7386076838, is_bot: true, first_name: 'bex_test', username: 'test_bex_bot' },
                    chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                    date: 1723400505,
                    text: 'Instructions: \nBy pressing specializations above, they will toggle between junior, middle, senior. After you finished setting, you can press button below, to confirm you profile and to receive job posts for last 24 hours. Time by time, you will be receiving job posts, that fits your profile as well.',
                    entities: [
                        { offset: 0, length: 13, type: 'bold' },
                        { offset: 60, length: 38, type: 'bold' }
                    ],
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Confirm', callback_data: 'jobs_today' }]
                        ]
                    }
                },
                chat_instance: '-2807738819566948504',
                data: 'jobs_today'
            },
            update: {
                update_id: 513166705,
                callback_query: {
                    id: '666844329276244214',
                    from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                    message: {
                        message_id: 337,
                        from: { id: 7386076838, is_bot: true, first_name: 'bex_test', username: 'test_bex_bot' },
                        chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                        date: 1723400505,
                        text: 'Instructions: \nBy pressing specializations above, they will toggle between junior, middle, senior. After you finished setting, you can press button below, to confirm you profile and to receive job posts for last 24 hours. Time by time, you will be receiving job posts, that fits your profile as well.',
                        entities: [
                            { offset: 0, length: 13, type: 'bold' },
                            { offset: 60, length: 38, type: 'bold' }
                        ],
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: 'Confirm', callback_data: 'jobs_today' }]
                            ]
                        }
                    },
                    chat_instance: '-2807738819566948504',
                    data: 'jobs_today'
                }
            }
        },
        {
            chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
            message: undefined,
            callbackQuery: undefined,
            update: {
                update_id: 513166706,
                my_chat_member: {
                    chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                    from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                    date: 1723492110,
                    old_chat_member: {
                        user: { id: 7386076838, is_bot: true, first_name: 'bex_test', username: 'test_bex_bot' },
                        status: 'member'
                    },
                    new_chat_member: {
                        user: { id: 7386076838, is_bot: true, first_name: 'bex_test', username: 'test_bex_bot' },
                        status: 'kicked',
                        until_date: 0
                    }
                }
            }
        },
        {
            chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
            message: undefined,
            callbackQuery: undefined,
            update: {
                update_id: 513166707,
                my_chat_member: {
                    chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                    from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                    date: 1723492114,
                    old_chat_member: {
                        user: { id: 7386076838, is_bot: true, first_name: 'bex_test', username: 'test_bex_bot' },
                        status: 'kicked',
                        until_date: 0
                    },
                    new_chat_member: {
                        user: { id: 7386076838, is_bot: true, first_name: 'bex_test', username: 'test_bex_bot' },
                        status: 'member'
                    }
                }
            }
        },
        {
            chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
            message: {
                message_id: 499,
                from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                date: 1723492115,
                text: '/start',
                entities: [{ offset: 0, length: 6, type: 'bot_command' }]
            },
            callbackQuery: undefined,
            update: {
                update_id: 513166708,
                message: {
                    message_id: 499,
                    from: { id: 155261794, is_bot: false, first_name: 'B', last_name: 'Z', username: 'zhubek', language_code: 'ru' },
                    chat: { id: 155261794, first_name: 'B', last_name: 'Z', username: 'zhubek', type: 'private' },
                    date: 1723492115,
                    text: '/start',
                    entities: [{ offset: 0, length: 6, type: 'bot_command' }]
                }
            }
        }
    ];


    afterAll(async () => {
        // Close the MongoDB connection
        await mongoose.connection.close();
    });

    ctxList.forEach((ctx, index) => {
        test(`should handle ctx case ${index + 1} without errors`, async () => {
            await bot.handleUpdate(ctx.update);
        });
    });
});