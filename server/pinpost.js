/* eslint react/display-name: 0 */
/* eslint space-before-function-paren:0 */
// https://github.com/eslint/eslint/issues/4442
//https://www.fontsquirrel.com/fonts/Aller


import {Apis} from 'shared/api_client/ApiInstances';


module.export ={
	pinposta: async function (req, res, err){
		let pin;
		try{
			pin = await Apis.instance().db_api.exec('get_state', "steem/@lantto/how-to-calculate-steem-power-using-the-api");

		    var data = JSON.parse(pin);
		    console.log(data);
		    return data;
		} catch(e) {
			console.log("still not there");
		}
    
	}
}
