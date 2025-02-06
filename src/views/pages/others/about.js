// import React, { useEffect, useState } from 'react'
// import { AppSidebar, AppHeader } from '../../../components/index'
// import axios from 'axios'
// import { CFormTextarea } from '@coreui/react'

// export default function AboutUs() {
//     const [about, setAbout] = useState('')
//     const token = localStorage.getItem('token')

//     async function getAbout() {
//         const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/getAboutUs`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         console.log(res.data.aboutus.description, 'about');
//         setAbout(res.data.aboutus.description)
//     }

//     function handleChange(e) {
//         const { value } = e.target
//         setAbout(value)
//     }

//     async function handleSubmit(e) {
//         e.preventDefault()
//         if (!about) {
//             alert('Please fill all fields')
//             return
//         }

//         const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}admin/editAboutUs`, {description: about}, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         if (res.status === 200) {
//             alert('Updated Successfully')
//             getAbout()
//             return
//         }
//         alert('Not Updated')
//         return
//     }

//     useEffect(() => {
//         getAbout()
//     }, [])

//     return (
//         <>
//             <AppSidebar />
//             <div className="wrapper d-flex flex-column min-vh-100">
//                 <AppHeader />
//                 <div className="body flex-grow-1">
//                     <div className='mx-3'>
//                         <h4 className='mb-4'>ABOUT US</h4>
//                         <CFormTextarea value={about} onChange={handleChange} />
//                         <button type="submit" onClick={handleSubmit} className="btn btn-primary mt-4">
//                             Update
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
