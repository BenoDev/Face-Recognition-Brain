import React,{Component} from 'react';
import axios from 'axios';


class Register extends Component {
	state ={
		email:'',
		password :'',
		name :''
	}
	onEmailChange = (event)=>{
		this.setState({email:event.target.value})
	}
	onPasswordChange = (event)=>{
		this.setState({password:event.target.value})
	}
	onNameChange = (event)=>{
		this.setState({name:event.target.value})
	}
	onSubmitSignIn = ()=>{
		axios.post('http://localhost:3000/register',{
			"email":this.state.email,
			"password": this.state.password,
			"name": this.state.name,
		}).then((user)=>{
			
			if(user.data.id){
				this.props.loadUser(user.data)
				this.props.onRouteChange('home')
			}
		})
		.catch(console.log)
	}
	render(){
		return(
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			       <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">name</label>
			        <input
			        onChange={this.onNameChange}
			        value = {this.state.name}
			         className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			         type="text" 
			         name="name"  
			         id="name"/>
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
			        onChange={this.onEmailChange}
			        value = {this.state.email}
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" 
			        name="email-address"
			        id="email-address"/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
			        onChange={this.onPasswordChange}
			        value = {this.state.password}
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" 
			        name="password"  
			        id="password"/>
			      </div>			
			    </fieldset>
			    <div className="">
			      <input 
			      onClick= {this.onSubmitSignIn}
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
			       type="submit" 
			       value="Register"/>
			    </div>			 
			  </div>
			</main>
		</article>		
	)
	}
	
}

export default Register;