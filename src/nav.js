import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilDrop, cilPencil, cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'
import { Link } from 'react-router-dom'

const nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Users',
  },
  {
    component: CNavItem,
    name: 'All Users',
    to: '/users',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Transaction History',
  },
  {
    component: CNavItem,
    name: 'Transaction History',
    to: '/vendors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Report',
  },
  {
    component: CNavItem,
    name: 'Reports',
    to: '/report',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'SuperLikes',
  },
  {
    component: CNavItem,
    name: 'SuperLikes',
    to: '/superlikes',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
]

export default nav
