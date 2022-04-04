import React, { useEffect, useRef, useState } from 'react'
import { inject, observer } from 'mobx-react'
import axios from 'axios'
import oauth from 'axios-oauth-client'
import { useHistory } from 'react-router-dom'
import {useLocation} from "react-router-dom";
var ClientOAuth2 = require('client-oauth2')
const AuthenticationCallbackPage =(props) => {
    const history = useHistory()
    const {match,location} = props;
    const search = useLocation().search;

    useEffect(() => {
        const code = new URLSearchParams(search).get('code');
        console.log('code',code)


        // var githubAuth = new ClientOAuth2({
        //     clientId: 'e1cf85a8d7',
        //     clientSecret: '1a6e460335',
        //     accessTokenUri: 'https://gas-dev.dpotech.vn/api/method/frappe.integrations.oauth2.get_token',
        //     authorizationUri: 'https://gas-dev.dpotech.vn/api/method/frappe.integrations.oauth2.authorize',
        //     redirectUri: 'https://localhost:3000/callback',
        //     scopes: ['all', 'openid']
        //   })
        

        //   console.log('githubAuth',githubAuth.jwt)
        //   githubAuth.credentials.getToken()
        //   .then(function (user) {
        //     console.log('user12312',user) //=> { accessToken: '...', tokenType: 'bearer', ... }
        //   })
        //   githubAuth.code.getToken('https://gas-dev.dpotech.vn/api/method/frappe.integrations.oauth2.authorize').then(res => {
        //     console.log('res:',res) 
        // }).catch(error => {
        //     console.log(error) 
        // })
        // githubAuth.token.getToken('https://gas-dev.dpotech.vn/api/method/frappe.integrations.oauth2.get_token'),then(user => {
        //     console.log('user:', user) 
        // }).catch(error => {
        //     console.log('error',error) 
        // })
        let data = {
             url: 'https://gas-dev.dpotech.vn/api/method/frappe.integrations.oauth2.authorize',
             //grant_type: 'client_credentials',
             ///grant_type: "password",
             grant_type: 'authorization_code',
             client_id: 'e1cf85a8d7',
             // client_secret: '04f829afea',
             redirect_uri: 'https://localhost:3000/callback',
             code: code,
             scope: 'all openid',
             username: 'trangph@gmail.com',
             password:'gas@12345',
        }
        const requestGetToken = oauth.client(axios.create(), data);
        requestGetToken().then((response)=>{
            // var token = githubAuth.createToken(response.access_token, response.refresh_token, "Bearer");
            // console.log('token',token)
            axios({
                method:'GET',
                url:'https://gas-dev.dpotech.vn/api/method/frappe.integrations.oauth2.openid_profile',
                headers: {
                    Authorization: "Bearer " + response.access_token
                }
            }).then(res => {
                console.log('user',res)
            }).catch(error => {
                console.log('error',error)
            })
            // localStorage.setItem("response", response);
            history.push('/')
        });

        // axios({
        //     method:'GET',
        //     url: 'https://gas-dev.dpotech.vn/api/method/frappe.integrations.oauth2.authorize',
        //     params: {
        //         client_id: 'e1cf85a8d7',
        //         redirect_uri: 'https://localhost:3000/callback',
        //         code: code,
        //         state: '444',
        //         scope:'openid%20all',
        //         response_type:code
        //     }
        // })

        // oauth.client(
        //     axios({
        //         method:'POST',
        //         url: 'https://gas-dev.dpotech.vn/api/method/frappe.integrations.oauth2.get_token',
        //         data: {
                  
        //             client_id: 'e1cf85a8d7',
        //             redirect_uri: 'https://localhost:3000/callback',
        //             state: '444',
        //             code: code,
        //             scope:'openid all',
        //             response_type:code,
        //             grant_type: 'authorization_code',
        //             code_verifier:420
        //         },
        //         headers: {
        //             "Content-Type": "application/x-www-form-urlencoded"
        //         }
        //     }));

      

        // const requestGetToken = oauth.client(axios.create(), {
        //     url: 'https://gas-dev.dpotech.vn/api/method/frappe.integrations.oauth2.get_token',
        //     grant_type: 'authorization_code',
        //     client_id: '98b474f3bb',
        //     redirect_uri: 'https://localhost:3000/callback',
        //     code: code,
        //     scope: 'all openid',
        //     code_verifier: "420",
        // });
        // requestGetToken().then((response)=>{
        //     console.log("token", response);
        //     localStorage.setItem("token", response.id_token);
        //     history.push('/')
        // });
    })
    return (
        <div>
            Callbackádsadsadsadsada
        </div>
    )
}

export default inject()(observer(AuthenticationCallbackPage))
