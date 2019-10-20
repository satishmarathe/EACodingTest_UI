import React from "react";
import { mount } from "enzyme";
import MusicDisplayer from "./MusicDisplayer";
import MusicRetriever from "./MusicRetriever";
/**
 * we would like to test MusicDisplayer in an isolated state .
 * However MusicDisplayer uses MusicRetriever to retrieve data from API.
 * So in testing we will mock the API response.
 * Import the component to be mocked and then define a mock on that import.
 * ( This is why we have refactored code to decouple  data retrieval from data rendering )
 * ( This eases unit testing !)
 */
jest.mock("./MusicRetriever");


describe("MusicRetriever tests to check behaviour when we receive different responses from API", () => {
  /**
   * Before each test we want to reset the state of the mocked component.
   * This will allow each test to  mock the component in the way it needs to be mocked. 
   */
  beforeEach(() => {
    MusicRetriever.mockClear();
  });
});


it("should transform API data and display in correct order , When retrieved", () => {
    /**
     * We will mock the MusicRetriever and provide our own desired response
     * This will allow us to test various scenarios
     */

    MusicRetriever.mockImplementation(() => {
      return {
        Retrieve: (callback) => callback([
          {
            "name":"Spring festival",
            "bands":[{"name":"ACDC","recordLabel":"Elektra Records"},{"name":"Sting","recordLabel":"Interscope"}]
          }
        ])
      }
    });
  
   
    var wrapper = mount(<MusicDisplayer />);
    //throw wrapper.debug();
    expect (wrapper.find("div.div-table-row").at(1).find("div.div-table-col-mgr").at(0).text()).toEqual("Elektra Records");
    expect (wrapper.find("div.div-table-row").at(2).find("div.div-table-col-band").at(0).text()).toEqual("ACDC");
    expect (wrapper.find("div.div-table-row").at(3).find("div.div-table-col-festival").at(0).text()).toEqual("Spring festival");
  });

  it("should display complex data correctly with two festivals for same band and record company", () => {
    /**
     * We will mock the MusicRetriever and provide our own desired response
     * This will allow us to test various scenarios
     */

    MusicRetriever.mockImplementation(() => {
      return {
        Retrieve: (callback) => callback([
          {
            "name":"Spring festival",
            "bands":[{"name":"ACDC","recordLabel":"Elektra Records"},{"name":"Sting","recordLabel":"Interscope"}]
          },
          {
            "name":"Autumn festival",
            "bands":[{"name":"ACDC","recordLabel":"Elektra Records"}]
          }
        ])
      }
    });
  
   
    var wrapper = mount(<MusicDisplayer />);
    //throw wrapper.debug();
    /** below two tests in combination prove that Record label ordering is correct  */
    expect (wrapper.find("div.div-table-col-mgr").at(0).text()).toEqual("Elektra Records");
    expect (wrapper.find("div.div-table-col-mgr").at(4).text()).toEqual("Interscope");
    //expect (wrapper.find("div.div-table-col-band").text()).toEqual("ACDC").toHaveLength(1);

    //expect (wrapper.find("div.div-table-row").at(3).find("div.div-table-col-festival").at(0).text()).toEqual("Spring festival");
  });

  it("should handle scenario elegantly when API returns empty data set", () => {
    /**
     * In mocked MusicRetriever we have purposefully provided an empty array as result from API
     * In such a case we expect that only the header row is displayed.
     * Expected output:
     * <MusicDisplayer>
          <div className="div-table">
            <div className="div-table-row">
              <div className="div-table-col" align="center">Record Label</div>
              <div className="div-table-col">Band Name</div>
              <div className="div-table-col">Festival</div>
            </div>
          </div>
        </MusicDisplayer>
     */

    MusicRetriever.mockImplementation(() => {
      return {
        Retrieve: (callback) => callback([
          
        ])
      }
    });
  
   /**
    * so in this test we expect that we get only one div element of the form:
    * <div className="div-table-row">...</div>
    * 
    * we check by taking a count of number of such div elements - the count should be 1
    */
    var wrapper = mount(<MusicDisplayer />);
    //throw wrapper.debug();
    expect (wrapper.find("div.div-table-row")).toHaveLength(1);
   
  });

  it("should display message 'Throttled' when API responds with a 429 response code", () => {
    /**
     * We are mocking the response with null data and flag indicating there was an error 
     * and that the error code was a http 429 status code
     */

    MusicRetriever.mockImplementation(() => {
      return {
        Retrieve: (callback) => callback(null,true,429)
      }
    });
  
   
    var wrapper = mount(<MusicDisplayer />);
    expect (wrapper.find("div").at(0).find("h3").at(0).text()).toEqual("throttled");
  });

  it("should display generic message on all other error status codes other than 429 response code", () => {
    /**
     * We are mocking the response with null data and flag indicating there was an error 
     * and null error code.
     * We would like to test behaviour of component in case of unexpected error other than 429
     */

    MusicRetriever.mockImplementation(() => {
      return {
        Retrieve: (callback) => callback(null,true,null)
      }
    });  
   
    var wrapper = mount(<MusicDisplayer />);
    expect (wrapper.find("div").at(0).find("h3").at(0).text()).toEqual("Unknown error Please contact system administrator");
  });