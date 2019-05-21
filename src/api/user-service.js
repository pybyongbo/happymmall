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
    getUserList(pageNum){
        return _mm.request({
            type    : 'post',
            url     : '/manage/user/list.do',
            data    : {
                pageNum : pageNum
            }
        });
    }

}

export default User;