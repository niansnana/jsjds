<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    # TODO：管理员信息
    public function show(Request $request){
        if($request->isMethod('get')){
            return view('admin.person.show');
        }else{
            return "test post";
        }
    }
}
