if (Meteor.isClient) {
    Template.navLogin.username = function () {
          return Meteor.user().username;
    };
    Template.navLogin.events({
        'click #signOut': function(e, t) {
            Meteor.logout(function() {
                Session.set('homeAlert', 'Bye! Come back soon!');
            });
            Router.go('home');
            return false;
        }
    });
    Template.signUp.events({
        'submit #registration-form' : function(e, t){
            e.preventDefault();
            var regForm             =   $(e.currentTarget)
                , username          =   regForm.find('#acc-username').val()
                , email             =   trimInput(regForm.find('#acc-email').val().toLowerCase())
                , pwd               =   regForm.find('#acc-pwd').val()
                , pwdconfirm        =   regForm.find('#acc-pwd-confirm').val();

            if (isValidUsername(username, 'signUpAlert') && isNotEmpty(email, 'signUpAlert') && isNotEmpty(pwd, 'signUpAlert') &&  isEmail(email, 'signUpAlert') && areValidPasswords(pwd, pwdconfirm, 'signUpAlert')) {
                Accounts.createUser({username: username, email: email, password: pwd}, function(err) {
                    if (err) {
                        if (err.message === 'Email already exists. [403]') {
                            Session.set('signUpAlert', 'We\'re sorry but this email is already used.');
                        } else {
                            Session.set('signUpAlert', 'We\'re sorry but something went wrong.');
                        }
                    } else {
                        Session.set('dashAlert', 'Congrats! You\'re now a new Meteorite!');
                        Router.go('dashboard');
                    }
                });
            }
            return false;
        }
    });
    Template.signIn.events({
        'submit #signInForm': function(e, t) {
            e.preventDefault();

            var signInForm = $(e.currentTarget)
                , email = trimInput(signInForm.find('#email').val().toLowerCase())
                , password = signInForm.find('#pwd').val();

            if (isNotEmpty(email, 'signInAlert') && isEmail(email, 'signInAlert') && isNotEmpty(password, 'signInAlert') && isValidPassword(password, 'signInAlert')) {
                Meteor.loginWithPassword(email, password, function(err) {
                    if (err) {
                        Session.set('signInAlert', 'We\'re sorry but these credentials are not valid.');
                    } else {
                        Session.set('dashAlert', 'Welcome back New Meteorite!');
                        Router.go('dashboard');
                    }
                });
            }
            return false;
        }
    });
    Template.forgotPassword.events({
        'submit #forgotPasswordForm': function(e, t) {
            e.preventDefault();

            var forgotPasswordForm = $(e.currentTarget),
                email = trimInput(forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase());

                            Session.set('fPAlert', 'This email does not exist.');
            if (isNotEmpty(email, 'fPAlert') && isEmail(email, 'fPAlert')) {
                Accounts.forgotPassword({email: email}, function(err) {
                    if (err) {
                        if (err.message === 'User not found [403]') {
                            Session.set('fPAlert', 'This email does not exist.');
                        } else {
                            Session.set('fPAlert', 'We\'re sorry but something went wrong.');
                        }
                    } else {
                        Session.set('fPAlert', 'Email Sent. Please check your mailbox to reset your password.');
                    }
                });
            }
            return false;
        }
    });
    
    Template.designer.rendered = function() {
        console.log('no longer');
        var itemWidth = (($('#grid_mason').width())*0.3);
        console.log('itemWidth: '+ itemWidth);
        var Selector = document.querySelector('#grid_mason');
        imagesLoaded( Selector, function () {
        var msnry = new Masonry( Selector, {
            itemSelector: '.brand_item',
            columnWidth: itemWidth,
            "isFitWidth": true
        })    
        });
        msnry.layout();
        
    }

    Template.fPAlert.helpers({
        fPAlert: function() {
            return Session.get('fPAlert');
        }
    });
    Template.signInAlert.helpers({
        signInAlert: function() {
            return Session.get('signInAlert');
        }
    });
    Template.signUpAlert.helpers({
        signUpAlert: function() {
            return Session.get('signUpAlert');
        }
    });
    Template.dashAlert.helpers({
        dashAlert: function() {
            return Session.get('dashAlert');
        }
    });
    Template.homeAlert.helpers({
        homeAlert: function() {
            return Session.get('homeAlert');
        }
    });
}
