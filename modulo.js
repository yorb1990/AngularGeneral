var gen={};
var AppName='WebServices';
var PackageDestiny='Usuarios';
var angularapp = angular
    .module('angularapp', ['ngCookies','ngRoute','ngSanitize'])    
    .directive('compile', ['$compile', function ($compile) {
        return function(scope, element, attrs) {
            scope.$watch(
              function(scope) {
                return scope.$eval(attrs.compile);
              },
              function(value) {
                element.html(value);
                $compile(element.contents())(scope);
              }
            )
        }
    }])
    .filter('html_true', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }])
    .factory('Utilidades', ['$http', '$q', '$cookies',  function ($http, $q, $cookies) {            
            var internal={
                RequestSearchViewError: function (data){
                    if(data.status!=200){						
                        Console.log(data);
                    }else{
                        if(data.data.length>0){
                            for (var i=0;i<data.data.length;i++){
                                if(data.data[i].ERROR!=undefined){
                                    console.log(data);
                                    break;
                                }else{
                                    if(data.data[i].length>0){
                                        for(var j=0;j<data.data[i].length;j++){
                                            if(data.data[i][j].ERROR!=undefined){
                                                i=data.data.length;
                                                console.log(data);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }                        
                        }  
                    }
                    return data;
                }
            };
        return {                  
            URLCompleta: function (url)
            {
                url=this.StringFormat('/{0}/{1}/{2}',[AppName,PackageDestiny,url]);
                console.log(url);
                return url;
            },
            FormatoURL: function (url) {
                return url;
            },
            ConeccionG_RAW: function (url, parametros,config) {                           
                var defered = $q.defer();
                var promise = defered.promise;
                config=(config==undefined)?null:config;
                $http.get(this.FormatoURL(url), parametros,config)
                .then(function (data) {
                    defered.resolve(internal.RequestSearchViewError(data));
                },function (data) {
                    defered.resolve(internal.RequestSearchViewError(data));
                });
                return promise;
            },
            ConeccionP_RAW: function (url, parametros,config) {                           
                var defered = $q.defer();
                var promise = defered.promise;
                config=(config==undefined)?null:config;
                $http.post(this.FormatoURL(url), parametros)
                .then(function (data) {
                    defered.resolve(internal.RequestSearchViewError(data));
                },function (data) {
                    defered.resolve(internal.RequestSearchViewError(data));
                });
                return promise;
            },
            ConeccionP: function (url, parametros,config) {
                url = this.URLCompleta(url);
                return this.ConeccionP_RAW(url, parametros,config);
            },
            ConeccionG: function (url, parametros,config) {
                url = this.URLCompleta(url);
                return this.ConeccionG_RAW(url, parametros,config);
            },
            AlmacenamientoObjetoCookie: function (Nombre, Valor) {
                $cookies.putObject(Nombre, Valor);
            },
            TomarObjetoCookie: function (Nombre) {
                return $cookies.getObject(Nombre);
            },
            ExisteObjectoCookie: function (Nombre) {
                return ($cookies.getObject(Nombre) !== undefined);
            },
            AlmacenamientoCookie: function (Nombre, Valor) {
                $cookies.put(Nombre, Valor);
            },
            EliminarCookie: function (Nombre) {
                $cookies.remove(Nombre);
            },
            TomarCookie: function (Nombre) {
                return $cookies.get(Nombre);
            },
            ExisteCookie: function (Nombre) {
                return ($cookies.get(Nombre) === undefined);
            },
            EliminarTodaCookies: function () {
                var cookies = $cookies.getAll();
                angular.forEach(cookies, function (v, k) {
                    $cookies.remove(k);
                });
            },
            escapeRegExp:function(str) {
                return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
            },
            StringFormat:function (_String, _Items) {
                for (var index = 0; index < _Items.length; index++) {
                    _String = _String.replace(new RegExp(this.escapeRegExp("{" + index + "}"), 'g'), _Items[index]);
                }
                return _String;
            },
            HTML_Paginacion:function(actual,total,accion,cuantos){
                var mostrar=(cuantos!=undefined&&cuantos!=null)?cuantos:10;
                var paginas="";
                var total_parcial=parseInt(total);
                total_parcial=parseInt(total_parcial/mostrar)+((total_parcial%mostrar!=0)?1:0)+1;
                for(var i=1;i<total_parcial;i+=1){
                    paginas+=this.StringFormat(
                            "<button class='btn btn-{1}' ng-click='{2}({3})'>{0}</button>"
                    ,[i,(i==actual+1)?"primary":"default",accion,i-1]);
                }
                return (paginas=="")?"":this.StringFormat('<div class="btn-group btn-group-sm"><button  class="btn btn-default" {1} ng-click="{3}(0)">&laquo;</button>{0}<button class="btn btn-default" {2} ng-click="{3}({4})">&raquo;</button></div>',[paginas,(actual==0)?"disabled":"",(actual+1==total_parcial-1)?"disabled":"",accion,total_parcial-2]);
            },
            HTML_TablaSimple:function(datos,titulo){
                var nombres=[];
                var tabla="<tr>";
                for(var nombre in datos[0]){
                    nombres.push(nombre);
                    tabla+=this.StringFormat('<th><strong>{0}</strong></th>',[nombre]);
                }
                tabla+="</tr>";
                for(var i=0;i<datos.length;i++){
                    tabla+="<tr>";
                    for(var j=0;j<nombres.length;j++){
                        tabla+=this.StringFormat('<td>{0}</td>',[
                            (datos[i][nombres[j]]==null)?'SIN VALOR PARA '+nombres[j]+' ASIGNADO':
                             datos[i][nombres[j]]]);
                    }
                    tabla+="</tr>";
                }
                return this.StringFormat('<div class="panel panel-default"><label class="panel-title">{1}</label><div class="panel-body table-responsive  "><table class="table">{0}</table></div></div>',[tabla,titulo]);
            },
            HTML_DatoSimple:function(datos,titulo){
                var resultado="";
                for(var nombre in datos){
                    resultado+=this.StringFormat('<strong>{0}</strong>: {1} <br>',[nombre,datos[nombre]]);                    
                }
                return this.StringFormat('<fieldset><legend>{1}</legend>{0}</fieldset>',[resultado,titulo]);
            },
            HTML_Combox_Simple:function(datos,id,seleccionado,desabilitado,nombre,model,marcas){             
                if(datos==undefined){
                    datos=[];
                }
                if(datos.constructor!=Array){
                    datos=[];
                }
				if(marcas==undefined){
                    marcas=[];
                }
                if(marcas.constructor!=Array){
                    marcas=[];
                }
                if(datos.length>0){
                    if(datos[0].valor==""&&datos[0].nombre==""){
                        datos=[{valor:"",nombre:"SIN OPCIONES"}];
                        //desabilitado=true;
                    }
                }else{
                    datos=[{valor:"",nombre:"SIN OPCIONES"}];
                    //desabilitado=true;
                }
                seleccionado=seleccionado==null?-1:seleccionado;
                nombre=(nombre==undefined)?id:nombre;
                var combo="<option disabled selected value=-1> - - SELECCIONA UN ELEMENTO - -</option>";
                if(datos.length>0){
                    for(var i=0;i<datos.length;i++)
                    {						
                        combo+=this.StringFormat('<option {2} {3} value="{0}">{1}</option>',[datos[i].valor,datos[i].nombre,datos[i].valor==seleccionado?'selected':'',
						(marcas.indexOf(datos[i].valor)==-1)?"":"disabled"]);
                    }
                }
				return this.StringFormat('<select required {2} class="form-control" name="{3}" {4} id="{0}">{1}</select>',[id,combo,(desabilitado)?'disabled':'',nombre,(model)?"ng-model='"+model+"'":"onchange='gen.onchange_"+nombre+"(this)'"]);
            },
            FormaLink:function(url){
                location.href=this.URLCompleta(url);
            },
            TableToArrayColumn:function(data,col){
                var array=[];
                for(var i=0;i<data.length;i++){                    
                    for(var _col in data[i]){
                        if(_col===col){
                            array.push(data[i][_col]);
                        }
                    }
                }
                return array;
            },randSTR:function(input){                
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < input; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                return text;
            }            
        };
    }]);