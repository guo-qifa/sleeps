import {get, post, put, deletes} from './request'

export function getTest(params) {
    return get(`./table.json`, params);
}

// 获取列表
let postJson = function (v,num) {
    let f =Object.assign({}, v);
    let o;
    if (!v && num) {

        f.type = num
        o = {data: {filter: f, orders: []}, pageNum: 1, pageSize: 30}

    } else if(!v){
        o = {data: {filter: {}, orders: []}, pageNum: 1, pageSize: num?num:10}
    }else {
        delete f.pageNum
        delete f.pageSize
        o = {data: {filter: f, orders: []}, pageNum: v.pageNum, pageSize: v.pageSize = num?num:10}
    }

    return o
}

// 登录
export function login(params) {
    return post(`/sysAdmin/login`, params);
}
// 修改密码别人的密码
export function resetuserPass(params) {

    return put(`/sysAdmin/setPassword`, params);
}
// 修改自己的密码
export function resetuserMyPass(params) {
    let o = JSON.parse(localStorage.loginUserinfo).username;
    params.username = o
    return put(`/sysAdmin/updatePassword`, params);
}
// banan模块
export function bananList(params) {
    return post(`/b_banan/listAllBanan`, postJson(params));
}
export function bananAdd(params) {
    return post(`/b_banan/insertBanan`, params);
}
export function bananEdit(params) {
    return put(`/b_banan/updateBanan/${params.id}`, params);
}
export function banaDel(id) {
    return deletes(`/b_banan/deleteBanan/${id}`);
}

export function bananStatus(id, status) {

    return get(`/b_banan/updateStatus/${id}`, status);
}
// -----------------------------------------------------------------------------

// 会员用户
export function mberList(params) {
    return post(`/b_member/listAllMember`, postJson(params));
}
// 所有会员用户
export function expList(params) {
    return post(`/b_member/exportAllMember`, postJson(params));
}
// export function expList() {
//     return get(`/b_member/test`);
// }

// 会员报告
export function reportList(params) {
    return post(`/b_member_ext/listAllMemberExt`, postJson(params));
}
//所有会员报告
export function exportExt(params) {
    return post(`/b_member_ext/exportAllMemberExt`, postJson(params));
}
//拉黑會員
export function blockUser(params) { 
    return put(`/b_member/editStatus/${params.openId}/${params.status}`, postJson(params));
}
// 角色管理
export function rolList(params) {
    return post(`/sysRole/listAll`, postJson(params));
}
export function rolAdd(params) {
    return post(`/sysRole/create`, params);
}
export function rolEdit(params) {
    return put(`/sysRole/updateName/${params.roleId}`, params);
}

export function rolDel(id) {
    return deletes(`/sysRole/delete/${id}`);
}
export function powerEdit(params) {
    return put(`/sysRole/updateMenu/${params.roleId}`,{listMenuIds:params.listMenuIds});
}


// -----------------------------------------------------------------------------

// 获取权限列表
export function powerList(params) {
    return get(`/sysMenu/listAll`);
}
// 菜单管理
export function menList(params) {
    return post(`/sysMenu/listAll`, postJson(params));
}
export function menAdd(params) {
    return post(`/sysMenu/insert`, params);
}
export function menEdit(params) {
    return put(`/sysMenu/update/${params.id}`, params);
}
export function menDel(id) {
    return deletes(`/sysMenu/delete/${id}`);
}
// -----------------------------------------------------------------------------

// 门店管理

export function storeList(params) {
    return post(`/b_store/listAllStore`, postJson(params));
}
export function storeAdd(params) {
    return post(`/b_store/insertStore`, params);
}
export function storeEdit(params) {

    return put(`/b_store/updateStore/${params.storeId}`, params);
}
export function storeDel(id) {
    return deletes(`/b_store/deleteStore/${id}`);
}
// -----------------------------------------------------------------------------

//门店下面的账号
export function staffList(params) {
    return get(`/b_store/listAllUser/${params.storeId}`);
}
export function staffAdd(params) {

    return post(`/b_store/insertUser/${params.storeId}`,params);
}
export function staffEdit(params) {
   let postData = {
       realName:params.realName,
        mobile:params.mobile,
       storeId:params.storeId
    }
    return put(`/b_store/updateStoreUser/${params.storeId}`,postData);
}
export function staffPass(params) {
    let d= Object.assign({}, params);
    delete d.storeUserId
    return get(`/b_store/updatePassword/${params.storeUserId}`,d);
}
export function staffDel(id) {
    return deletes(`/b_store/deleteStoreUser/${id}`);
}

// -----------------------------------------------------------------------------

// 会员报告视图
export function viewList() {
    return get(`/b_member_ext/view`);
}

