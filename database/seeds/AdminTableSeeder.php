<?php

use Illuminate\Database\Seeder;

class AdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // 数据填充管理员
        $faker = \Faker\Factory::create('zh_CN');
        for($i=0;$i<100;$i++){
            $data[] = [
                'username' => $faker->userName,
                'password' => bcrypt('admin'),
                'gender' => rand(1,3),
                'mobile' => $faker->phoneNumber,
                'email' => $faker->email,
                'role_id' => rand(1,6),
                'status' => rand(1,2),
                'avatar' => '/static/images/avatar.jpg',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ];
        }
        DB::table('admin')->insert($data);
    }
}
