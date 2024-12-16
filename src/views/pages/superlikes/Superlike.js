import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AppHeader, AppSidebar } from '../../../components'

const SuperLike = () => {
  const [input1, setInput1] = useState('') // price
  const [input2, setInput2] = useState('') // superlikes
  const [dbConstantKey, setDbConstantKey] = useState('') // Input for the key
  const [dbConstantValue, setDbConstantValue] = useState('') // Input for the value
  const [dbConstants, setDbConstants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [packages, setPackages] = useState([])

  const token = localStorage.getItem('token')

  // Fetch all packages on component mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/getAllPackages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPackages(response.data.packages)
      } catch (err) {
        console.error('Error fetching packages:', err)
        setError('Error fetching packages!')
      }
    }
    fetchPackages()
  }, [token])

  const handleDbConstantSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)

    if (!dbConstantKey || !dbConstantValue) {
      setError('Key and value are required.')
      setLoading(false)
      return
    }

    const dataToSend = {
      key: dbConstantKey,
      value: dbConstantValue,
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}admin/setDbConstant`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )

      const updatedConstant = response.data.constant.perSuperLikePrice
      setDbConstants((prev) => {
        const index = prev.findIndex((item) => item.key === updatedConstant.key)
        if (index !== -1) {
          // Update existing constant
          const updatedConstants = [...prev]
          updatedConstants[index] = updatedConstant
          return updatedConstants
        }
        return [...prev, updatedConstant]
      })

      setSuccess('Constant set successfully')
    } catch (err) {
      console.error('Error setting DB constant:', err)
      setError('Failed to set DB constant')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    const price = parseFloat(input1)
    const superlikes = parseInt(input2)

    if (isNaN(price) || isNaN(superlikes)) {
      setError('Both Price and Superlikes must be valid numbers')
      setLoading(false)
      return
    }

    const dataToSend = { price, superlikes }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}admin/createPackage`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )

      setPackages((prevPackages) => [...prevPackages, response.data.package])
      setSuccess('Package created successfully')

      setTimeout(() => {
        setSuccess(null)
      }, 5000)
    } catch (err) {
      setError('Error creating package!')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}admin/deletePackage/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPackages((prevPackages) => prevPackages.filter((pkg) => pkg.id !== id))
      setSuccess('Package deleted successfully')

      setTimeout(() => {
        setSuccess(null)
      }, 5000)
    } catch (err) {
      console.error('Error deleting package:', err)
      setError('Error deleting package!')
    }
  }

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="container mt-5">
          <h1 className="text-center">Superlikes</h1>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="input1" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    id="input1"
                    className="form-control"
                    value={input1}
                    onChange={(e) => setInput1(e.target.value)}
                    min="0"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="input2" className="form-label">
                    Superlikes
                  </label>
                  <input
                    type="number"
                    id="input2"
                    className="form-control"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                    min="0"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </form>

          <div className="mt-5">
            <form onSubmit={handleDbConstantSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="dbConstantKey" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    id="dbConstantKey"
                    className="form-control"
                    value={dbConstantKey}
                    onChange={(e) => setDbConstantKey(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="dbConstantValue" className="form-label">
                    SuperLikes per price
                  </label>
                  <input
                    type="text"
                    id="dbConstantValue"
                    value={dbConstantKey}
                    onChange={(e) => setDbConstantValue(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                {loading ? 'Saving...' : 'Save Constant'}
              </button>
            </form>
          </div>

          {success && <div className="alert alert-success mt-3">{success}</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <div className="row mt-4">
            {packages.map((pkg) => (
              <div className="col-md-4" key={pkg.id}>
                <div className="card">
                  <div className="card-body">
                    <h5>Package Details</h5>
                    <p>
                      <strong>Superlikes:</strong> {pkg.superlikes}
                      <br />
                      <strong>Price:</strong> {pkg.price}
                    </p>
                    <button className="btn btn-danger" onClick={() => handleDelete(pkg.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default SuperLike
