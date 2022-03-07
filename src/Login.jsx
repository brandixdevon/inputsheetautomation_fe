import React, { useState } from 'react';
import { Paper, Grid, TextField, Button } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';
import { baseUrl } from './utils/baseUrl';
import { Redirect } from 'react-router-dom';


const Login_Page = () => {
	
	const [USERNAME, setUSERNAME] = useState([""]);
	const [PASSWORD, setPASSWORD] = useState([""]);
    const [redirect, setRedirect] = React.useState(false);


    const changeUsername = (e) => {
        setUSERNAME(e.target.value);
    }

    const changePassword = (e) => {
        setPASSWORD(e.target.value);
    }

    const checklogin = () => {
        
        if(USERNAME.length < 4)
        {
            alert('Please Enter Your Brandix Email ID.')
        }
        else if(PASSWORD.length < 4)
        {
            alert('Please Enter Your Password.')
        }
        else
        {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
            };

            fetch(baseUrl + 'user/authadaccount',requestOptions)
            .then(response => response.json())
            .then(data => {

                if(data.Type === "SUCCESS")
                {
                    localStorage.setItem('uname', data.username);
                    setRedirect(true);
                }
                else if(data.Type === "ERROR")
                {
                    localStorage.removeItem('uname');
                    localStorage.clear();
                    alert(data.Msg);
                }
                else
                {
                    localStorage.removeItem('uname');
                    localStorage.clear();
                    alert('System can not validate user.');
                }
            });
        
        }
    }

    const renderRedirect = () => {
        if (redirect) 
        {
          return <Redirect to={"/"} />
        }
        else
        {
          localStorage.clear();
          return <Redirect to={"/login"} />
        }
    
    }


	return (<>
		<Paper style={{padding:'10px'}}>
        {renderRedirect()}
                <div style={{margin:'10px',width:'100%',marginLeft:'auto',marginRight:'auto',marginTop:'20px',textAlign:'center'}}>
                    <h3>INPUT SHEET AUTOMATION TOOL</h3>
                    <p>( VS SLEEP / VS MODERN / PINK )</p>
                </div>
                <div style={{margin:'10px',width:'400px',marginLeft:'auto',marginRight:'auto',marginTop:'50px',borderRadius:'10px',padding:'20px',backgroundColor:"#dbdbdb"}}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField onChange={changeUsername} id="username" label="Email : devonp@brandix.com" type="email" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField onChange={changePassword} id="username" label="Password : *******" type="password" fullWidth required />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button onClick={checklogin} variant="contained" color="primary" style={{ textTransform: "none" }}>Login</Button>
                    </Grid>
                </div>
            </Paper>
		</>
	);
};

export default Login_Page;
