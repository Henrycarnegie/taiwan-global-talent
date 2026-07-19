import CourseCategoryCard from '../Components/CourseCategoryCard';
import Layout from '../Layout';

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    icon?: string | null;
    instructor?: string | null;
    duration?: string | null;
    price: number;
}

export default function Index({ categories }: { categories: Category[] }) {
    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-6">Pilih Kategori Kursus</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <CourseCategoryCard key={cat.id} category={cat} />
                ))}
            </div>
        </Layout>
    );
}