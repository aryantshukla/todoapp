import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../app/store"

import { fetchEfficiency } from "./Efficiency/efficiencySlice"

export const Analysis = () => {

  const efficiency = useSelector((state:RootState) => state.efficiency.efficiency)
  const lastOperation = useSelector((state:RootState) => state.efficiency.lastOperation)
  const dispatch = useDispatch();

  useEffect(() => {
    if (lastOperation !== 'fetch') {
      dispatch(fetchEfficiency())
    }
  }, [lastOperation, dispatch])

  return (
    <>
      <h1>Analysis:</h1>
      <hr />
      <section className="specContainer">
        <div className="spec">
          Efficiency Score:
          <div className="rate">
            <div className="efficiency">{efficiency}</div>
          </div>
        </div>
        <div className="spec">
          Power:
          <div className="rate">
            <div className="power">1050</div>
          </div>
        </div>
      </section>
    </>
  )
}