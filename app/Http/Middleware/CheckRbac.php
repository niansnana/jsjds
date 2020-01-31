<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

class CheckRbac
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // 中间件鉴权
//        phpinfo(); # 出现信息，中间件建立成功，鉴权成功
        # TODO：正式运用中间件开始
        if(Auth::guard('admin')->user()->role_id != '1'){
            // TODO：RBAC鉴权
            # TODO：经过测试，下面获取最好，获取当前路由及方法："App\Http\Controllers\Admin\IndexController@index"
            // 获取当前用户对应的角色已经具备的权限
            $route = Route::currentRouteAction();//        dd($action);
            $ac = Auth::guard('admin')->user()->role->auth_ac;
            $ac = strtolower($ac . ',indexcontroller@index,indexcontroller@welcome');
            // 判断权限
            $routeArr = explode('\\',$route);   // 两个斜杠，为了转义
            if(strpos($ac,strtolower(end($routeArr))) === false){
                exit("你没有访问权限！");
            }
        }
        # TODO：正式运用中间件结束
        return $next($request);
    }
}
