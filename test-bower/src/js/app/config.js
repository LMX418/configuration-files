function config($stateProvider,$urlRouterProvider,$ocLazyLoadProvider){
    
    $urlRouterProvider.otherwise('/home/list')


    // $ocLazyLoadProvider.config({
    //     debug: false
    // });

    $stateProvider
        .state('home',{
            url : '/home',
            templateUrl : 'views/content.html'
        })
        .state('home.index',{
            url : '/index',
            templateUrl : 'views/index.html',
            data : {
                'title':'index',
                'data' : [1,2,3,4,5]
            },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {

                    return $ocLazyLoad.load([
                        {
                            files: ['css/style.css']
                        }
                    ]);
                }
            }
        })
        .state('home.list',{
            url : '/list?id&name',
            templateUrl : 'views/list.html',
            data : [1,2,3,4,5,6],
            controller:'list'
        })
        .state('home.product',{
            url : '/product',
            templateUrl : 'views/product.html', 
            controller:'product'
        })
        
        .state('home.about',{
            url : '/about',
            templateUrl : 'views/about.html',
            controller:'about'
        })
        .state('user',{
            url : '/user',
            templateUrl : 'views/content2.html'
        })
        .state('user.info',{
            url : '/info',
            templateUrl : 'views/info.html'
        })

}
angular.module('app')
       .config(config)
       .run(function($rootScope,$state){
            $rootScope.$state = $state;
       })