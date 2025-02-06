import React, { useEffect, useState } from 'react'

import { CCard, CCardBody, CCardHeader, CCardTitle } from '@coreui/react'
import axios from 'axios'

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalTransaction, setTotalTransaction] = useState(0)
  const [totalReports, setTotalReports] = useState(0)

  useEffect(() => {
    async function fetchUsersAndVendors() {
      const token = localStorage.getItem('token')
      const users = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log()
      setTotalUsers(users.data.users.length)
      const transactions = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/transaction`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log()
      setTotalTransaction(transactions.data.transactions.length)
      const reports = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/report`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTotalReports(reports.data.reports.length)
    }
    fetchUsersAndVendors()
  }, [])

  return (
    <>
      <CCard textBgColor={'primary'} className="mb-4 mt-3" style={{ maxWidth: '18rem' }}>
        <CCardHeader>Users</CCardHeader>
        <CCardBody>
          <CCardTitle>Users: {totalUsers}</CCardTitle>
        </CCardBody>
      </CCard>
      <CCard textBgColor={'secondary'} className="mb-3" style={{ maxWidth: '18rem' }}>
        <CCardHeader>Transaction</CCardHeader>
        <CCardBody>
          <CCardTitle>Transaction: {totalTransaction} </CCardTitle>
        </CCardBody>
      </CCard>
      <CCard textBgColor={'secondary'} className="mb-3" style={{ maxWidth: '18rem' }}>
        <CCardHeader>Reports</CCardHeader>
        <CCardBody>
          <CCardTitle>Reports: {totalReports} </CCardTitle>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
