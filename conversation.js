'use strict';

(() => {

    const api = {

        hello: (user) => {

            return (response, convo) => {
                convo.say(`Bonjour ${user.first_name} ${user.last_name} :D`);
                api.confirmUser(user)(response, convo);
                conv.next();
            }
        },

        confirmUser: (user) => {
            return (response, convo) => {
                convo.ask({
                    attachment: {
                        'type': 'template',
                        'payload': {
                            'template_type': 'generic',
                            'elements': [
                                {
                                    'title': `${user.first_name} `
                                            + `${user.last_name}`,
                                    'image_url': user.profile_pic,
                                    'subtitle': 'Est-ce bien vous ?',
                                    'buttons': [
                                        {
                                            'type': 'postback',
                                            'payload': 'PROFILE_YES',
                                            'title': 'Oui',
                                        },
                                        {
                                            'type': 'postback',
                                            'payload': 'PROFILE_NO',
                                            'title': 'Non',
                                        },
                                    ]
                                },
                            ]
                        }
                    }
                }, (response, convo) => {
                    console.log(response);
                    convo.next();
                });
            }
        },
    };

    module.exports = api;

})();

