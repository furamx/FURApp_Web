import firebase from './firebase.js';
// import $ from 'jquery';
export function getFacebookEvents() {

    // $(document).ready(function () {
        // const accessToken = 'EAACEdEose0cBADZByZAd8LQB8leyEPepriDQrMcqa0ZCVKb1Lj6XUEs5svTxsqMUZCZA2dIJCDZAgZCp6AuZBkJcZA8uYXziKjwZBZARNQDk9x2MCNj1LW5qIHZAKQDEUMToe1FI4WM3tpoFBC105JY14zAAZC70gGudjDXiQKi658aTyoVKEsjL1EUKDCsvs4MrbrW9OSjSo7rGwRPKUtwYwwjI3';
        // const facebookID = '1631925310470945';
        const appID = '421974994867254';
        window.FB.init({
            appId: appID,
            autoLogAppEvents: true,
            status: true,
            xfbml: true,
            version: 'v2.12',
        });
        const tokenRef = firebase.database().ref("furapp");
        const accessToken = tokenRef.once("value").then(
            (snapshot) => {
                console.log(snapshot.val());
                return snapshot.val();
            }).then(
            (token) => {
                window.FB.api(
                    '/1631925310470945/events',
                    'GET',
                    { "fields": "name,id" },
                    { access_token: token },
                    function (response) {
                        console.log('FACEBOOK');
                        console.log(response);
                    }
                );
            }
            );
        console.log(accessToken);

        // window.FB.api(
        //     '/1631925310470945/events',
        //     'GET',
        //     { "fields": "name,id" },
        //     { access_token: accessToken },
        //     function (response) {
        //         console.log('FACEBOOK');
        //         console.log(response);
        //     }
        // );
    // });
}





