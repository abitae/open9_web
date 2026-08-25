<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectCategory;
use Database\Seeders\Concerns\SeedsReferenceImages;
use Illuminate\Database\Seeder;

class ProjectsCatalogSeeder extends Seeder
{
    use SeedsReferenceImages;

    public function run(): void
    {
        $categories = ProjectCategory::query()->get()->keyBy('slug');

        $projects = [
            [
                'title' => 'Leads y visitas para Inmobiliaria Norte',
                'slug' => 'leads-visitas-inmobiliaria-norte',
                'category' => 'automatizacion',
                'client' => 'Inmobiliaria Norte',
                'short' => 'WhatsApp, CRM y recordatorios automáticos para no perder una consulta de departamento o lote.',
                'description' => $this->paragraphs(
                    'El equipo comercial respondía mensajes a deshoras y las visitas se confirmaban por llamadas sueltas. Perdían leads en el fin de semana.',
                    'Conectamos WhatsApp Business con un CRM ligero: cada consulta crea una ficha, un agente responde horarios y precios, y un humano toma las visitas calificadas.',
                    'En 60 días subió 38% la tasa de visitas concretadas y el tiempo de primera respuesta bajó de horas a menos de 3 minutos.',
                ),
                'stack' => ['WhatsApp API', 'Laravel', 'n8n', 'PostgreSQL'],
                'image' => 'real-estate',
                'featured' => true,
                'months_ago_start' => 9,
                'months_ago_end' => 6,
            ],
            [
                'title' => 'Pedidos y cocina para Sabores del Sur',
                'slug' => 'pedidos-cocina-sabores-del-sur',
                'category' => 'automatizacion',
                'client' => 'Sabores del Sur',
                'short' => 'Pedidos por WhatsApp, comanda digital y cierre de caja sin planillas a medianoche.',
                'description' => $this->paragraphs(
                    'El restaurante tomaba pedidos por chat, los anotaba en papel y armaba el reporte de ventas a mano. Había errores de cocina y de caja.',
                    'Armamos un flujo: el cliente pide por WhatsApp, la cocina ve la comanda en pantalla y el cierre del día sale solo con medios de pago separados.',
                    'Redujeron 2 horas diarias de trabajo administrativo y bajaron a casi cero los pedidos extraviados en hora punta.',
                ),
                'stack' => ['WhatsApp API', 'Laravel', 'React', 'PostgreSQL'],
                'image' => 'restaurant',
                'featured' => true,
                'months_ago_start' => 8,
                'months_ago_end' => 5,
            ],
            [
                'title' => 'Agenda inteligente para Clínica San Martín',
                'slug' => 'agenda-inteligente-clinica-san-martin',
                'category' => 'software',
                'client' => 'Clínica San Martín',
                'short' => 'Citas, recordatorios y reprogramación automática para bajar inasistencias.',
                'description' => $this->paragraphs(
                    'La recepción saturaba el teléfono confirmando citas. Un 22% de pacientes no llegaba y el hueco no se rellenaba a tiempo.',
                    'Implementamos agenda en línea, recordatorios por WhatsApp 24 horas y 2 horas antes, y una lista de espera que ocupa cupos liberados.',
                    'Las inasistencias bajaron a 9% y recepción recuperó tiempo para atención presencial, no para perseguir confirmaciones.',
                ),
                'stack' => ['Laravel', 'React', 'WhatsApp API', 'PostgreSQL'],
                'image' => 'healthcare-tech',
                'featured' => true,
                'months_ago_start' => 11,
                'months_ago_end' => 7,
            ],
            [
                'title' => 'Stock y ventas para Comercio Andes',
                'slug' => 'stock-ventas-comercio-andes',
                'category' => 'ecommerce',
                'client' => 'Comercio Andes',
                'short' => 'Catálogo, inventario y conciliación de ventas en tienda física y canal digital.',
                'description' => $this->paragraphs(
                    'Vendían por Instagram, WhatsApp y mostrador. El stock se desfasaba y nadie sabía qué producto realmente dejaba margen.',
                    'Unificamos catálogo, descuento de stock en cada venta y un dashboard diario de lo más vendido, lo parado y la caja.',
                    'Dejaron de vender productos sin stock y el dueño ve el día anterior resuelto a las 9:00, no el domingo en Excel.',
                ),
                'stack' => ['Laravel', 'React', 'PostgreSQL', 'Mercado Pago'],
                'image' => 'ecommerce',
                'featured' => true,
                'months_ago_start' => 10,
                'months_ago_end' => 6,
            ],
            [
                'title' => 'Documentos y conciliación para Contable Plus',
                'slug' => 'documentos-conciliacion-contable-plus',
                'category' => 'automatizacion',
                'client' => 'Estudio Contable Plus',
                'short' => 'Recolección de comprobantes, recordatorios a clientes y tablero de declaraciones.',
                'description' => $this->paragraphs(
                    'El estudio perseguía a 80 clientes por correo pidiendo PDFs. Cerraban declaraciones con estrés y horas extra.',
                    'Cada cliente tiene un enlace para subir comprobantes. Un agente recuerda fechas y el contador ve quién está incompleto.',
                    'Recortaron 12 horas semanales de seguimiento y bajó el número de declaraciones enviadas el último día hábil.',
                ),
                'stack' => ['Laravel', 'n8n', 'PostgreSQL', 'Google Drive'],
                'image' => 'accounting',
                'featured' => false,
                'months_ago_start' => 7,
                'months_ago_end' => 4,
            ],
            [
                'title' => 'Agente de ventas para Urban Homes',
                'slug' => 'agente-ventas-urban-homes',
                'category' => 'software',
                'client' => 'Urban Homes',
                'short' => 'Agente de IA que califica compradores y agenda visitas según presupuesto y distrito.',
                'description' => $this->paragraphs(
                    'Los asesores contestaban las mismas 15 preguntas: metraje, financiamiento, horarios de sala de ventas.',
                    'Entrenamos un agente con el inventario real. Filtra por presupuesto y deja en el CRM solo a quienes quieren visitar.',
                    'Los asesores dedican la jornada a cerrar, no a copiar y pegar fichas técnicas en WhatsApp.',
                ),
                'stack' => ['Laravel', 'OpenAI', 'WhatsApp API', 'React'],
                'image' => 'blog-ai',
                'featured' => false,
                'months_ago_start' => 6,
                'months_ago_end' => 3,
            ],
            [
                'title' => 'Dashboard gerencial para Red de Clínicas Pacífico',
                'slug' => 'dashboard-gerencial-clinicas-pacifico',
                'category' => 'cloud-devops',
                'client' => 'Red de Clínicas Pacífico',
                'short' => 'Panel único de ocupación, caja y no-shows en tres sedes.',
                'description' => $this->paragraphs(
                    'Cada sede tenía su Excel. Gerencia se enteraba de la ocupación con una semana de retraso.',
                    'Consolidamos citas, caja y especialidades en un dashboard que se actualiza cada 15 minutos.',
                    'Hoy reasignan médicos y horarios la misma semana, no al mes siguiente.',
                ),
                'stack' => ['Laravel', 'React', 'PostgreSQL', 'Metabase'],
                'image' => 'analytics',
                'featured' => false,
                'months_ago_start' => 8,
                'months_ago_end' => 5,
            ],
            [
                'title' => 'Reservas y delivery para Grupo Brasa',
                'slug' => 'reservas-delivery-grupo-brasa',
                'category' => 'ecommerce',
                'client' => 'Grupo Brasa',
                'short' => 'Reservas, delivery propio y reporte de platos estrella en tres locales.',
                'description' => $this->paragraphs(
                    'Las reservas se duplicaban entre Instagram y el teléfono. El delivery se coordinaba por un chat de 14 personas.',
                    'Centralizamos reservas, un canal de delivery con estados y un ranking diario de platos y horarios pico.',
                    'Bajaron las mesas vacías por no-show y cocina deja de preparar de más en los valles de demanda.',
                ),
                'stack' => ['Laravel', 'React Native', 'PostgreSQL', 'WhatsApp API'],
                'image' => 'restaurant-service',
                'featured' => false,
                'months_ago_start' => 5,
                'months_ago_end' => 2,
            ],
        ];

        foreach ($projects as $index => $data) {
            $category = $categories->get($data['category']) ?? $categories->first();

            Project::query()->updateOrCreate(
                ['slug' => $data['slug']],
                [
                    'project_category_id' => $category->id,
                    'title' => $data['title'],
                    'short_description' => $data['short'],
                    'description' => $data['description'],
                    'client_name' => $data['client'],
                    'technology_stack' => $data['stack'],
                    'main_image' => $this->referenceImage($data['image'], 1200, 675),
                    'gallery' => [
                        $this->referenceImage($data['image'], 800, 500),
                        $this->referenceImage('team-dev', 800, 500),
                    ],
                    'project_url' => 'https://open9.dev/proyectos/'.$data['slug'],
                    'start_date' => now()->subMonths($data['months_ago_start']),
                    'end_date' => now()->subMonths($data['months_ago_end']),
                    'status' => 'published',
                    'is_featured' => $data['featured'],
                    'views_count' => 180 + ($index * 42),
                    'seo_title' => $data['title'].' | OPEN9',
                    'seo_description' => $data['short'],
                    'seo_keywords' => implode(', ', array_slice($data['stack'], 0, 4)).', open9, automatización',
                    'published_at' => now()->subMonths($data['months_ago_end'])->subWeeks(2),
                ],
            );
        }

        $validSlugs = collect($projects)->pluck('slug')->all();
        Project::query()
            ->whereNotIn('slug', $validSlugs)
            ->update(['status' => 'draft', 'is_featured' => false]);
    }
}
