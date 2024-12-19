import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import CIcon from '@coreui/icons-react'
import { cilPaperPlane, cilToggleOn, cilTrash } from '@coreui/icons'
import { AppSidebar, AppHeader } from '../../../components/Index'

const AllUsers = () => {
  const [services, setServices] = useState([])
  const token = localStorage.getItem('token')
  async function getUsers() {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const ser = res.data.users
    setServices(ser)
  }

  async function handleSwitch(id) {
    const confirmed = confirm('Confirm to switch?')
    if (confirmed) {
      const token = localStorage.getItem('token')
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}admin/user/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (res.status === 200) {
        getUsers()
      }
    } else {
      return
    }
  }

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        size: 150,
      },
      {
        header: 'Email',
        accessorKey: 'email',
        size: 150,
      },
      {
        header: 'Dob',
        accessorKey: 'dob',
        size: 150,
      },
      {
        header: 'Active',
        size: 60,
        accessorFn: (dataRow) => (dataRow.active ? 'true' : 'false'),
      },

      {
        header: 'Switch Active',
        size: 60,
        accessorFn: (dataRow) => (
          <CIcon
            icon={cilToggleOn}
            size="xl"
            onClick={() => handleSwitch(dataRow._id)}
            style={{ cursor: 'pointer', color: 'black', width: '40px', height: '40px' }}
          />
        ),
      },
    ],
    [],
  )

  useEffect(() => {
    getUsers()
  }, [])

  const table = useMantineReactTable({
    columns,
    data: services,
    enableRowSelection: false,
    enableColumnOrdering: false,
    enableGlobalFilter: true,
    enableFullScreenToggle: false,
    initialState: { density: 'xs' },
  })

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="mx-3 mb-2">
            <h4 className="mb-2">ALL USERS</h4>
            <MantineReactTable table={table} />
          </div>
        </div>
      </div>
    </>
  )
}
export default AllUsers
