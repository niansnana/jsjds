<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable;

class Admin extends Model implements \Illuminate\Contracts\Auth\Authenticatable
{
    // 管理员表
    protected $table = 'admin';
    protected $guarded = [];
    use Authenticatable;

    public function role(){
        return $this->hasOne('\App\Models\Role','id','role_id');
    }
}
