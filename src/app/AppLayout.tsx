import { Outlet } from 'react-router-dom';
import Layout from '../components/common/Layout';
const AppLayout = () => (
    <Layout>
        <Outlet />
    </Layout>
);

export default AppLayout;