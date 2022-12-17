import React from 'react'
import FilterBTN from '../FilterBTN'

const MediaTypeChooser = ({ setMediaType, setPageNumber }) => {
    let mediaTypes = ["image", "video"]
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Media Types
                </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body 
                d-flex flex-wrap gap-3">
                    {mediaTypes.map((item, index) => (<FilterBTN setPageNumber={setPageNumber} task={setMediaType}
                        key={index} item={item} index={index} name='MediaTypes' />))}
                </div>
            </div>
        </div>
    )
}

export default MediaTypeChooser
