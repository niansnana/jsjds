<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Role;

class AdminController extends Controller
{
    // TODO：权限管理
    public function index(Admin $admin){
        $data = Admin::orderBy('created_at','desc')->get();
        return view('admin.admin.admin',compact('data'));  // 管理员列表
    }
    public function add(Request $request){
        if($request->isMethod('GET')){
            $data = Role::get();
            return  view('admin.admin.add',compact('data'));
        }else{
            $data = $request->except('_token','file');
            $data['password'] = bcrypt($request->get('password'));
            $result = Admin::insert($data);
            return $result ? '1' : '0';
        }
    }
    public function update(Admin $admin,Request $request){
        if($request->isMethod('post')){
            $data = $request->except('_token','file');
            $result = $admin->update($data);
            return $result ? '1' : '0';
        }else{
            $data = Role::get();
            return view('admin.admin.update',compact('admin','data'));
        }
    }
    public function delete(Request $request){
        $result = Admin::find($request->get('id'))->delete();
        return $result ? '1' : '0';
    }
    public function start(Request $request){
        $result = Admin::where(['id'=>$request->get('id')])->update(['status'=>'2']);
        return $result ? '1' : '0';
    }
    public function end(Request $request){
        $result = Admin::where(['id'=>$request->get('id')])->update(['status'=>'1']);
        return $result ? '1' : '0';
    }
}
