if (Meteor.isClient) {
    Template._loginButtonsLoggedInDropdown.events({
        'click #login-buttons-edit-profile': function(event) {
            event.stopPropagation();
            Template._loginButtons.toggleDropdown();
            Router.go('profileEdit');
        }
    });
    Template.Home.isFirstRun = function(){
        return !Session.get("hasRun");
    }
}
