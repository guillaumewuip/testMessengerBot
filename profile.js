'use strict';

(() => {

    const
        request = require('request');

    const
        ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

    const api = {

        getProfile: (id) => {
            return new Promise((resolve, reject) => {

                const fields = [
                    'first_name',
                    'last_name',
                    'profile_pic',
                    'locale',
                    'timezone',
                    'gender',
                ];

                const url = `https://graph.facebook.com/v2.6/${id}`
                            + `?fields=${fields.join(',')}`
                            + `&access_token=${ACCESS_TOKEN}`;

                request.get(
                    {
                        url,
                        json: true,
                    },
                    (err, response, body) => {
                        if (!err && response.statusCode === 200) {
                            resolve(body);
                        }
                        else {
                            resject(err);
                        }
                    }
                );
            });
        },
    }

    module.exports = api;

})();
