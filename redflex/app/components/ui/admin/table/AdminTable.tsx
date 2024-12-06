import { FC } from 'react'
import { ScrollView, Text, View, ActivityIndicator } from 'react-native'

import Loader from '../../Loader'

import AdminTableHeader from './AdminTableHeader'
import AdminTableItem from './AdminTableItem'
import { IAdminTable } from './admin-table.interface'

const AdminTable: FC<IAdminTable> = ({
	headerItems,
	isLoading,
	removeHandler,
	tableItems = []
}) => {
	if (isLoading) {
		return <ActivityIndicator testID="loading-indicator" />
	}
	
	return (
		<ScrollView showsHorizontalScrollIndicator={false} horizontal>
			<View className='pb-6'>
				<AdminTableHeader headerItems={headerItems} />
				{tableItems?.length ? (
					<ScrollView showsVerticalScrollIndicator={false}>
						{tableItems.map(tableItem => (
							<AdminTableItem
								key={tableItem._id}
								removeHandler={() => removeHandler(tableItem._id)}
								tableItem={tableItem}
							/>
						))}
					</ScrollView>
				) : (
					<Text className='text-white text-lg'>Elements not found</Text>
				)}
			</View>
		</ScrollView>
	)
}

export default AdminTable
