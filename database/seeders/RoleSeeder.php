<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::updateOrCreate(['id' => 1], ['name' => 'admin']);
        Role::updateOrCreate(['id' => 2], ['name' => 'teacher']);
        Role::updateOrCreate(['id' => 3], ['name' => 'student']);
    }
}
