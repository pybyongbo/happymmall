import fetch from "util/fetch";

export function login(data) {
    console.log(data);
    return fetch({
      url: '/manage/user/login.do',
      method: 'post',
      data:data
    })
}