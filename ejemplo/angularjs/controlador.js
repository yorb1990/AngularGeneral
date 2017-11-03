angularapp.controller('ejemplos',['Utilidades','$scope','$location','$routeParams',function(Utilidades,$scope,$location,$routeParams){
	$scope.paginacion=function(actual){        
        var total=100;
        var accion='paginacion';
        var cuantos=25;
        $scope.HTML_RAW=Utilidades.HTML_Paginacion(actual,total,accion,cuantos);
		console.log($scope.HTML_RAW);
    }
    switch($routeParams.num){
        case "1":
            $scope.result=Utilidades.StringFormat('{0} es una buena {1}.de todas las {1}s que he conocido {0}, es el mejor de todas las {1}s.',['pedro','persona']);
        break;
        case "2":
            $scope.paginacion(2);            
        break;
        case "3":
            var datos=[
                {nombre:'pedro',apellido:'hernandez',edad:21},
                {nombre:'juan',apellido:'hernandez',edad:22},
                {nombre:'maria',apellido:'hernandez',edad:23}]
            $scope.HTML_RAW=Utilidades.HTML_TablaSimple(datos,'nombres');
        break;
        case "4":
            var dato={nombre:'pedro',apellido:'hernandez',edas:21};
            $scope.HTML_RAW=Utilidades.HTML_DatoSimple(dato,'nombre');
        break;
        case "5":
            var datos=[
                {valor:1,nombre:'op1'},
                {valor:2,nombre:'op2'},
                {valor:3,nombre:'op3'}];
            var id='ejeid';
            var seleccionado="2";
            var desabilitado=false;
            var nombre='ejenom';
            $scope.HTML_RAW=Utilidades.HTML_Combox_Simple(datos,id,seleccionado,desabilitado,nombre);
        break;
		case "6":
            var datos=[
                {valor:1,nombre:'op1'},
                {valor:2,nombre:'op2'},
                {valor:3,nombre:'op3'}];
            var id='ejeid';
            var desabilitado=false;
            var nombre='ejenom';
            $scope.HTML_RAW=Utilidades.HTML_Combox_Simple(datos,id,undefined,desabilitado,nombre);
        break;
		case "7":
            var datos=[
                {valor:1,nombre:'op1'},
                {valor:2,nombre:'op2'},
                {valor:3,nombre:'op3'}];
            var id='ejeid';
            var desabilitado=true;
            var nombre='ejenom';
            $scope.HTML_RAW=Utilidades.HTML_Combox_Simple(datos,id,undefined,desabilitado,nombre);
        break;
		case "8":
            var datos=[
                {valor:1,nombre:'op1'},
                {valor:2,nombre:'op2'},
                {valor:3,nombre:'op3'}];
            var id='ejeid';
            $scope.result="2";
            var nombre='ejenom';
            $scope.HTML_RAW=Utilidades.HTML_Combox_Simple(datos,id,seleccionado,undefined,nombre,"result");
        break;
		case "9":
            var datos=[
                {valor:1,nombre:'op1'},
                {valor:2,nombre:'op2'},
                {valor:3,nombre:'op3'},
				{valor:4,nombre:'op4'}];
			var marcas=[1,3];
            var id='ejeid';
            var nombre='ejenom';
            $scope.HTML_RAW=Utilidades.HTML_Combox_Simple(datos,id,seleccionado,undefined,nombre,undefined,marcas);
        break;
		case "10":
            var datos=[];
            var id='ejeid';
            $scope.HTML_RAW=Utilidades.HTML_Combox_Simple(datos,id);
        break;
        default:
        break;
    }
    
}]);