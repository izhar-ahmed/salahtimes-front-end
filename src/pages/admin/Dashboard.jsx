import { Link } from 'react-router-dom';
import useDashboard from "@/hooks/admin/Dashboard/useDashboard";

const Dashboard = () => {
    const { dashboardData, loading, error, userName } = useDashboard();

    const renderDashboardCard = (title, count, linkTo) => (
        <Link to={linkTo} className="bg-indigo-600 text-white p-4 rounded-md min-h-32 flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-semibold">{loading ? 'Loading...' : title}</h2>
                <p className="text-3xl font-bold">{loading ? '0' : count}</p>
            </div>
            <span className="text-sm hover:underline hover:decoration-solid">Go to {title}</span>
        </Link>
    );

    if (loading) {
        return (
            <>
                <div>
                    <h1 className='text-2xl mb-4'>Welcome, {userName}</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {renderDashboardCard('Users', 0, '/m-admin/users')}
                    {renderDashboardCard('Masjids', 0, '/m-admin/masjid')}
                </div>
            </>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!dashboardData) {
        return <div>No data available</div>;
    }

    return (
        <>
            <div>
                <h1 className='text-2xl mb-4'>Welcome, {userName}</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {renderDashboardCard('Users', dashboardData.userCount, '/m-admin/users')}
                {renderDashboardCard('Masjids', dashboardData.masjidCount, '/m-admin/masjid')}
            </div>
        </>
    );
};

export default Dashboard;
