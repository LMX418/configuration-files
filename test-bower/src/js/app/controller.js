function main($scope){
  console.log($scope)
  $scope.$on('parentData',function(err,data){
    console.log(data)
  })

  
  $scope.sub = function(){
    var aa = 22222;
    $scope.$broadcast('parentData2',aa)
  }
}
function index($scope,$rootScope,apiService){
    $scope.isColor = false;
    var aa = 1111;
    $scope.$emit('parentData',aa)
    console.log('hello12')
    $scope.$on('parentData2',function(err,data){
      console.log(data)
    })

    $scope.languageArr = [
      {'name':'中文112333355552','id':1,'msg':'','isactive':false},
      {'name':'英语','id':2,'msg':'','isactive':false},
      {'name':'法语','id':3,'msg':'','isactive':false}
    ]
    $scope.changeTxt = function(msg,id){
      $scope.languageArr[id-1].msg = msg
      $scope.languageArr[id-1].isactive = true;
      if(!msg){
        $scope.languageArr[id-1].msg = ''
        $scope.languageArr[id-1].isactive = false;
      }
    }
    $scope.sub = function(){
      $scope.isShow = true;
      $scope.sArr = [];
      $scope.tArr = [];
      for(var i = 0;i<$scope.languageArr.length;i++){
        if($scope.languageArr[i].msg!=''){
          $scope.sArr.push($scope.languageArr[i].name)
        }
      }
    }
    apiService.getInfo('/data/userInfo.json',{'name':'xxxx'},'post')
              .success(function(data){
                console.log(data)
              })
    $scope.selected = '';
}
function list($scope,$rootScope,$location){
    console.log('list控制器')
    $scope.arr = [1,2,3,4,5,6]
    console.log($location.search().name)

}
function product($scope,$location){
    console.log('product控制器')
    $scope.getInfo = function(){
      $location.path('user/info')
    }
}
function about($scope){
    console.log('about控制器')
}

function dom($scope){
}
function info($scope,apiService){
  apiService.getInfo('/data/userInfo.json',{"key":"fsa1r53","name":"xz"},'get')
            .success(function(res){
              console.log(res)
            })
}
angular.module('app')
       .controller('info',info)
       .controller('main',main)
       .controller('index',index)
       .controller('list',list)
       .controller('product',product)
       .controller('about',about)
       .controller('dom',dom)