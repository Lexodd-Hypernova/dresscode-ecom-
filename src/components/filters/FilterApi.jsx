import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DressCodeApi from '../../common';

const FilterApi = ({ onFiltersChange }) => {
    const { groupName, category, subCategory, productType, gender } = useParams();
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(DressCodeApi.getProductFilters.url + `?groupName=${groupName}&category=${category}&subCategory=${subCategory}&productType=${productType}&gender=${gender}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setFilters(result.filters);
                setLoading(false);
                console.log("filters", result.filters);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [groupName, category, subCategory, productType, gender]);

    const handleFilterChange = (filterType, value) => {
        const updatedFilters = { ...filters, [filterType]: value };
        onFiltersChange(updatedFilters);
    };

    return (
        <section className='filters'>
            {loading ? (
                <div className='placeholder-glow'>
                    <span className="placeholder d-inline-block h-100 w-100"></span>
                </div>
            ) : (
                <Filters filters={filters} onFilterChange={handleFilterChange} />
            )}
        </section>
    );
};

const Filters = ({ filters, onFilterChange }) => {
    const handleCheckboxChange = (e, filterType) => {
        const { value, checked } = e.target;
        const updatedFilterValues = checked
            ? [...(filters[filterType] || []), value]
            : (filters[filterType] || []).filter((val) => val !== value);
        onFilterChange(filterType, updatedFilterValues);
    };

    return (
        <div className='filter__Inner'>
            {filters.fits && filters.fits.length > 0 && (
                <div className='sleeve__Filter filter'>
                    <div className="dropdown-center d-flex justify-content-center">
                        <button type="button" className="btn btn-light dropdown-toggle py-3" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            Fit
                        </button>
                        <form className="dropdown-menu p-4">
                            <div className='row row-gap-3'>
                                {filters.fits.map((fit, index) => (
                                    <div className='col-12' key={index}>
                                        <div className='form-check'>
                                            <input className="form-check-input" type="checkbox" id={`fit${fit}`} value={fit} aria-label="..." onChange={(e) => handleCheckboxChange(e, 'fits')} />
                                            <label className="form-check-label" htmlFor={`fit${fit}`}>{fit}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {filters.colors && filters.colors.length > 0 && (
                <div className='color__Filter filter'>
                    <div className="dropdown-center d-flex justify-content-center">
                        <button type="button" className="btn btn-light dropdown-toggle py-3" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            Color
                        </button>
                        <form className="dropdown-menu p-4">
                            <div className='row row-gap-3'>
                                {filters.colors.map((color, index) => (
                                    <div className='col-12' key={index}>
                                        <div className='form-check'>
                                            <input className="form-check-input" type="checkbox" id={`color${color.name}`} value={color.name} aria-label="..." style={{ backgroundColor: `${color.hexcode}` }} onChange={(e) => handleCheckboxChange(e, 'colors')} />
                                            <label className="form-check-label" htmlFor={`color${color.name}`}>{color.name}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {filters.sizes && filters.sizes.length > 0 && (
                <div className='size__Filter filter'>
                    <div className="dropdown-center d-flex justify-content-center">
                        <button type="button" className="btn btn-light dropdown-toggle py-3" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            Size
                        </button>
                        <form className="dropdown-menu p-4">
                            <div className='row row-gap-3'>
                                {filters.sizes.map((size, index) => (
                                    <div className='col-6' key={index}>
                                        <div className='form-check'>
                                            <input className="form-check-input" type="checkbox" id={`size${size}`} value={size} aria-label="..." onChange={(e) => handleCheckboxChange(e, 'sizes')} />
                                            <label className="form-check-label" htmlFor={`size${size}`}>{size}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {filters.necklines && filters.necklines.length > 0 && (
                <div className='fabric__Filter filter'>
                    <div className="dropdown-center d-flex justify-content-center">
                        <button type="button" className="btn btn-light dropdown-toggle py-3" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            Neckline
                        </button>
                        <form className="dropdown-menu p-4">
                            <div className='row row-gap-3'>
                                {filters.necklines.map((neckline, index) => (
                                    <div className='col-12' key={index}>
                                        <div className='form-check'>
                                            <input className="form-check-input" type="checkbox" id={`neckline${neckline}`} value={neckline} aria-label="..." onChange={(e) => handleCheckboxChange(e, 'necklines')} />
                                            <label className="form-check-label" htmlFor={`neckline${neckline}`}>{neckline}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {filters.sleeves && filters.sleeves.length > 0 && (
                <div className='sleeve__Filter filter'>
                    <div className="dropdown-center d-flex justify-content-center">
                        <button type="button" className="btn btn-light dropdown-toggle py-3" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            Sleeve length
                        </button>
                        <form className="dropdown-menu p-4">
                            <div className='row row-gap-3'>
                                {filters.sleeves.map((sleeve, index) => (
                                    <div className='col-12' key={index}>
                                        <div className='form-check'>
                                            <input className="form-check-input" type="checkbox" id={`sleeve${sleeve}`} value={sleeve} aria-label="..." onChange={(e) => handleCheckboxChange(e, 'sleeves')} />
                                            <label className="form-check-label" htmlFor={`sleeve${sleeve}`}>{sleeve}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {filters.fabrics && filters.fabrics.length > 0 && (
                <div className='fabric__Filter filter'>
                    <div className="dropdown-center d-flex justify-content-center">
                        <button type="button" className="btn btn-light dropdown-toggle py-3" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            Fabrics
                        </button>
                        <form className="dropdown-menu p-4">
                            <div className='row row-gap-3'>
                                {filters.fabrics.map((fabric, index) => (
                                    <div className='col-12' key={index}>
                                        <div className='form-check'>
                                            <input className="form-check-input" type="checkbox" id={`fabric${fabric}`} value={fabric} aria-label="..." onChange={(e) => handleCheckboxChange(e, 'fabrics')} />
                                            <label className="form-check-label" htmlFor={`fabric${fabric}`}>{fabric}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterApi;
