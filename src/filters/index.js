import moment from 'moment'

let filters = {
	userFilter: ({ retweeted_status, user }) => {
		return retweeted_status ? retweeted_status.user.name : user.name
	},

	screenNameFilter: ({ retweeted_status, user }) => {
		return '@' + (
			retweeted_status ? 
				retweeted_status.user.screen_name + '(Retweeded by ' + user.screen_name + ')' : 
				user.screen_name
		)
	},

	imgUrlFilter: ({ retweeted_status, user }) => {
		let imgUrl = retweeted_status ? 
			retweeted_status.user.profile_image_url : user.profile_image_url
		return imgUrl
	},

	imgBackgroundFilter: ({ retweeted_status, user }) => {
		let imgUrl = retweeted_status ? 
			retweeted_status.user.profile_background_image_url : user.profile_background_image_url
		return imgUrl
	},

	imgFilter: (tweet) => {
		return '<img src="'+filters.imgUrlFilter(tweet)+'">'
	},

	dateDiffForHumans: (created_at) => {
	  	let end = new Date(created_at)
	  	return moment(end).from(moment())		
	}	
}

export default filters