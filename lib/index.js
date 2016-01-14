var util = require( 'util' );
var oauth = require( 'passport-oauth2' );

module.exports = Strategy;
module.exports.Strategy = Strategy;

const URL_AUTH = 'https://www.panoply.io/oauth/authorize';
const URL_TOKEN = 'https://www.panoply.io/oauth/token';
const URL_PROFILE = 'https://www.panoply.io/oauth/profile';

util.inherits( Strategy, oauth.Strategy );

function Strategy ( options, verify ) {
    options = options || {};
    options.authorizationURL = options.authorizationURL || URL_AUTH;
    options.tokenURL = options.tokenURL || URL_TOKEN;

    oauth.Strategy.call( this, options, verify );
    this.name = 'panoply';
    this.profileURL = options.profileURL || URL_TOKEN;
}

Strategy.prototype.userProfile = function ( token, done ) {
    console.log( 'GET PROFILE?' );
    this._oauth2.get( this.profileURL, token, function ( err, body ) {
        if ( err ) {
            done( err );
            return;
        }

        try {
            body = JSON.parse( body );
        } catch ( _ ) {
            done( new Error( 'Failed to parse user profile' ) );
            return;
        }

        done( null, body );
    })
}

Strategy.Strategy = Strategy;
return Strategy
