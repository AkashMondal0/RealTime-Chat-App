import React from 'react'
import Carousel from '../carousel/carousel'

const PhotoModal = ({ selectedPhoto }) => {
    return (
        <div>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="PhotoModal" className="modal-toggle" />
            <div className="modal">
                <label htmlFor="PhotoModal" className="btn btn-sm btn-circle absolute right-2 top-2 z-50">✕</label>
                <div className="modal-box rounded-3xl" style={{ "padding": "0" }} id="style-3">
                    <Carousel images={selectedPhoto} />
                </div>
            </div>
        </div>
    )
}

export default PhotoModal
