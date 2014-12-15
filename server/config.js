Meteor.startup(function() {

    Accounts.emailTemplates.from = 'Staffingboard <postmaster@sandboxa394801553fc40438ad32d792bd8068c.mailgun.org>';
    Accounts.emailTemplates.siteName = 'Staffingboard';
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
        return 'Confirm Your Email Address';
    };

    // A Function that takes a user object and a url, and returns the body text for the email.
    // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
    Accounts.emailTemplates.verifyEmail.text = function(user, url) {
        return 'click on the following link to verify your email address: ' + url;
    };
});

Accounts.onCreateUser(function(options, user) {
    user.profile = {};

    // we wait for Meteor to create the user before sending an email
    Meteor.setTimeout(function() {
        Accounts.sendVerificationEmail(user._id);
    }, 2 * 1000);

    return user;
});
Accounts.validateLoginAttempt(function(attempt){
    if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
        console.log('email not verified');

        return false; // the login is aborted
    }
    return true;
});

