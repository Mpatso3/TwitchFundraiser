import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { loadContractBalance, loadDeposit } from "../store/interactions"

const Deposit = () => {
  const dispatch = useDispatch()
  const provider = useSelector((state) => state.provider.connection)
  const fundraiser = useSelector((state) => state.fundraiser.contract)
  const transferInProgress = useSelector(
    (state) => state.fundraiser.transferInProgress
  )
  const moneytransfer = useSelector((state) => state.fundraiser.moneytransfer)
  const account = useSelector((state) => state.provider.account)
  const contractBalance = useSelector((state) => state.fundraiser.balance)
  const [deposit, setDeposit] = useState(0)

  const amountHandler = (e) => {
    setDeposit(e.target.value)
  }

  const depositHandler = (e) => {
    e.preventDefault()
    loadDeposit(provider, fundraiser, deposit, dispatch)

    setDeposit(0)
  }
  useEffect(() => {
    if (fundraiser && account) {
      loadContractBalance(fundraiser, dispatch)
    }
  }, [fundraiser, account, transferInProgress, moneytransfer, dispatch])
  return (
    <div className="component exchange__transfers">
      <div className="component__header flex-center">
        <div className="exchange__transfers--form">
          <div className="flex-between">
            <p>
              <small>Fundraiser Balance:</small>
              <br />
              {contractBalance}
            </p>
          </div>
        </div>

        <form onSubmit={(e) => depositHandler(e)}>
          <label htmlFor="Deposit">Deposit Amount</label>
          <input
            type="text"
            id="Deposit"
            placeholder="0.000"
            value={deposit === 0 ? "" : deposit}
            onChange={(e) => amountHandler(e)}
          ></input>
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
export default Deposit
