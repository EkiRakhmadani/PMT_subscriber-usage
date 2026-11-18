<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Subscriber;

class SubscriberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subscribers = [
            ['id' => 'SUB01', 'name' => 'Amir', 'plan' => 'Basic', 'activation_date' => '2023-01-12'],
            ['id' => 'SUB02', 'name' => 'Sari', 'plan' => 'Premium', 'activation_date' => '2022-05-03'],
            ['id' => 'SUB03', 'name' => 'Budi', 'plan' => 'Basic', 'activation_date' => '2024-09-20'],
            ['id' => 'SUB04', 'name' => 'Dewi', 'plan' => 'Family', 'activation_date' => '2021-02-15'],
            ['id' => 'SUB05', 'name' => 'Rian', 'plan' => 'Premium', 'activation_date' => '2023-08-08'],
            ['id' => 'SUB06', 'name' => 'Nia', 'plan' => 'Basic', 'activation_date' => '2024-11-30'],
        ];

        foreach ($subscribers as $sub) {
            Subscriber::updateOrCreate(['id' => $sub['id']], $sub);
        }
    }
}
