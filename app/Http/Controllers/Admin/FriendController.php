<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Friend;
use App\Models\Friend_class;
class FriendController extends Controller
{
    // 友情链接
    public function index(){
        $data = Friend::get();
        return view('admin.friend.index',compact('data'));
    }
    public function add(Request $request){
        if($request->isMethod('get')){
            $data = Friend_class::get();
            return view('admin.friend.add',compact('data'));
        }else{
            $data = $request->except('_token','file');
            $data['created_at'] = date('Y-m-d H:i:s');
            $data['updated_at'] = date('Y-m-d H:i:s');
            $result = Friend::insert($data);
            return $result ? '1' : '0';
        }
    }
    public function update(Friend $friend,Request $request){
        if($request->isMethod('get')){
            $data = Friend_class::get();
            return view('admin.friend.update',compact('friend','data'));
        }else{
            // 修改
            $data = $request->except('_token','file');
            $data['updated_at'] = date('Y-m-d H:i:s');
            $result = $friend->update($data);
            return $result ? '1' : '0';
        }
    }

    public function delete(Request $request){
        $result = Friend::find($request->get('id'))->delete();
        return $result ? '1' : '0';
    }
}
