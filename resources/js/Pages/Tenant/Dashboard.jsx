import DashboardCard from '@/Template/Components/DashboardCard';
import AuthenticatedLayout from '@/Template/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className='pt-2'>
                <div className="row mt-2">
                    {stats && stats.map((item, index) => (
                        <DashboardCard title={item.title} icon={item.icon} items={item.items}/>
                    ))}
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
