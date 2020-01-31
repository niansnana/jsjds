lanqiaoControllers.directive("pagination",function(){
    return {
        restrict: 'C',
        scope:true,
        link: function (scope, elm, attrs) {
            //console.log(scope)
          
           scope.refreshPage=function(newVal){
                var pageCount=attrs.pagecount;
               var pageNum=newVal;
               if(!pageCount||!pageNum){
                   //未检测到正常的分页数据
                   return;
               }

                //以下是页面计算(主要算中间什么时候用省略号,不需要了解具体算法,请略过).
               var $this=$(elm);
               var $pul= $this.find("ul");
               if($pul.length==0){//自动创建ul
                    $this.append("<ul></ul>");
                    $pul= $this.find("ul");
               }
               var pageli=new Array();
               if(pageCount<=5){
                   for(var i=1;i<=pageCount;i++){
                       if(i!=pageNum){
                            pageli.push({no:i});
                        }else{
                            pageli.push({no:i,disable:true});
                        }
                   }
               }else{
                   if(1!=pageNum){
                        pageli.push({no:1});
                    }else{
                        pageli.push({no:1,disable:true});
                    }
                   for(var i=2;i<pageCount;i++){
                       if(!(Math.abs(i-pageNum)<=2||(pageNum<=4&&i<6)|| (pageNum>=pageCount-3&&i>pageCount-5))){
                           if(!pageli[pageli.length-1].disable){
                                 pageli.push({no:"...",disable:"dot"});
                             }
                            continue;
                       }
                       if(i!=pageNum){
                            pageli.push({no:i});
                        }else{
                            pageli.push({no:i,disable:true});
                        }
                   }
                   if(pageCount!=pageNum){
                        pageli.push({no:pageCount});
                    }else{
                        pageli.push({no:pageCount,disable:true});
                    }
               }
                //算完了,开始绘制
               $pul.html("");
               if(pageNum==1){
                   $('<li class="prev"><a href="javascript:void(0);">&laquo;</a></li>').appendTo($pul);
               }else{
                   $('<li class="prev"><a href="javascript:void(0);" pageNum="'+(pageNum-1)+'">&laquo;</a></li>').appendTo($pul);
               }
               for(var i=0;i<pageli.length;i++){
                   var page=pageli[i];
                   if(page.disable=="dot"){
                       $('<li><span>'+page.no+'</span></li>').appendTo($pul);
                   }else if(page.disable){
                       $('<li class="current"><a class="current" href="javascript:void(0);">'+page.no+'</a></li>').appendTo($pul);
                   }else{
                       $('<li><a href="javascript:void(0);" pageNum="'+page.no+'">'+page.no+'</a></li>').appendTo($pul);
                   }
               }
               if(pageNum==pageCount){
                   $('<li><a href="javascript:void(0);">&raquo;</a></li>').appendTo($(".pagination ul"));
               }else{
                   $('<li><a href="javascript:void(0);" pageNum="'+(parseInt(pageNum)+1)+'">&raquo;</a></li>').appendTo($pul);
               }
                $pul.find("a[pageNum]").click(function(){
                    //找到对应的form
                    var forform=$(this).parents(".pagination").attr("forform");

                    var $form;
                    if(forform){
                        $form=$(forform);
                    }
                    if(!$form||$form.length==0){
                        $form=$(this).parents("form");
                    }
                    if(!$form||$form.length==0){
                        //实在找不到了
                        return ;   
                    }
                    //直接改变表单中的值,具体值由对应的Ctrl自己watch
                    //$form.find("input[name='pageNum']").val($(this).attr("pageNum")||$(this).text()); 
                    var $otherScope= angular.element($form.find("input[name='pageNo']")).scope();

                    $otherScope.pageNo=$(this).attr("pageNum")||$(this).text();
                    $otherScope.$apply();
                    try{
                        $form.parent().scope().searchList();//尝试执行查询
                    }catch(e){
                        console.log('$("div[ng-view]").scope().seach()');
                    }
                });
            };
            
             scope.$watch("pageNo", scope.refreshPage);

        }
    }
});