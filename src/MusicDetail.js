import React from "react";
function MusicDetail(props){
    //console.log("music detail",props.test);
    const bands = props.test.bandsArrOp.map(
        (eachBand,j) => {return(
            <div key={j*100}>
            <div className="div-table-row" key={j}>
                <div className="div-table-col-mgr" align="center">-</div>
                <div className="div-table-col-band" >{eachBand.bandName}</div>
                <div className="div-table-col-festival" align="center">-</div>
            </div>
                {eachBand.myFestivals.map((c, i) => (
                    <div className="div-table-row" key={i}>
                        <div className="div-table-col-mgr" align="center">-</div>
                        <div className="div-table-col-band" align="center">-</div>
                        <div className="div-table-col-festival" align="center">{c.festivalName}</div>
                    </div> 
                   
                ))}
            </div>
        )
      }
    );
    
    return(
        <div>
            <div className="div-table-row" >
                <div className="div-table-col-mgr" align="center">{props.test.managerName}</div>
                <div className="div-table-col-band" >-</div>
                <div className="div-table-col-festival" >-</div>
            </div>            
            
            <div>{bands}</div>
        </div>
    )   
}
export default MusicDetail;