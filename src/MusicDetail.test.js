import React from "react";
import {shallow} from "enzyme";
import MusicDetail from "./MusicDetail";
import adapter from "./setupTests";


describe("Testing MusicDetail Component", () => {
    it ("should render component properly",() => {
        /** in this test we are doing a shallow render of MusicDetail Component 
         *  we are in control of the test data that gets fed to the component so we know what is to be 
         *  rendered in expected output.
         *  So we do a random spot check if a specific <DIV> element with a specific class : div-table-row is rendered or not.
         */
        const wrapper = shallow(
            <MusicDetail test={{bandsArrOp:[
                {
                    bandName: "ACDC",
                    myFestivals: [
                        {festivalName: "Hard Rock Fest"}
                    ]
                }
            ]}} />
        );
        //throw wrapper.debug();
        expect (wrapper.find("div.div-table-row").exists()).toEqual(true);
    });

    it ("should render component with specific data properly",() => {
        /** in this test we are doing a shallow render of MusicDetail Component 
         *  we are in control of the test data that gets fed to the component so we know what is to be 
         *  rendered in expected output.
         *  We check if we find a specific value of a <DIV>.
         */
        const wrapper = shallow(
            <MusicDetail test={{bandsArrOp:[
                {
                    bandName: "ACDC",
                    myFestivals: [
                        {festivalName: "Hard Rock Fest"}
                    ]
                }
            ]}} />
        );
        //throw wrapper.debug();
        expect (wrapper.find("div.div-table-row").at(1).find("div.div-table-col-band").at(0).text()).toEqual("ACDC");
    });
});