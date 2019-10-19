import { appConfig } from "./config.js";
import RateLimitingError from "./RateLimitingError";

export default class MusicRetriever {
  /** gets details from API call  */
  Retrieve(callbackMethod) {
    fetch(appConfig.apiUrl)
      .then(response => {
        if (!response.ok) {
          if (response.status === 429) {
            throw new RateLimitingError("This failed due to 429", response.status);
          } else {
            throw new Error(response.status);
          }
        } else {
          return response.json();
        }
      })
      .then(responseJson => callbackMethod(responseJson,false,null))
      .catch(error => {
        /** ensure error flag is set to indicate we have an issue  */
        //this.setState({ isError: true });
        //console.log("error now is : ", error.status);
        //if(error.status === 429){
        if (error instanceof RateLimitingError) {
          //console.log("we got a 429");
          //this.setState({errorStatusCode:error.status});
          //this.setState({ errorStatusCode: error.code });
        } else {
          //console.log("unexpected error");
        }
        callbackMethod(null,true,error.code);
      });
  }
}
