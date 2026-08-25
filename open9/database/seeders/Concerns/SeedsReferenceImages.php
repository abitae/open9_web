<?php

namespace Database\Seeders\Concerns;

trait SeedsReferenceImages
{
    /**
     * Fotografías reales de Unsplash curadas por tema tecnológico.
     *
     * @var array<string, string>
     */
    private const PHOTO_CATALOG = [
        // Infraestructura y hardware
        'datacenter' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
        'server-rack' => 'https://images.unsplash.com/photo-1544197150-0f43e44182c8',
        'network-switch' => 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e',
        'nas-storage' => 'https://images.unsplash.com/photo-1597872200969-2b65d56ff4c1',
        'workstation' => 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5',
        'ups-power' => 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e',
        'cables-rack' => 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13',

        // Cloud y DevOps
        'cloud-abstract' => 'https://images.unsplash.com/photo-1451187580455-43490279c0fa',
        'cloud-dashboard' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
        'kubernetes' => 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9',
        'devops-pipeline' => 'https://images.unsplash.com/photo-1618477388954-7852f034d369',
        'aws-region' => 'https://images.unsplash.com/photo-1544197150-0f43e44182c8',

        // Desarrollo de software
        'coding-laptop' => 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        'team-dev' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
        'react-code' => 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
        'mobile-app' => 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
        'api-architecture' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',

        // Seguridad y consultoría
        'cybersecurity' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3',
        'consulting' => 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',

        // Proyectos / casos de uso
        'erp-dashboard' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
        'ecommerce' => 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
        'analytics' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
        'automation' => 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
        'logistics' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
        'fintech' => 'https://images.unsplash.com/photo-1563986768494-4dffdc115039',
        'healthcare-tech' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
        'real-estate' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
        'restaurant' => 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
        'restaurant-service' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
        'accounting' => 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',

        // Blog
        'blog-laravel' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
        'blog-livewire' => 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
        'blog-postgres' => 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d',
        'blog-payments' => 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
        'blog-architecture' => 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
        'blog-aws' => 'https://images.unsplash.com/photo-1451187580455-43490279c0fa',
        'blog-react' => 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
        'blog-k8s' => 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9',
        'blog-ai' => 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
        'blog-security' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3',
        'blog-microservices' => 'https://images.unsplash.com/photo-1618477388954-7852f034d369',
        'blog-career' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
        'blog-monitoring' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',

        // Productos tienda
        'product-rack' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
        'product-cloud-pro' => 'https://images.unsplash.com/photo-1451187580455-43490279c0fa',
        'product-switch' => 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e',
        'product-nas' => 'https://images.unsplash.com/photo-1597872200969-2b65d56ff4c1',
        'product-devops' => 'https://images.unsplash.com/photo-1618477388954-7852f034d369',
        'product-firewall' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3',
        'product-cables' => 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13',
        'product-ups' => 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e',
        'product-aws' => 'https://images.unsplash.com/photo-1451187580455-43490279c0fa',
        'product-workstation' => 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5',

        // Servicios
        'service-consulting' => 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
        'service-cloud' => 'https://images.unsplash.com/photo-1451187580455-43490279c0fa',
        'service-web' => 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        'service-hardware' => 'https://images.unsplash.com/photo-1544197150-0f43e44182c8',
        'service-security' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3',
        'service-mobile' => 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
        'service-devops' => 'https://images.unsplash.com/photo-1618477388954-7852f034d369',
        'service-support' => 'https://images.unsplash.com/photo-1553877522-43269d4ea984',

        // Personas (testimonios)
        'person-1' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
        'person-2' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
        'person-3' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        'person-4' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
        'person-5' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
    ];

    protected function referenceImage(string $key, int $width = 1200, int $height = 675): string
    {
        $base = self::PHOTO_CATALOG[$key] ?? self::PHOTO_CATALOG['coding-laptop'];

        return "{$base}?auto=format&fit=crop&w={$width}&h={$height}&q=80";
    }

    /**
     * @return list<string>
     */
    protected function referenceGallery(string $key, int $count = 2, int $width = 800, int $height = 500): array
    {
        $gallery = [];
        for ($i = 1; $i <= $count; $i++) {
            $gallery[] = $this->referenceImage($key.'-g'.$i, $width, $height);
        }

        return $gallery;
    }

    /**
     * @param  list<string>  $paragraphs
     */
    protected function paragraphs(...$paragraphs): string
    {
        return implode("\n\n", $paragraphs);
    }
}
