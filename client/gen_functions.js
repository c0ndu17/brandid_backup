trimInput = function(value) {
    return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value, alert) {
    if (value && value !== ''){
        return true;
    }
    Session.set(alert, 'Please fill in all required fields.');
    return false;
};

isEmail = function(value, alert) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    Session.set(alert, 'Please enter a valid email address.');
    return false;
};

isValidPassword = function(password, alert) {
    if (password.length < 6) {
        Session.set(alert, 'Your password should be 6 characters or longer.');
        return false;
    }
    return true;
};
isValidUsername = function(username, alert){
    var filter = /^[a-z0-9A-Z_]{3,16}$/;
    console.log(username)
    if (filter.test(username)) {
        return true;
    }
    Session.set(alert, 'Your username must be made up of 3-16 letters, numbers, underscores and hyphens.');
    return false;
};

areValidPasswords = function(password, confirmed, alert) {
    if (!isValidPassword(password)) {
        return false;
    }
    if (password !== confirmed) {
        Session.set(alert, 'Your two passwords are not equivalent.');
        return false;
    }
    return true;
};
var deferImage = function(element) {
    var i, len, attr;
    var img = new Image();
    var placehold = element.children[0];

    element.className+= ' is-loading';

    img.onload = function() {
        element.className = element.className.replace('is-loading', 'is-loaded');
        element.replaceChild(img, placehold);
    };

    for (i = 0, len = placehold.attributes.length; i < len; i++) {
        attr = placehold.attributes[i];
        if (attr.name.match(/^data-/)) {
            img.setAttribute(attr.name.replace('data-', ''), attr.value);
        }
    }
}
