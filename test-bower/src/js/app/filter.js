function unique(){
    return function(arr){
        var n = [];
        var obj = {};

        for(var i = 0;i<arr.length;i++){
           if(!obj[arr[i]]){
            n.push(arr[i])
            obj[arr[i]] = 1;
           } 
        }
        
       return n;
    }
}
angular.module('app')
       .filter('unique',unique)