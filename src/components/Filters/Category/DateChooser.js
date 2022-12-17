import React, { useState } from 'react'
import PikerDate from './PikerDate'
import styles from './DateChooser.module.scss'
import Tooltip from '../../Tooltip/Tooltip'


const DateChooser = ({ setLoading, initStartDate, initEndDate, setEndDate, setStartDate, endDate, startDate }) => {

    const [chooserStart, setChooserStart] = useState(initStartDate);
    const [chooserEnd, setChooserEnd] = useState(initEndDate);

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Choose Dates
                </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body 
            d-flex flex-column flex-wrap gap-3">

                    <Tooltip content="To speed the search, max period suggestion is 2 months" direction="right">

                        <PikerDate setLoading={setLoading} setDate={setChooserStart} dateLabel={'Start'} initDate={initStartDate} refDate={endDate}
                        />

                    </Tooltip>
                    <Tooltip content="To speed the search, max period suggestion is 2 months" direction="right">
                        <PikerDate setLoading={setLoading} setDate={setChooserEnd} dateLabel={'End'} initDate={initEndDate} refDate={startDate} />
                    </Tooltip>
                    <button
                        onClick={
                            (e) => {
                                e.preventDefault();
                                setStartDate(chooserStart);
                                setEndDate(chooserEnd);
                            }
                        }
                        className={`${styles.btn} btn btn-primary fs-7`} type='button'>Get pictures and videos</button>

                </div>
            </div>
        </div >
    )
}

export default DateChooser
