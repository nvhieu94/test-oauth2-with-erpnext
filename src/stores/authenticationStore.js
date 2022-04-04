import { action, autorun, observable } from "mobx";
import { AuthenticationRequest } from "../requests/AuthenticationRequest";

class AuthenticationStore {
  constructor() {
    autorun(() => {
      if (this.pageConfigs) {
        const configs = JSON.parse(this.pageConfigs);
        this.configScreens = configs;
      }
      if (this.loginInfo) {
        const userInfo = JSON.parse(this.loginInfo);
        this.accessToken = userInfo?.sid;
        this.expires = userInfo?.sid_expires
      }
    });
  }


  @observable loginInfo = localStorage.getItem("u") || undefined;
  @observable accessToken;
  @observable accessToken;
  @observable currentUser = undefined;
  @observable pageConfigs = localStorage.getItem("page_configs") || undefined;
  @observable configScreens;

  @action userLogin = (payload) => {
    return new Promise((resolve, reject) => {
      AuthenticationRequest.userLogin(payload)
        .then(response => {
          console.log('response:',response)
          if(response.data) {
            const u = JSON.stringify(response.data);
            localStorage.setItem("u", u);
            this.loginInfo = u;
          }
          resolve(response.data);
        })
        .catch(error => reject(error));
    });
  };

  @action userLogout = () => {
    this.accessToken = undefined;
    this.currentUser = {};
    localStorage.clear();
    return Promise.resolve();
  };
  @action cancelRequest = () => {
    AuthenticationRequest.cancelRequest();
  };
}

export default new AuthenticationStore();
