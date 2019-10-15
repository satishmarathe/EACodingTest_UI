import React from "react";
function MusicDetail(props){
    //console.log("music detail",props.test);
    const bands = props.test.bandsArrOp.map(
        (eachBand,j) => {return(
            <div key={j*100}>
            <div className="div-table-row" kay={j}>
                <div className="div-table-col" align="center">-</div>
                <div className="div-table-col" >{eachBand.bandName}</div>
                <div className="div-table-col" align="center">-</div>
            </div>
                {eachBand.myFestivals.map((c, i) => (
                    <div className="div-table-row" key={i}>
                        <div className="div-table-col" align="center">-</div>
                        <div className="div-table-col" align="center">-</div>
                        <div className="div-table-col" align="center">{c.festivalName}</div>
                    </div> 
                   
                ))}
            </div>
        )
      }
    );
    
    return(
        <div>
            <div className="div-table-row" >
                <div className="div-table-col" align="center">{props.test.managerName}</div>
                <div className="div-table-col" >-</div>
                <div className="div-table-col" >-</div>
            </div>            
            
            <div>{bands}</div>
        </div>
    )   
}
export default MusicDetail;