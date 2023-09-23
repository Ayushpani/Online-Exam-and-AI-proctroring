import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Test() {

    const location = useLocation();
    const email = location.state.id;
    const test_name = location.state.test_name;
    
    return(
        <div>
            <h1>This is the test {test_name} page for {email}</h1>
        </div>
    )
}
export default Test;