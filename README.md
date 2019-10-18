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
Run this exact command for react version 16

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


