import { useState } from "react";
import SharedContext from "./SharedContext";

const SharedState = (props) => {
    const [blogsData, setBlogsData] = useState([]);

    return (
        <SharedContext.Provider value={{ blogsData, setBlogsData }}>
            {props.children}
        </SharedContext.Provider>
    )
};

export default SharedState;
