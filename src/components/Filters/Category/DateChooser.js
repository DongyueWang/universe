import React, { useState } from 'react'
import PikerDate from './PikerDate'

const DateChooser = ({ setLoading, initStartDate, initEndDate, setEndDate, setStartDate, endDate, startDate }) => {

    const [errorMessage, setErrorMessage] = useState('');

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
                    <div style={errorMessage ? { border: '1px solid red', color: 'red' } : {}}>
                        <PikerDate setLoading={setLoading} setDate={setStartDate} dateLabel={'Start'} initDate={initStartDate} refDate={endDate} setErrorMessage={setErrorMessage}
                            errorMessage={errorMessage}
                        />
                        {errorMessage && (
                            <p className="error"> {errorMessage} </p>
                        )}
                    </div>
                    <PikerDate setLoading={setLoading} setDate={setEndDate} dateLabel={'End'} initDate={initEndDate} refDate={startDate} setErrorMessage={setErrorMessage}
                        errorMessage={errorMessage} />

                </div>
            </div>
        </div>
    )
}

export default DateChooser
