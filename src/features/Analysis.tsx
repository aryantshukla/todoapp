import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { fetchEfficiency, getEfficiency, getEfficiencyLastOperation } from "./Efficiency/efficiencySlice"

export const Analysis = () => {

  const efficiency = useSelector(getEfficiency)
  const lastOperation = useSelector(getEfficiencyLastOperation)
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