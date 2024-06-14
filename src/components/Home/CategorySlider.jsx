import React from 'react'

const CategorySlider = () => {
    return (
        <section className='category__Slider'>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="images/c1.png" className="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <h5 className='cat__Lbl'>School Uniforms</h5>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="images/c2.png" className="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <h5 className='cat__Lbl'>Medical uniforms</h5>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="images/c3.png" className="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <h5 className='cat__Lbl'>Corporate uniforms</h5>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </section>
    )
}

export default CategorySlider