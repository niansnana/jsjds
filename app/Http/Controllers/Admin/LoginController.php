<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class LoginController extends Controller
{
    // 后台首页
    public function index(){
        return view('admin.login.login');
    }
    // 登录验证
    public function check(Request $request){
        $this->validate($request,[
            'username' => 'required|min:2|max:16',
            'password' => 'required|min:4|max:16',
            'captcha' => 'required|min:5|captcha'
        ]);
        // 进行数据库验证
        $data = $request->only(['username','password']);
        $data['status'] = '2';
        $result = Auth::guard('admin')->attempt($data,$request->get('is_remember'));
        if($result){
            return redirect('admin/index');
        }else{
            return \Redirect::back()->withErrors('用户名或密码错误！');
        }
    }
    // 退出登录
    public function logout(){
        Auth::guard('admin')->logout();
        return redirect('/admin');
    }
}
