import { useState, useEffect, useContext } from 'react'
import { csrfFetch } from '../../store/csrf.js'
import { getAdjustedDate } from '../HelperFunctions/HelperFunctions.js'
import UserInvoiceListItem from '../UserInvoiceListItem'
import LandingPageCategoryListItem from '../LandingPageCategoryListItem'
import { ResetContext } from '../../context/ResetContext'
import './UserInvoices.css'

const UserInvoices = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [outstandingInvoices, setOutstandingInvoices] = useState([])
  const [paidInvoices, setPaidInvoices] = useState([])
  const [futureInvoices, setFutureInvoices] = useState([])
  const [categories, setCategories] = useState([])
  const { resetPage } = useContext(ResetContext)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch('/api/invoices')
      const invoicesData = await res.json()
      const today = new Date(getAdjustedDate(new Date())).getTime()
      let currentInvoices = []
      let paid = []
      let future = []
      invoicesData.forEach(el => {
        let endDate = new Date(getAdjustedDate(new Date(el.Appointment.end))).getTime()
        if (endDate < today) {
          if (el.fullPaid) {
            paid.push(el)
          } else {
            currentInvoices.push(el)
          }
        } else {
          future.push(el)
        }
      })
      setOutstandingInvoices(currentInvoices)
      setPaidInvoices(paid)
      setFutureInvoices(future)

      if (currentInvoices.length === 0 && paid.length === 0 && future.length === 0) {
        const resCategories = await csrfFetch('/api/categories')
        const categoryList = await resCategories.json()
        setCategories(categoryList)
      }

      setIsLoaded(true)
    }
    loadPage()
  }, [resetPage])

  return (
    <div className='userInvoices'>
      {isLoaded ? (
        <>
          {outstandingInvoices.length > 0 && <>
            <h1>Outstanding Invoices</h1>
            {outstandingInvoices.map((invoice, i) => (
              <UserInvoiceListItem key={i} invoice={invoice} future={false}/>
            ))}
          </>}
          {futureInvoices.length > 0 && <>
            <h1>Upcoming Invoices</h1>
            {futureInvoices.map((invoice, i) => (
              <UserInvoiceListItem key={i} invoice={invoice} future={true}/>
            ))}
          </>}
          {paidInvoices.length > 0 && <>
            <h1>Paid Invoices</h1>
            {paidInvoices.map((invoice, i) => (
              <UserInvoiceListItem key={i} invoice={invoice} future={false}/>
            ))}
          </>}
          {(paidInvoices.length === 0 && futureInvoices.length === 0 && outstandingInvoices.length === 0) && <>
            <h2>You haven't scheduled any tasks yet. Select a category below to start!</h2>
            <div className='userInvoices-categories'>
              {categories.map((category, i) => (
                <LandingPageCategoryListItem key={i} category={category} />
              ))}
            </div>
          </>}
        </>
      ):(
        <>
          <h1>Loading...</h1>
        </>
      )}
    </div>
  )
}

export default UserInvoices
