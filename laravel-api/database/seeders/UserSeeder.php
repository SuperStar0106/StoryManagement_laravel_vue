<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name'     => 'admin',
            'email'    => 'admin@example.com',
            'password' => 'secret',
            'role'     => 'admin',
        ]);

        User::create([
            'name'     => 'user',
            'email'    => 'user@example.com',
            'password' => 'secret',
            'role'     => 'user',
        ]);

    }
}
