import Util from "util/mm.js"

const _mm    = new Util();

class User{
    //用户登录
    login(data){
        return _mm.request({
            type : 'post',
            url  : '/manage/user/login.do',
            data 
        });
    }
    // 退出登录
    logout(){
        return _mm.request({
            type    : 'post',
            url     : '/user/logout.do'
        });
    }
    getUserList(listParam){
        let data = {};
        data.pageNum = listParam.pageNum;
        data.pageSize = listParam.pageSize;
        return _mm.request({
            type    : 'post',
            url     : '/manage/user/list.do',
            data
            // data    : {
            //     pageNum : pageNum
            // }
        });
    }

}

export default User;