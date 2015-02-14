Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://postmaster%40mg.maodou.io:YOURPASSWORD@smtp.mailgun.org:587';
});

if (Meteor.isClient) {
  Template.email.events({
    'click #btn': function () {
      Meteor.call('sendEmail', $('#email').val());
      Session.set('done', true); 
    }
  });
  Template.email.done = function () { return Session.equals('done', true); }
}

if (Meteor.isServer) {
  Meteor.methods({
    sendEmail: function(email) {
      Email.send({to:email, from:'ktransier@gmail.com', subject:'Thanks for signing up!', text: 'Are you ready for the launch?'});
    }
  });
}
