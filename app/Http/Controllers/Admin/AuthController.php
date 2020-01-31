<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Auth;
use DB;
class AuthController extends Controller
{
    // TODO：权限管理
    public function index(){
        $data = DB::table('auth as t1')->select('t1.*','t2.auth_name as parent_name')->leftJoin('auth as t2','t1.pid','=','t2.id')->get();
        return view('admin.auth.index',compact('data'));
    }
    public function add(Request $request){
        if($request->isMethod('get')){
            $parents = Auth::where('pid','=','0')->get();
            return view('admin.auth.add',compact('parents'));
        }else{
            $data = $request->except('_token');
            $result = Auth::insert($data);
            return $result ? '1' : '0';
        }
    }
    public function update(Request $request,Auth $id){
        if($request->isMethod('get')){
            $parents = Auth::where('pid','=','0')->get();
            return view('admin.auth.update',compact('parents','id'));
        }else{
            $data = $request->except('_token');
            $result = $id->update($data);
            return $result ? '1' : '0';
        }
    }
    public function delete(Request $request){
        $result = Auth::find($request->get('id'))->delete();
        return $result ? '1' : '0';
    }
}
