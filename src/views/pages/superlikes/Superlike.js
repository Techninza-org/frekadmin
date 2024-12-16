import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AppHeader, AppSidebar } from '../../../components'

const SuperLike = () => {
  // State for input fields and the API response
  const [input1, setInput1] = useState('') // price
  const [input2, setInput2] = useState('') // superlikes
  const [loading, setLoading] = useState(false) // For loading state
  const [error, setError] = useState(null) // For error state
  const [success, setSuccess] = useState(null) // For success message
  const [data, setData] = useState(() => {
    // Try to fetch the data from localStorage on initial load
    const savedData = localStorage.getItem('superlikeData')
    return savedData ? JSON.parse(savedData) : null
  }) // For storing API response

  // Get the token from localStorage (or other storage method)
  const token = localStorage.getItem('token')

  useEffect(() => {
    // If there's data in state, store it in localStorage
    if (data) {
      localStorage.setItem('superlikeData', JSON.stringify(data))
    }
  }, [data]) // Runs every time `data` is updated

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    // Validate input fields and ensure they are numbers
    const price = parseFloat(input1)
    const superlikes = parseInt(input2)

    // Check if inputs are valid numbers
    if (isNaN(price) || isNaN(superlikes)) {
      setError('Both Price and Superlikes must be valid numbers')
      setLoading(false)
      return
    }

    // Prepare the data to send in the request
    const dataToSend = {
      price,
      superlikes,
    }

    // Debugging - Log the values being sent to the API
    console.log('Request data:', dataToSend)
    console.log('Token:', token)

    try {
      // Make the POST request using axios
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}admin/createPackage`, // Use your actual API URL
        dataToSend, // Data to send
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json', // Ensure content type is JSON
          },
        },
      )

      // Check the API response
      console.log('API Response:', response.data)
      setData(response.data.package) // Set the response data to state
      setSuccess('Package created successfully') // Success message

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(null)
      }, 5000) // 5000ms = 5 seconds
    } catch (err) {
      setError('Error sending data!') // Error message
      console.error('Error:', err.response || err) // Log the error
    } finally {
      setLoading(false) // Stop loading
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
            {/* Row for Price and Superlikes Inputs in two columns */}
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
                    onChange={(e) => setInput1(e.target.value)} // Update state on input change
                    min="0" // Optional: Ensure the price is non-negative
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
                    onChange={(e) => setInput2(e.target.value)} // Update state on input change
                    min="0" // Optional: Ensure the superlikes is non-negative
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </form>

          {/* Display success or error message */}
          {success && <div className="alert alert-success mt-3">{success}</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}

          {/* Always display the card with the data from localStorage */}
          <div className="card mt-4 w-25">
            <div className="card-body">
              <h5 className="card-title pb-3">Package Details</h5>

              {data ? (
                <>
                  <p>
                    <strong>Superlikes:</strong> {data.superlikes}
                    <br />
                    <strong>Price:</strong> {data.price}
                  </p>
                </>
              ) : (
                <p>No data available yet. Please submit the form.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SuperLike
