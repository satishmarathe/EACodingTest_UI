# EACodingTest_UI
This is a React UI sample project that consumes an API and renders response

# Software required :
Node 8.11.3+
npm  5.6.0

# Instructions :
npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.
    
# NOTE:
To simulate rate check ( Throttling ) every 4th request to API will throw a 429 response back.

# Installing Enzyme 
Step:1
Run this exact command for react version 16 ( enzyme and enzyme adapter both are required )

npm i --save-dev enzyme enzyme-adapter-react-16

Step:2
create a file called : setupTests.js under 'src'
file contents :
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

Step3:
then in any test file you need to import 'adapter' :
import adapter from "./setupTests";

Without step2 and step3 enzyme does not work .

# Cheat sheet details
1 >
By using 'find' method of enzyme we can extract / reach specific portion of HTML:
Example:
 const w1 = wrapper.find("div.div-table-row");
 If this <div> contains multiple child <divs> with same class or id then we can use :
const w1 = wrapper.find("div.div-table-row").at(1);
 This will give the second child div element .
    
2 >
To get the value of a <div> element :
    const w1 = wrapper.find("div.div-table-row").at(1).text();
    

