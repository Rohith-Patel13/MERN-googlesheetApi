import React, { Component } from 'react';
import './App.css';

class  App extends Component {

  state = {userName:"",email:"",desc:""}

  typeName = (event)=>{
    this.setState({userName:event.target.value})
  }

  typeEmail = (event)=>{
    this.setState({email:event.target.value})
  }

  typeMessage = (event)=>{
    this.setState({desc:event.target.value})
  }

  sendBtnClicked = ()=>{
    const {inputTaskValue}=this.state
    if(inputTaskValue===""){
      alert("Add Some Details...")
    }
    else{
      const {userName,email,desc}=this.state
      const newDetails ={
        nameVal:userName,
        emaiVal:email,
        descVal:desc
      }
      console.log(newDetails)
      const options={
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDetails),
      }

      fetch('/send',options)
        .then((response) => response)
        .then((parsedData) => {
          return parsedData
        })
        .catch((error) => {
          console.error('Error while posting data:', error.message);
        });

      this.setState({
        userName:"",
        email:"",
        desc:""
      })
    }
  }


  render(){
    const {userName,email,desc}=this.state
    
    return (
      <div className="form-container">
        <h2>User Details to Google sheets</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={userName} onChange={this.typeName} required />
  
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={this.typeEmail} required />
  
          <label htmlFor="desc">message:</label>
          <input type="text" id="desc" name="message" value={desc} onChange={this.typeMessage} required />
  
          
            <button type="button" onClick={this.sendBtnClicked}>Send</button>
          
        </div>
      </div>
    );
  
  }
}

export default App;