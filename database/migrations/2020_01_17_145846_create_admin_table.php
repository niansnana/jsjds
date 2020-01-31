<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admin', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('username',20);
            $table->string('password');
            $table->enum('gender',[1,2,3])->default('1');
            $table->string('mobile',11)->nullable();
            $table->string('email',50)->nullable();
            $table->tinyInteger('role_id')->nullable();
            $table->rememberToken()->nullable();
            $table->enum('status',[1,2])->default('2');
            $table->string('avatar')->nullable();
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
        Schema::dropIfExists('admin');
    }
}
