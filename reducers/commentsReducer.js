const comments = (state = [], action) => {
	switch (action.type) {
	  case 'GET_COMMENTS_SUCCESS':
		return [
		  ...state,
		  {
			data: action.payload
		  }
		]
	  default:
		return state
	}
  }
  
  export default comments