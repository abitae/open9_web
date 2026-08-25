<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use Illuminate\Database\Seeder;

class BlogCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Automatización', 'slug' => 'automatizacion', 'description' => 'Procesos, flujos y casos reales de empresas que dejaron de trabajar a mano.'],
            ['name' => 'Inteligencia artificial', 'slug' => 'ia', 'description' => 'Agentes, chatbots y usos prácticos de IA en negocios peruanos.'],
            ['name' => 'Operación', 'slug' => 'operacion', 'description' => 'Dashboards, integraciones y el día a día de inmobiliarias, clínicas, restaurantes y comercios.'],
            ['name' => 'Desarrollo', 'slug' => 'desarrollo', 'description' => 'Software a medida, APIs y buenas prácticas de producto.'],
            ['name' => 'Cloud', 'slug' => 'cloud', 'description' => 'AWS, Azure, Google Cloud y arquitectura híbrida.'],
            ['name' => 'Seguridad', 'slug' => 'seguridad', 'description' => 'Ciberseguridad, cumplimiento y protección de datos.'],
        ];

        foreach ($categories as $index => $data) {
            BlogCategory::query()->updateOrCreate(
                ['slug' => $data['slug']],
                $data + ['sort_order' => $index + 1, 'status' => 'active'],
            );
        }
    }
}
