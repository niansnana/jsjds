<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Auth;
use DB;

class RoleController extends Controller
{
    // TODO：角色管理(增删改查)
    public function index(){
        $data = Role::get();
        return view('admin.role.index',compact('data'));
    }
    public function add(Request $request){
        if($request->isMethod('GET')){
            return view('admin.role.add');
        }else{
            $data = $request->except('_token');
            $result = Role::insert($data);
            return $result ? '1' : '0';
        }
    }
    public function update(Request $request,Role $role){
        if($request->isMethod('get')){
            return view('admin.role.update',compact('role'));
        }else{
            $data = $request->except('_token');
//            $result = Role::updated($data);
            $result = $role->update($data);
//            dd($result);
            return $result ? '1' : '0';
        }
    }
    public function delete(Request $request){
        $result = Role::find($request->get('id'))->delete();
        return $result ? '1' : '0';
    }
    # 权限分配
    public function assign(Request $request){
        if($request->isMethod('POST')){
            $data = $request->only(['id','auth_id']);
            $role = new Role();
            $result = $role->assignAuth($data);
            return $result;
        }else{
            // 查询一级权限
            $top = Auth::where('pid','0')->get();
            // 查询二级权限
            $cat = Auth::where('pid','!=','0')->get();
            // 获取当前角色具备的权限id集合
            $ids = Role::where('id',$request->get('id'))->value('auth_ids');
            // 展示视图
            return view('admin.role.assign',compact('top','cat','ids'));
        }
    }
}
