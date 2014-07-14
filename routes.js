Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});
Router.map(function() {
    this.route('Home', {path: '/'});
    this.route('Search');
    this.route('Designer');
    this.route('About');
    this.route('Contact');
    this.route('UserForm');
});
