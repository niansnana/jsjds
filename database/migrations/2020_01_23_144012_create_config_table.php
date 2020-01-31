<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConfigTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('config', function (Blueprint $table) {
            // 系统表
            $table->bigIncrements('id');
            $table->string('site_name');# 网站名称
            $table->string('site_url');# 网站地址
            $table->string('avatar');# 网站logo
            $table->string('site_keywords')->nullable();# 网站关键词
            $table->string('site_description')->nullable();# 网站描述
            $table->string('site_copy');# 网站底部版权信息
            $table->string('site_record'); // 网站备案号

            $table->string('company_name')->nullable();# 主办单位
            $table->string('company_address')->nullable();# 地址
            $table->string('company_fax')->nullable();# 传真
            $table->string('company_phone')->nullable();# 电话
            $table->string('company_email')->nullable();# 邮箱
            $table->string('company_contact')->nullable();# 合作联系方式
            $table->string('company_skill')->nullable();# 技术支持



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
        Schema::dropIfExists('config');
    }
}
