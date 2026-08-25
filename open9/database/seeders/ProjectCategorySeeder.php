<?php

namespace Database\Seeders;

use App\Models\ProjectCategory;
use Illuminate\Database\Seeder;

class ProjectCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Automatización', 'slug' => 'automatizacion', 'description' => 'Flujos, WhatsApp, RPA e integraciones que eliminan trabajo repetitivo.'],
            ['name' => 'Software a medida', 'slug' => 'software', 'description' => 'Sistemas, agendas, CRMs y paneles pensados para tu operación.'],
            ['name' => 'Comercio y pedidos', 'slug' => 'ecommerce', 'description' => 'Catálogos, delivery, inventario y conciliación de ventas.'],
            ['name' => 'Datos y dashboards', 'slug' => 'cloud-devops', 'description' => 'Indicadores en tiempo real para gerencia y operación.'],
            ['name' => 'Infraestructura', 'slug' => 'infraestructura', 'description' => 'Servidores, redes y continuidad cuando el negocio lo requiere.'],
        ];

        foreach ($categories as $index => $data) {
            ProjectCategory::query()->updateOrCreate(
                ['slug' => $data['slug']],
                $data + ['sort_order' => $index + 1, 'status' => 'active'],
            );
        }
    }
}
