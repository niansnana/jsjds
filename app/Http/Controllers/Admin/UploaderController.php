<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploaderController extends Controller
{
    // TODO：Ajax异步上传头像
    public function webuploader(Request $request){
        if($request->hasFile('file') && $request->file('file')->isValid()){
            // 有文件上传
            $file = $request->file('file');
            $fileName = sha1(time().$file->getClientOriginalName()).'.'.$file->getClientOriginalExtension();
//            dd($fileName);
            Storage::disk('public')->put($fileName,file_get_contents($request->file('file')->path()));
            // 返回数据
            $result = [
                'errCode' => '0',
                'errMsg' => '',
                'succMsg' => '',
                'path' => '/storage/'.$fileName,
            ];
            return response()->json($result);
        }else{
            // 没有文件上传 || 出错
            $result = [
                'errCode' => '000001',
                'errMsg' => $request->file('file')->getErrorMessage()
            ];
            return response()->json($result);
        }
    }

    // TODO：你牛我牛七牛牛
    public function qiniu(Request $request){
        if($request->hasFile('file') && $request->file('file')->isValid()){
            // 有文件上传
            $file = $request->file('file');
            $fileName = sha1(time().$file->getClientOriginalName()).'.'.$file->getClientOriginalExtension();
//            dd($fileName);
            Storage::disk('qiniu')->put($fileName,file_get_contents($request->file('file')->path()));
            // 返回数据
            $result = [
                'errCode' => '0',
                'errMsg' => '',
                'succMsg' => '',
                'path' => Storage::disk('qiniu')->getDriver()->downloadUrl($fileName),
            ];
            return response()->json($result);
        }else{
            // 没有文件上传 || 出错
            $result = [
                'errCode' => '000001',
                'errMsg' => $request->file('file')->getErrorMessage()
            ];
            return response()->json($result);
        }
    }
}
