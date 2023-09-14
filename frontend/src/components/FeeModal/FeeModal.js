import './FeeModal.css'

const FeeModal = () => {
  return (
    <div className="feeModal">
      <h1>What's the TaskWombat Trust and Support Fee?</h1>
      <p>TaskWombat applies a trust and support fee to all invoices. Expenses and reimbursements are <span>not</span> subject to this fee. You'll see this fee as a separate item on your receipt once the task is complete.</p>

      <div className='feeModal-list'>
        <p>This fee helps to support:</p>
        <ul>
          <li>Operational and safety measures to protect users.</li>
          <li>Investments in our Customer Support Team</li>
          <li>Tools, team training, and channels to support you in getting your task completed.</li>
        </ul>
      </div>

      <p>Don't worry -- the Trust & Support fee doesn't effect what the tasker id paid.</p>
    </div>
  )
}

export default FeeModal