// 账号管理
export function accountList(params) {
    return post(`/sysAdmin/list`, postJson(params));
}
export function accountStatus(id, status) {

    return get(`/sysAdmin/updateStatus/${id}`, status);
}
export function accountAdd(params) {
    return post(`/sysAdmin/register`, params);
}
export function resetPass(params) {

    return put(`/sysAdmin/setPassword`, params);
}
export function accountEdit(params) {
    return put(`/sysAdmin/update/${params.id}`, params);
}
export function accountDel(id) {
    return deletes(`/sysAdmin/delete/${id}`);
}
// 设备管理
export function equipmentList(params) {
    return post(`/b_equipment/listAll`, postJson(params));
}
export function equipmentAdd(params) {
    return post(`/b_equipment/insert`, params);
}
export function equipmentEdit(params) {
    return put(`/b_equipment/update/${params.equipmentId}`, params);
}
export function equipmentDel(id) {
    return deletes(`/b_equipment/delete/${id}`);
}
export function equipmentStatus(id, status) {

    return get(`/b_equipment/updateFlag/${id}`, status);
}
// 欢迎页面
export function weList(params) {
    return post(`/b_welcome_page/listAllWelcomePage`, postJson(params));
}
export function weAdd(params) {
    return post(`/b_welcome_page/insertWelcomePage`, params);
}
export function weEdit(params) {
    return put(`/b_welcome_page/updateWelcomePage/${params.id}`, params);
}
export function weDel(id) {
    return deletes(`/b_welcome_page/deleteWelcomePage/${id}`);
}
export function weStatus(id, status) {

    return get(`/b_welcome_page/updateStatus/${id}`, status);
}
// 适合床垫软硬度
export function fitList(params) {
    return get(`/b_mattressGrade/list`);
}
export function fitAdd(params) {
    return post(`/b_mattressGrade/crt`, params);
}
export function fitEdit(params) {

    delete  params.createTime
    return put(`/b_mattressGrade/edt/${params.gradeId}`, params);
}
export function fitDel(id) {
    return deletes(`/b_mattressGrade/del/${id}`);
}
// 枕头基本信息
export function pillowList(params) {
    return post(`/pillow/list`,postJson(undefined,100));
}
export function pillowAdd(params) {
    return post(`/pillow/add`,params);
}
export function pillowDel(id) {
    return deletes(`/pillow/delete/${id}`);
}

export function pillowEdit(params) {
    return put(`/pillow/edit/${params.pillowId}`, params);
}
// 枕头配置
export function pillowConfigList(params) {
    return post(`/pillow/config/list`,postJson(undefined,100));
}
export function pillowConfigAdd(params) {
    return post(`/pillow/config/add`,params);
}
export function pillowConfigEdit(params) {
    return put(`/pillow/config/edit/${params.pillconfId}`, params);
}
export function pillowConfDel(id) {
    return deletes(`/pillow/config/delete/${id}`);
}
// 偏好
export function preferenceList(params) {
    return get(`/b_pre/optional/query`);
}
export function preferenceAdd(params) {
    return post(`/b_pre/optional/add`,params);
}
export function preferenceEdit(params) {
    return put(`/b_pre/optional/edit/${params.preId}`, params);
}
export function preferenceDel(id) {
    return deletes(`/b_pre/optional/del/${id}`);
}

// 文案
export function regulateList(params) {

    return post(`/b_pre/regulate/list`,postJson(params));
}
export function regulateAdd(params) {
    return post(`/b_pre/regulate/add`,params);
}
export function regulateDel(id) {
    return deletes(`/b_pre/regulate/delete/${id}`);
}
export function regulateEdit(params) {
    return put(`/b_pre/regulate/edit/${params.preId}`, params);
}
// 二维码
export function orCodeList(params) {
    return post(`/b_pre/list`,postJson(undefined,3));
}
export function orCodeAdd(params) {
    return post(`/b_pre/add`,params);
}
export function orCodeEdit(params) {
    return put(`/b_pre/edit/${params.preId}`, params);
}
export function orCodeDel(id) {
    return deletes(`/b_pre/delete/${id}`);
}
// 添加公式
export function formulaAdd(params) {
    return put(`/b_mattressGrade/edt/formula`, params);
}
// 获取公式
export function formulList() {
    return get(`/b_mattressGrade/formula/info`);
}
// export function accountList(params) {
//     return post(`/b_equipment/listAll`, postJson(params));
// }
// 字典表
export function dictionaries(id, status) {

    return get('/sysDict/query');
}
export function dictionariesT() {

    return get(`/sysDict/query?type=1`);
}
// 权重配置
export function weight(id, status) {

    return get('/weightConfigure/info');
}
export function weightEdit(params) {

    return put(`/weightConfigure/edt`,params);
}
// 导购
export function shoppingList(stored) {
    return post(`/b_store/listStoreGuide/${stored}`);
}
export function shoppadd(params) {
    return post(`/b_store/insertStoreGuide`,params);
}
export function shoppdel(id) {
    return deletes(`/b_store/deleteStoreGuide/${id}`);
}
export function shoppEdit(params) {

    return post(`/b_store/updateStoreGuide`, params);
}