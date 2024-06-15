import React from 'react'
import Category from './Category'
import NavBar from '../Header/NavBar'
import TextMove from '../InfiniteTextMove/TextMove'
import SortBy from './SortBy'
const Home = () => {
    return (
        <>
            <NavBar />
            <TextMove />
            <Category />
            <SortBy />
        </>
    )
}

export default Home