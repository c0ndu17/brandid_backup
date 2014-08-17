Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});
Router.map(function() {
    this.route('home', {path: '/'});
    this.route('search');
    this.route('designer');
    this.route('about');
    this.route('contact');
    this.route('userForm');
    this.route('forgotPassword');
    this.route('signIn');
    this.route('signUp');
    this.route('dashboard');
    this.route('TandC');
    this.route('privacypol');
});
