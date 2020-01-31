<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Friend_class;

class FriendClassController extends Controller
{
    //
    public function index(){
        $data = Friend_class::get();
        return view('admin.friend_class.index',compact('data'));
    }
    public function add(Request $request){
        if($request->isMethod('get')){
            return view('admin.friend_class.add');
        }else{
            $data = $request->except('_token');
            $result = Friend_class::insert($data);
            return $result ? '1' : '0';
        }
    }
    public function update(Request $request,Friend_class $id){
        if($request->isMethod('get')){
            return view('admin.friend_class.update',compact('id'));
        }else{
            $data = $request->except('_token');
            $result = $id->update($data);
            return $result ? '1' : '0';
        }
    }
    public function delete(Request $request){
        $result = Friend_class::find($request->get('id'))->delete();
        return $result ? '1' : '0';
    }
}
