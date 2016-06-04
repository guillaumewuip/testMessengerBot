(() => {

    'use strict';

    const
        Botkit = require('botkit');

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

})();
