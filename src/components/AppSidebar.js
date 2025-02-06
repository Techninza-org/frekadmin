import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CCloseButton, CImage, CSidebar, CSidebarBrand, CSidebarHeader } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

// sidebar nav config
import navigation from '../nav'
import AppFooter from './AppFooter'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader>
        <CSidebarBrand to="/">
          <h3>Frek</h3>
          {/* <CIcon customClassName="sidebar-brand-full" height={32} /> */}
          {/* <CImage src={'https://res.cloudinary.com/dr4iluda9/image/upload/v1719553407/ezio_vendor/logo.svg'} height={'50px'} width={50} fluid /> */}
          {/* <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} /> */}
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <AppFooter />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
