import React from 'react'
import Category from './Category'
import NavBar from '../Header/NavBar'
import TextMove from '../InfiniteTextMove/TextMove'
const Home = () => {
    return (
        <>
            <NavBar />
            <TextMove />
            <Category />
        </>
    )
}

export default Home