/*
 * @Descripttion: 
 * @Author: guoqifa
 * @Date: 2021-04-02 12:15:33
 * @LastEditors: liuYaoYu
 * @LastEditTime: 2021-07-16 17:08:16
 * @version: 
 */
var envUrl = '';
var routeUrl = '';
if(window.location.href.indexOf('safety.rfyfb.com')>-1){ 
    envUrl = 'https://www.topsleep.net' //生产  
    routeUrl = 'http://safety.rfyfb.com'
} else {
    envUrl = 'http://106.14.34.18:1001' // 测试  
    routeUrl = 'http://risk.rfyfb.com'
} 
window.globalVar = {
    routeUrl: routeUrl,
    baseUrl: envUrl, // 接口地址   
};

console.log(window.globalVar.baseUrl)
 