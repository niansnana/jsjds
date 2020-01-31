<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuthTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('auth', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('auth_name',20); # 权限名称
            $table->string('controller',40)->nullable();# 权限对应控制器
            $table->string('action',30)->nullable();    # 控制器方法
            $table->tinyInteger('pid'); # 当前权限其父级
            $table->enum('is_nav',[1,2])->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('auth');
    }
}
