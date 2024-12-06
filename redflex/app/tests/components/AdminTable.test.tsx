import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import AdminTable from '@/components/ui/admin/table/AdminTable'

// Мок для MaterialCommunityIcons
jest.mock('@expo/vector-icons', () => ({
  MaterialCommunityIcons: 'MaterialCommunityIcons'
}))

const mockTableItems = [
  {
    _id: '1',
    editNavigate: jest.fn(),
    items: ['user@test.com', '2024-03-20']
  }
]

const mockRemoveHandler = jest.fn()

describe('AdminTable тесты', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('должен корректно отрендерить таблицу с данными', () => {
    const { getByText } = render(
      <AdminTable
            headerItems={['Email', 'Date']}
            tableItems={mockTableItems}
            removeHandler={mockRemoveHandler} isLoading={false}      />
    )

    expect(getByText('user@test.com')).toBeTruthy()
    expect(getByText('2024-03-20')).toBeTruthy()
  })

  it('должен вызывать removeHandler при удалении элемента', () => {
    const { getAllByTestId } = render(
      <AdminTable
            headerItems={['Email', 'Date']}
            tableItems={mockTableItems}
            removeHandler={mockRemoveHandler} isLoading={false}      />
    )

    const deleteButtons = getAllByTestId('delete-button')
    fireEvent.press(deleteButtons[0])

    expect(mockRemoveHandler).toHaveBeenCalledWith('1')
  })

  it('должен отображать индикатор загрузки', () => {
    const { getByTestId } = render(
      <AdminTable
        headerItems={['Email', 'Date']}
        tableItems={mockTableItems}
        isLoading={true}
        removeHandler={mockRemoveHandler}
      />
    )

    expect(getByTestId('loading-indicator')).toBeTruthy()
  })
}) 