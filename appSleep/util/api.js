const  BASEURL='https://www.topsleep.net/merchant/';
const dictionaries ='https://www.topsleep.net/backstage/'
// let token;
// uni.getStorage({
// 				key: 'businessinfo',
// 				success:function(res){
// 					console.log(res)
// 					token = JSON.parse(res.data).token
					
// 				}
// 			})
// 			console.log(token)
export const myRequest=(options)=>{
	return new Promise((resolve,reject)=>{
		let ip = options.url =='sysDict/query' ? dictionaries : BASEURL 
		uni.request({
			url:ip +options.url,
			method:options.method|| 'get',
			data:options.data||{},
			// header:{
			// 	  'Authorization' :token
			// },
			success:(res)=>{
				// if(res.data.status!==0){
				// 	return uni.showToast({
				// 		title:'数据获取失败'
				// 	})
				// }
				resolve(res)
			},
			fail:(err)=>{
				uni.showToast({
					title:'请求接口失败'
				})
				reject(err)
			}
		})
	})
} 