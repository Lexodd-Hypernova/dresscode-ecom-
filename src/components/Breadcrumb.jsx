import React from 'react'

const Breadcrumb = () => {
    return (
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item fs-5"><a href="#">Home</a></li>
                <li class="breadcrumb-item fs-5"><a href="#">Library</a></li>
                <li class="breadcrumb-item fs-5 active" aria-current="page">Data</li>
            </ol>
        </nav>
    )
}

export default Breadcrumb