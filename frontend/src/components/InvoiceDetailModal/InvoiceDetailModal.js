import { useState, useEffect } from 'react'
import moment from 'moment-timezone';
import wombat from '../../images/wombat.png'
import './InvoiceDetailModal.css'

const InvoiceDetailModal = ({ invoice }) => {
  const [invoiceDate, setInvoiceDate] = useState('')

  console.log(invoice)

  return (
    <div className="invoiceDetailModal">
      <div className='invoiceDetailModal-header'>
        <img src={wombat} alt="Wombat Logo"/>
        <h1>taskwombat</h1>
      </div>
    </div>
  )
}

export default InvoiceDetailModal
