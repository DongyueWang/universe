import React from 'react'
import DateChooser from './Category/DateChooser'
import MediaTypeChooser from './Category/MediaTypeChooser'

const Filters = ({ setLoading, initStartDate, initEndDate, setEndDate, setStartDate, setMediaType, setPageNumber, endDate, startDate }) => {
    return (
        <div className='col-lg-3 col-12 mb-5'>
            <div className="text-center fw-bold fs-4 mb-2">
                Filters
            </div>
            <div
                onClick={
                    () => {
                        setEndDate(initEndDate);
                        setStartDate(initStartDate);
                        setMediaType('');
                        setPageNumber('');
                        window.location.reload(false);
                    }
                }
                style={{ cursor: "pointer" }} className="text-center text-primary text-decoration-underline mb-4">Clear Filters
            </div>

            <div className="accordion" id="accordionExample">
                <DateChooser setLoading={setLoading} setEndDate={setEndDate} setStartDate={setStartDate}
                    setPageNumber={setPageNumber}

                    initStartDate={initStartDate}
                    initEndDate={initEndDate}
                    endDate={endDate}
                    startDate={startDate}
                />
                <MediaTypeChooser setMediaType={setMediaType}
                    setPageNumber={setPageNumber}
                />
            </div>
        </div>
    )
}

export default Filters
