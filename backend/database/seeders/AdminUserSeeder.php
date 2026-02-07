<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Create a default admin user for Open9 panel.
     * Login with email (frontend sends as "username") and password.
     * Create a default admin user for Open9 panel.
     * Login with email (frontend sends as "username") and password.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'abel.arana@hotmail.com'],
            [
                'name' => 'Abel Arana',
                'password' => Hash::make('lobomalo123'),
            ]
        );
    }
}
