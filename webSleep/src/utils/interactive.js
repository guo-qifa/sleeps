import * as tool from "./api";

export default {
    name: "Interactive",
    data() {
        return {
            query: {
                pageNum: 1
            },
            tableData: [],
            multipleSelection: [],

            editVisible: false,
            pageTotal: 0,
            type: [],


            idx: -1,
            id: -1,
            alertTitle: '新增',
            fucTxet: '',
            flag:true,

        }
    },
    methods: {
        handleSearch(){
            this. query.pageNum = 1
            this.getData(this.fucTxet)
        },
        resetForm(){
            this.$refs.query.resetFields();
            this.getData(this.fucTxet)
        },
        getData(fucName, cb) {
            let _this = this
            this.fucTxet = fucName

            tool[fucName] && tool[fucName](this.query)
                .then(res => {
                    if(fucName=='powerList'  ){
                        _this.tableData = res.result
                    }else if(fucName=='preferenceList' && res.result){
                        _this.tableData = [res.result]
                    }else {
                        _this.tableData = res.result.records || {};
                        _this.pageTotal = res.result.total || 0;
                        cb && cb();
                    }

                })


        },
        // 添加编辑
        submitForm(formName, fucName) {
            let _this = this
            // 树形数据
            if((fucName[0] =='rolAdd' )|| fucName[1] =='powerEdit'){
                let treelist = [];
                let d =this.$refs.tree.getCheckedNodes()
               for(let i=0;i<d.length;i++){
                   treelist.push(d[i].id)
                   treelist.push(d[i].parentId)
                   if(d[i].children){
                       for (var j in d[i].children){
                           treelist.push(d[i].children[j].id)
                       }
                   }
               }
                let n =[...new Set(treelist)]
                this.form.listMenuIds = n
            }
            if(fucName[0] =="staffAdd"){
                this.form = Object.assign({}, this.addUserform);
                delete this.form.passwords


            }
            if(fucName[1] =="staffPass"){
                this.form = Object.assign({}, this.editUserform);
                delete  this.form.newPasswords


            }
            if(fucName[0] =="resetPass"){
                this.form = this.editUserform
                delete this.form.oldPassword
            }
            if(fucName[0] =="weAdd"){
                delete this.form.createTime
            }
            if(fucName[1] =="rolEdit"){
                delete this.form.menus
                delete this.form.roleName

            }


            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (_this.alertTitle == "新增" && _this.cTxet!=='编辑' && fucName[1]!='staffPass' ) {
                        tool[fucName[0]] && tool[fucName[0]](this.form)
                            .then(res => {
                                if (res.code === 200) {
                                    if(this.addUserVisible){
                                        _this.addUserVisible = false
                                    }
                                    if(this.editUserVisible){
                                        _this.editUserVisible= false
                                    }
                                    if(fucName == 'resetuserMyPass'){
                                        localStorage.removeItem('loginUserinfo');
                                        _this.$router.push('/login');
                                    }


                                    this.editVisible = false;
                                    this.$message.success(res.message);
                                    if (this.fucTxet =='storeList'){
                                        this.getData("storeList", ()=>{
                                            for(let i = 0;i < this.tableData.length;i++){
                                                this.$set(this.tableData[i], 'child' ,[]);
                                            }
                                        });

                                    }else {
                                        this.getData(this.fucTxet);
                                    }

                                } else {
                                    this.$message.error(res.message);
                                }
                            })

                    } else {
                        tool[fucName[1]] && tool[fucName[1]](_this.form)
                            .then(res => {
                                if (res.code === 200) {
                                    _this.editVisible = false;
                                    if(this.addUserVisible){
                                        this.addUserVisible = false

                                    }
                                    if(this.editUserVisible){
                                        _this.editUserVisible= false
                                    }
                                    if(fucName[1] == 'staffPass'){
                                        this.getData("storeList", ()=>{
                                            for(let i = 0;i < this.tableData.length;i++){
                                                this.$set(this.tableData[i], 'child' ,[]);
                                            }
                                        });
                                    }


                                    this.$message.success(res.message);
                                    this.$set(this.tableData, this.idx, this.form);
                                    this.getData(this.fucTxet);
                                } else {
                                    this.$message.error(res.message);
                                }

                            })
                    }


                } else {
                    return false;
                }
            });

        },
        // 删除操作
        handleDelete(index, row, fucName) {
            if(fucName == 'storeDel'){
                row.id = row.storeId
            }
            if(fucName == 'rolDel'){
                row.id = row.roleId
            }
            if(fucName =='equipmentDel'){
                row.id = row.equipmentId

            }
            if(fucName =='fitDel'){
                row.id = row.gradeId
            }
            if(fucName =='staffDel'){
                row.id = row.storeUserId
            }
            if(fucName =='pillowDel'){
                row.id = row.pillowId
            }
            if(fucName =='pillowConfDel'){
                row.id = row.pillconfId
            }
            if(fucName =='preferenceDel'){
                row.id = row.preId
            }
            if(fucName =='regulateDel'){
                row.id = row.preId
            }
            if(fucName =='orCodeDel'){
                row.id = row.preId
            }
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    tool[fucName] && tool[fucName](row.id)
                        .then(res => {
                            if (res.code === 200) {
                                this.$message.success('删除成功');
                                if(fucName =='pillowConfDel' || fucName =='regulateDel'){
                                    this.getInfo()
                                }else if(fucName =='orCodeDel'){
                                    this.getInfo2()
                                }else {
                                    this.getData(this.fucTxet);

                                }
                            } else {
                                this.$message.error(res.message);
                            }

                        })

                }).catch(() => {
            });

        },

        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageNum', val);
            this.getData(this.fucTxet);
        },
        addAlert() {
            this.editVisible = true;
            this.alertTitle = "新增"


        },
        handleClose(n) {
            if(n){
                this.$refs[n].resetFields();
            }else {
                this.$refs.form.resetFields();

            }
            if( this.$refs.tree){
                this.$refs.tree.setCheckedKeys([]);

            }


        },
        changeSwitch(index, row, fucName,code) {
            if(this.jurisdiction(code) == undefined){
                this.$message.error('您没有相关操作权限!')
                return false
            }

            let _this = this
            // 关传2  开传1
            if(fucName =='fitStatus'){
                row.id = row.gradeId
            }
            if(fucName =='equipmentStatus'){
                row.id = row.storeId
            }
            let status = row.status ? {status: row.status =='1' ? 2 : 1}:{status: row.flag =='1' ? 2 : 1} ;
            tool[fucName] && tool[fucName](row.id, status)
                .then(res => {
                    if (res.code === 200) {
                        _this.$message.success('修改成功');
                        _this.getData(this.fucTxet);

                        if(fucName =='equipmentStatus'){

                            return row.flag = !row.flag
                        }else {
                            return row.status = !row.status
                        }


                    } else {
                        _this.$message.error(res.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                });


        },
        handleEdit(index, row) {

            if(this.fucTxet == 'fitList'){
                row.sleepDiscomfortList = row.sleepDiscomfort.split(',')

            }
            if(this.fucTxet == 'rolList'){
                row.name = row.roleName
                this.alertFlag = true

            }
            this.alertTitle = '编辑';
            this.editVisible = true;
            let num = ["level", "source", "status","flag",'sex','tisSpecification'];
            for (var i = 0; i < num.length; i++) {
                for (var item in row) {
                    if (num[i] == item) {
                        row[item] = row[item].toString()
                    }
                }
            }
            this.$nextTick(() => {

                this.form = Object.assign({}, row);

            })

        },
        getRowText(b,c,d,t){

            let o = b[c]
            let v = this.viewList;
            for(var i in v){
                if(i == d){
                    for (let  j in v[i]){
                        if (o == v[i][j].itemCode){
                            return v[i][j].itemValue
                        }

                    }

                }
            }



        },
        getArrText(o,c){
            let  d  = o[c].split(',')
            let b = this.sleepDiscomfort;
            let  arr = []
            for(let i=0;i<d.length;i++){
                for(let item in b){
                    if(d[i] == b[item].itemCode){
                        arr.push( b[item].itemValue)
                    }
                }
            }
            return arr.join(',')

        },
        // 权限配置
        jurisdiction(code){
            let menus = JSON.parse(localStorage.loginUserinfo).menus;
            for(let i=0;i<menus.length;i++){
                if(code == menus[i].frontCode){
                    return true
                }
            }
        }


    }
}
