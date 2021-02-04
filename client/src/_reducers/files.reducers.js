import { filesConstants } from '../_constants';

const initialState = { files: {} };

export function files(state = initialState, action) {
   switch(action.type){
       case filesConstants.GET_FILES:
       return {
           files: action.files
       };
       default:
           return state;

   }
}