import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';
console.log("这个是mian_1.js");
import './main.css';//使用require导入css文件
import './sass_test.scss';
// import main from './main.css';
// import sass from './sass_test.scss';

render(<Greeter />, document.getElementById('root'));