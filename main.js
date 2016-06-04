'use strict';

(() => {

    const
        Botkit          = require('botkit'),
        profile         = require('./profile'),
        conversation    = require('./conversation');

    const
        ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
        VERIFY_TOKEN = process.env.FACEBOOK_VERIFY_TOKEN,
        PORT         = process.env.PORT || 8080;

    if (!ACCESS_TOKEN) {
        throw new Error('FACEBOOK_PAGE_ACCESS_TOKEN is required but missing');
    }

    if (!VERIFY_TOKEN) {
        throw new Error('FACEBOOK_VERIFY_TOKEN is required but missing');
    }

    const controller = Botkit.facebookbot({
        access_token: ACCESS_TOKEN,
        verify_token: VERIFY_TOKEN
    });

    const bot = controller.spawn();

    controller.setupWebserver(PORT, (err, webserver) => {
        if (err) {
            console.error(err);
        }

        controller.createWebhookEndpoints(webserver, bot, () => {
            console.log(`Listening on port ${PORT}`);
        });
    });

    controller.hears(
        '(hello|yo|hi|salut|bonjour)',
        'message_received',
        (bot, message) => {

            console.log('received', message);

            profile
                .getProfile(message.user)
                .then((user) => {
                    bot.startConversation(message, conversation.hello(user));
                })
                .catch((err) => {
                    console.error(err);
                    bot.reply(message, `J'ai bug, pardons :'(`);
                });
        }
    );

})();
