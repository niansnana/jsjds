<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Config;

class SystemController extends Controller
{
    // 系统设置
    public function index(Config $system,Request $request){
        if($request->isMethod('get')){
            return view('admin.system.index',compact('system'));
        }else{
            $data = $request->except('_token','file');
            $result = $system->update($data);
            return $result ? '1' : '0';
        }
    }
}
