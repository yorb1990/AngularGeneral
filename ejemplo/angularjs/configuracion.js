angularapp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'paginas/index.html',
            controller  : 'ejemplos'                    
        })
        .when('/ejemplos/:num',{
            templateUrl: 'paginas/ejemplo.html',
            controller: 'ejemplos'
        })
    ;
});