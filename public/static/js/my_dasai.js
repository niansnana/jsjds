lanqiaoControllers.controller('mydasaiCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
		$scope.applyItems;
		$scope.imagesURL=  "/api/action/oss/getImageStream/";
		//$scope.fileURL = $URL_THIRDINTERFACE+"/api/action/oss/getfileurl/";
		$scope.fileURL = +"/api/action/oss/getFileStream/";
		 $scope.init=function(){
			 $http.post(
                "/api/action/timeaxis/personalProvinceApply").success(function(res){
                	if(res.resultCode===0){
                		console.log(res.resultData);
                		$scope.auth=res.resultData.authDTO;
                		if($scope.auth!=null){
							$scope.auth.identityPhotoStr=$URL_THIRDINTERFACE+"/api/action/oss/getImageStream/"+$scope.auth.identityPhoto;
							$scope.educationList =$scope.auth.educationList[0];
							if($scope.educationList!=undefined){
								if($scope.auth.educationList) {
									
									$scope.educationList.educationImageStr=$URL_THIRDINTERFACE+"/api/action/oss/getImageStream/"+$scope.educationList.educationImage;
									showUniversitieName($scope,$scope.educationList.univCode,"educationList.univCode");
									showEducationType($scope,$scope.educationList.educationTypeId,"educationList.educationTypeId");
									$scope.educationList.educationEndDateStr=showTimeStr(new Date(($scope.educationList.educationEndDate+"").replace(/-/g,"/")).getTime(),'Y-m-d');
									$scope.educationList.educationStartDateStr=showTimeStr(new Date(($scope.educationList.educationStartDate+"").replace(/-/g,"/")).getTime(),'Y-m-d');
								}
							}
							showIdentityCertificateType($scope,$scope.auth.identityCertificateType,"auth.identityCertificateType");
						}
                		$scope.applyItems=new Array();
                		var personalApply = res.resultData.lanqiaobeiPersonalApply;
                		if(personalApply!=undefined&&personalApply!=null){
                			personalApply.tab_title = personalApply.itemName;
                			$scope.applyItems.push(personalApply);
                		}
                		var designpersonalApply = res.resultData.personalDesignApplylist;
                		if(designpersonalApply!=undefined&&designpersonalApply.length>0){
                			for(design in designpersonalApply){
                				designpersonalApply[design].tab_title = designpersonalApply[design].itemName;
                				$scope.applyItems.push(designpersonalApply[design]);
                			}
                		}
                		var prelimApplys=res.resultData.prelimApplys;
                		if(prelimApplys&&prelimApplys.length>0){
                			var prelimItem={
                					tab_title:"软件类校内模拟赛",
                					prelim:true
                			};    
                			$scope.applyItems.push(prelimItem);
                		}
                		//设计团队赛
                		var dyteam=res.resultData.dyteam;
                		if(dyteam&&dyteam.length>0){
                			for(var k=0;k<dyteam.length;k++){
                				if(dyteam[k].dyTeamId){
                					var dyteamItem={
                        					tab_title:dyteam[k].dyTeamName,
                        					dyteam:true,
                        					dyTeamId:dyteam[k].dyTeamId,
                        					dyTeamApplyId:dyteam[k].dyTeamApplyId
                        			};    
                				}else{
                					var dyteamItem={
                        					tab_title:"设计视频类团队赛",
                        					dyteam:true,
                        					dyTeamApplyId:dyteam[k].dyTeamApplyId
                        			};    
                				}
                    			$scope.applyItems.push(dyteamItem);
                			}
                			
                		}
                		$scope.teamApplyList = res.resultData.teamApplyList;
						var team_tab = res.resultData.memberListState;
						if($scope.teamApplyList!=undefined&&$scope.teamApplyList.length>0){
							$scope.tab_teams;
							if(team_tab!=undefined&&team_tab!=null&&team_tab.length>0){
								$scope.tab_teams=res.resultData.memberListState;
								$("#teammember2").removeClass('hide');
								for (var i = 0; i < $scope.tab_teams.length; i++) {
									$scope.tab_teams[i].opusImageStr =  "/api/action/oss/getImageStream/" + $scope.tab_teams[i].opusImage;
									$scope.tab_teams[i].tab_title = $scope.tab_teams[i].matchCategory+$scope.tab_teams[i].itemName
									$scope.applyItems.push($scope.tab_teams[i]);
								}
							}else{
								$scope.tab_teams='团队赛';
								$scope.teamApplyList[0].tab_title = "团队赛";
								$scope.applyItems.push($scope.teamApplyList[0]);
							}
						}
						
						if($scope.applyItems.length==0){
							$("#applyItems").fadeOut(200);
							$("#dasaiapplyYstate1").fadeIn(200);
						}
						if($scope.applyItems.length%4==0 || $scope.applyItems.length%7==0){
							$(".bmSubjects").addClass("bmSub");
							$(".bmSubjects .bmBox:nth-child(5n)").css("margin-left","0px");							
						}
						if($scope.applyItems.length%3==0 || $scope.applyItems.length%5==0){
							$(".bmSubjects").removeClass("bmSub");
							$(".bmSubjects .bmBox:nth-child(4n)").css("margin-left","0px");							
						}
						
						
                	}else{
                	}
			});
		 }
		 $scope.showpage=function(){
			 $scope.init();
			 $("#applyItems").fadeIn(200);
			 $("#dasaiapplyinfo1").fadeIn(200);
			
		 }
		 $scope.showpage();
		 $scope.loaction_to=function(obj){
			 if(undefined!=obj.personalApplyId&&null!=obj.personalApplyId){
				 if(undefined!=obj.itemGroupId&&null!=obj.itemGroupId){
					 location.href="/pages/dasai/personal_my_dasai_detail.html?data_val="+obj.personalApplyId;
				 }else{
					 location.href="/pages/dasai/design_my_dasai_detail.html?data_val="+obj.personalApplyId;
				 }
			 }else if(undefined!=obj.teamApplyId&&null!=obj.teamApplyId){
				 location.href="/pages/dasai/teamapply_my_dasai_detail.html?data_val="+obj.teamApplyId;
			 }else if(undefined!=obj.teamId&&null!=obj.teamId){
				 location.href="/pages/dasai/team_my_dasai_detail.html?data_val="+obj.teamId;
			 }else if(obj.prelim){
				 location.href="/api/prelimApply/page/match";
			 }else if(obj.dyteam){
				 if(obj.dyTeamId){ //是否已加入团队
					 location.href="/pages/dasai/dyteam/dy_team_my_dasai_detail.html?t=1"+"&dyTeamId="+obj.dyTeamId;
				 }else{
					 location.href="/pages/dasai/dyteam/dy_team_my_dasai_detail.html?data_val="+obj.dyTeamApplyId+"&t=0";
				 }
			 }
			 else{
				 showAlert(0,"参数不合法");
				 return false;
			 }
			 
		 }
	}
]);

