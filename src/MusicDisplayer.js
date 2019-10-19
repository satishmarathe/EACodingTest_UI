import React from "react";
import MusicRetriever from "./MusicRetriever";
import MusicDetail from "./MusicDetail";

export default class MusicDisplayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //dataAvailable: false,
      //data: null
      restApiData: [],
      isError: false,
      errorStatusCode: 200
    };
    this.ManagerArr = [];
    this.Festival = {};

    this.forEachFestival = this.forEachFestival.bind(this);
    this.forEachBand = this.forEachBand.bind(this);
  }

  componentDidMount() {
    /** call to retrieve data from API - parameter passed is a callback function
     *  this call back function will be called by the Retriever once data is obtained from API
     */
    new MusicRetriever().Retrieve((result,errorIndicator,errorCode) => {
        console.log("from api data is",result);
      this.setState({
        isError: errorIndicator,
        restApiData: result,
        errorStatusCode: errorCode
      });
    });
  }

  render(){
    /** first lets convert the json data in file to a format we want */
    //const myTempArr = musicDataArr.map(this.test1);
    //console.log(this.ManagerArr);
    const { restApiData } = this.state;
    
    if(this.state.isError){
        console.log("YES ERROR");
        if(this.state.errorStatusCode === 429){
            return(
                <div>
                    <h3>throttled</h3>
                </div>
            );
        }else{
            return(
                <div>
                    <h3>Unknown error Please contact system administrator</h3>
                </div>
            );
        }
    }else{
         console.log("NO ERROR");

        
         /** for each Festival element in response iterate */
         restApiData.map(this.forEachFestival);
    
         /** sorting of Manager data  */
         this.ManagerArr.sort(function(a, b){
             return (a.managerName > b.managerName) - (a.managerName < b.managerName);
         });
    
         //console.log(myTempApp);
         /** then lets use the converted data to render  */
         const myConvArr = this.ManagerArr.map((item,k) => {
             //console.log(item);
             return(
                 <MusicDetail key={k} test={item} />  
             )
         });
    
         return(
             <div className="div-table">
                 <div className="div-table-row">
                     <div className="div-table-col" align="center">Record Label</div>
                     <div className="div-table-col" >Band Name</div>
                     <div className="div-table-col" >Festival</div>
                 </div>                
                 {myConvArr}
             </div>
         )
     }
 }

  forEachBand(eachBand) {
    //console.log("in value2 i/p data about Bands and M ",value2);
    /** we have all 3 **/
    //console.log("F,B,M",this.Festival,value2.name,value2.recordLabel);
    if (this.ManagerArr.length) {
      /** this means we already have some M present - we should only add new M  or append to existing M */

      //console.log("we do have something in here");
      /** check if the M we have read is that already present  */
      //console.log(this.ManagerArr);
      var foundSameManager = this.ManagerArr.findIndex(function(element) {
        //console.log("element.managerName",element.managerName);
        //console.log("value2.recordLabel",value2.recordLabel);
        return element.managerName === eachBand.recordLabel;
      });
      //console.log("what did we find for manager" ,foundSameManager);
      if (foundSameManager === -1) {
        /** this means this M is not found */
        //console.log("M does NOT exist");
        /** this means there are existing M but this M is not present  */
        /** so we are free to add this M B and F  */
        const sampleM = {
          bandsArrOp: []
        };
        sampleM.managerName = eachBand.recordLabel;

        const myBand = {
          bandName: eachBand.name,
          myFestivals: []
        };
        myBand.myFestivals.push({ festivalName: this.Festival });
        /** sorting of Festival data  */
        myBand.myFestivals.sort(function(a, b) {
          return (
            (a.festivalName > b.festivalName) -
            (a.festivalName < b.festivalName)
          );
        });
        sampleM.bandsArrOp.push(myBand);

        /** sorting of Band data  */
        sampleM.bandsArrOp.sort(function(a, b) {
          return (a.bandName > b.bandName) - (a.bandName < b.bandName);
        });
        this.ManagerArr.push(sampleM);
        //console.log("second MBF = " , this.ManagerArr);
      } else {
        /** this means we found a matching M  */
        /** now get the array of Bands from the matching M  */
        /** then check if the Band we have matches with existing bands  */
        /** if the band is the same then add to existing festivals  */
        /** if the band is different add band to existing bands and add festival to existing festivals */
        //console.log("the matching M is ",value2.recordLabel);
        //console.log("band for matching  M",this.ManagerArr[foundSameManager].bandsArrOp);
        var foundSameBand = this.ManagerArr[
          foundSameManager
        ].bandsArrOp.findIndex(function(element) {
          //console.log("element.managerName",element.managerName);
          //console.log("value2.recordLabel",value2.recordLabel);
          //tempBarr1 = element.bandName;
          return element.bandName === eachBand.name;
        });
        if (foundSameBand === -1) {
          //console.log("did not find  same band 1");
          /** band is different from what we have so add band and festival */
          /** also add the F to the new B  */
          const myBand = {
            bandName: eachBand.name,
            myFestivals: []
          };
          myBand.myFestivals.push({ festivalName: this.Festival });

          /** sorting of Festival data  */
          myBand.myFestivals.sort(function(a, b) {
            return (
              (a.festivalName > b.festivalName) -
              (a.festivalName < b.festivalName)
            );
          });

          this.ManagerArr[foundSameManager].bandsArrOp.push(myBand);

          /** sorting of Band data  */
          this.ManagerArr[foundSameManager].bandsArrOp.sort(function(a, b) {
            return (a.bandName > b.bandName) - (a.bandName < b.bandName);
          });
        } else {
          /** band is the same add to this bands festivals */

          this.ManagerArr[foundSameManager].bandsArrOp[
            foundSameBand
          ].myFestivals.push({ festivalName: this.Festival });

          /** sorting of Festival data  */
          this.ManagerArr[foundSameManager].bandsArrOp[
            foundSameBand
          ].myFestivals.sort(function(a, b) {
            return (
              (a.festivalName > b.festivalName) -
              (a.festivalName < b.festivalName)
            );
          });
        }
      }
    } else {
      /** no M is present at all we are free to add  */
      //console.log("we have nothing!");
      const sampleM = {
        bandsArrOp: []
      };
      sampleM.managerName = eachBand.recordLabel;
      //console.log(musicLabelArrOp);
      const myBand = {
        bandName: eachBand.name,
        myFestivals: []
      };
      /** now add B */
      /** now add F */
      myBand.myFestivals.push({ festivalName: this.Festival });

      /** sorting of Festival data  */
      myBand.myFestivals.sort(function(a, b) {
        return (
          (a.festivalName > b.festivalName) - (a.festivalName < b.festivalName)
        );
      });

      sampleM.bandsArrOp.push(myBand);

      /** sorting of Band data  */
      sampleM.bandsArrOp.sort(function(a, b) {
        return (a.bandName > b.bandName) - (a.bandName < b.bandName);
      });

      this.ManagerArr.push(sampleM);
      //console.log("first MBF = " , this.ManagerArr);
    }
  }
  forEachFestival(eachFestival) {
    /** we have each element of the array */
    //console.log("in value1",value1);
    this.Festival = eachFestival.name;
    //console.log(managerName);
    //console.log("F,B,M",festivalArrParam.name,bandsArrParam.name);

    eachFestival.bands.map(this.forEachBand);
  }

  
}
