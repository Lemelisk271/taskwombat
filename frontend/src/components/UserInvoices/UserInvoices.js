import { useState, useEffect, useContext } from 'react'
import { csrfFetch } from '../../store/csrf.js'
import { getAdjustedDate } from '../HelperFunctions/HelperFunctions.js'
import UserInvoiceListItem from '../UserInvoiceListItem'
import { ResetContext } from '../../context/ResetContext'

const UserInvoices = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [outstandingInvoices, setOutstandingInvoices] = useState([])
  const [paidInvoices, setPaidInvoices] = useState([])
  const { resetPage } = useContext(ResetContext)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch('/api/invoices')
      const invoicesData = await res.json()
      const today = new Date(getAdjustedDate(new Date())).getTime()
      let currentInvoices = []
      let paid = []
      invoicesData.forEach(el => {
        let endDate = new Date(getAdjustedDate(new Date(el.Appointment.end))).getTime()
        if (endDate < today) {
          if (el.fullPaid) {
            paid.push(el)
          } else {
            currentInvoices.push(el)
          }
        }
      })

      setOutstandingInvoices(currentInvoices)
      setPaidInvoices(paid)

      setIsLoaded(true)
    }
    loadPage()
  }, [resetPage])

  return (
    <div className='userInvoices'>
      {isLoaded ? (
        <>
          <h1>Outstanding Invoices</h1>
          {outstandingInvoices.map((invoice, i) => (
            <UserInvoiceListItem key={i} invoice={invoice}/>
          ))}
          <h1>Paid Invoices</h1>
          {paidInvoices.map((invoice, i) => (
            <UserInvoiceListItem key={i} invoice={invoice}/>
          ))}
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
