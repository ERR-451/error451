/* 
This file is to demonstrate the basics of React. React is an extension of 
JavaScript that allows you to use both JavaScript and HTML elements simply.
You can use React in regular .js files by importing the following;

import React from 'react';
import { createroot } (or ReactDOM) from 'react-dom/client';

*/

// Create a containter to be the target for a render.
const container = docuent.getElementById('box');

// Create a root to implement the rendering.
const root = createRoot(container);

// Create an element to render.
const myList = (
    <ul>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
        <li>Fourth</li>
        <li>Fifth</li>
    </ul>
);

// Pass the element into the render function.
root.render(myList);