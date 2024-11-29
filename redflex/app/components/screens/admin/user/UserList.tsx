import AdminNavigation from '@/components/ui/admin/navigation/AdminNavigation'
import Layout from '@/components/ui/layout/Layout'
import { FC } from 'react'

const UserList: FC = () => {
	return (
		<Layout>
			<AdminNavigation title='Statistics' />
		</Layout>
	)
}

export default UserList
