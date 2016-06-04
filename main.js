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

    //controller.on('message_received', (bot, message) => {
    //    var reply = 'Welcome (message_received)!';

    //    console.log(message);

    //    bot.reply(message, reply, (err) => {
    //        if (err) {
    //            console.error('error');
    //        }
    //        console.log('reply send');
    //    });

    //});

    controller.hears(
        /(hello|yo|hi|salut|bonjour)/i,
        'message_received',
        (bot, message) => {
            bot.startConversation(message, (err, convo) => {
                convo.say('Bonjour !');
                convo.ask('Comment ça va ?', (response, convo) => {
                    convo.say(`Je suis trop bête pour comprendre
                              "${response.text}". J'espère que ça va bien !`);
                    convo.next();
                });
            });
        }
    );

})();
