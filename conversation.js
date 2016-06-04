'use strict';

(() => {

    const
        PROFILE_YES = 'PROFILE_YES',
        PROFILE_NO  = 'PROFILE_NO';

    const api = {

        hello: (user) => {
            return (response, convo) => {
                console.log(user);

                convo.say(`Bonjour ${user.first_name} ${user.last_name} :D`);

                api.confirmUser(user)(response, convo);
                convo.next();
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
                                            'payload': PROFILE_YES,
                                            'title': 'Oui',
                                        },
                                        {
                                            'type': 'postback',
                                            'payload': PROFILE_NO,
                                            'title': 'Non',
                                        },
                                    ]
                                },
                            ]
                        }
                    }
                }, (response, convo) => {

                    if (response.text === PROFILE_YES) {
                        convo.say(`J'en étais sûr !`);
                    }
                    else {
                        let menteur = user.gender === 'male'
                                        ? 'menteur' : 'menteuse';
                        convo.say(`Vous êtes un ${menteur} `
                                  + `${user.first_name} ${user.last_name}`);
                        convo.say('Mais bon, passons ...');
                    }

                    api.askFeeling(user)(response, convo);

                    convo.next();
                });
            }
        },

        askFeeling: (user) => {
            return (response, convo) => {
                convo.ask('Ça va bien ?', [
                    {
                        pattern: 'oui|yep|yes|ça va|ça roule',
                        callback: (response, convo) => {
                            convo.say(`Voilà qui fait plaisir à entendre !`);
                            api.end(user)(response, convo);
                            convo.next();
                        }
                    },
                    {
                        pattern: 'no|non|nope|pas fort|bof|trise',
                        callback: (response, convo) => {
                            convo.say(`ohhh :'( #triste`);
                            api.end(user)(response, convo);
                            convo.next();
                        }
                    },
                    {
                        default: true,
                        callback: (response, convo) => {
                            convo.say('Je prends ça pour un oui !');
                            api.end(user)(response, convo);
                            convo.next();
                        }
                    }
                ]);
            }
        },

        end: (user) => {
            return (response, convo) => {
                convo.say(`Bon écoute ${user.first_name}`);
                convo.say(`Ça m'a fait plaisir de t'entendre !`);
                convo.say(`++`);
            };
        },

    };

    module.exports = api;

})();

