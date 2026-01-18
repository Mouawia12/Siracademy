<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $roles = ['admin', 'instructor', 'student'];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        $admin = User::firstOrCreate(
            ['email' => 'admin@siracademy.local'],
            [
                'name' => 'Admin User',
                'first_name' => 'Admin',
                'last_name' => 'User',
                'password' => Hash::make('Password123!'),
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        $admin->assignRole('admin');

        $instructor = User::firstOrCreate(
            ['email' => 'instructor@siracademy.local'],
            [
                'name' => 'Instructor User',
                'first_name' => 'Instructor',
                'last_name' => 'User',
                'password' => Hash::make('Password123!'),
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        $instructor->assignRole('instructor');

        $student = User::firstOrCreate(
            ['email' => 'student@siracademy.local'],
            [
                'name' => 'Student User',
                'first_name' => 'Student',
                'last_name' => 'User',
                'password' => Hash::make('Password123!'),
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        $student->assignRole('student');
    }
}
