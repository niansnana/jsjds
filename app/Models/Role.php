<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    //
    //
    protected $table = 'role';
    protected $guarded = [];

    # 将分配的权限的进行处理
    public function assignAuth($data)
    {
        // 处理auth_ids TODO: explode() 函数把字符串分割为数组；implode() 函数把数组元素组合为一个字符串。
        $post['auth_ids'] = implode(',', $data['auth_id']);
        $tmp = \App\Models\Auth::where('pid', '!=', '0')->whereIn('id', $data['auth_id'])->get();
        $ac = '';
        foreach ($tmp as $val) {
            $ac .= $val->controller . '@' . $val->action . ',';
        }
        $post['auth_ac'] = strtolower(rtrim($ac, ','));
        return self::where('id', $data['id'])->update($post);
    }
}
