function func($http, $rootScope,$location){
    function jsonData(json){
        var str = '';
        var arr = [];
        for(i in json){
            str = i+'='+json[i];
            arr.push(str)
        }
        return arr.join('&')
    }

    function getData(url,data,method){
        method = method.toUpperCase();
        if(method == 'GET'){
            var data = jsonData(data);
            return $http.get(url+'?'+data).success(function(res){
            })  
        }else{
            return $http.post(url,data).success(function(res){
                // console.log(res)
            })
        }
    }

    this.getInfo = function(url,data,method){
        return getData(url,data,method)
    }

    this.getInfo2 = function(url,data,method){
        method = method.toUpperCase();
        return getData(url,data,method)
    }



}
angular.module('app').service('apiService',func)