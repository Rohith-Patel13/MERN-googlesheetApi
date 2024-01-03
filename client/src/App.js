import React, { Component } from 'react';
import './App.css';

class  App extends Component {

  state = {vendorName:"",num:"",location:"",product:"",price:"",formFilledBy:"",isFixed:false,fixedArr:[]}

  typeName = (event)=>{
    this.setState({vendorName:event.target.value})
  }

  typeNum = (event)=>{
    this.setState({num:event.target.value})
  }

  typeLocation = (event)=>{
    this.setState({location:event.target.value})
  }

  typeProduct = (event)=>{
    this.setState({product:event.target.value})
  }

  typePrice = (event)=>{
    this.setState({price:event.target.value})
  }

  typeFormFilledBy = (event)=>{
    this.setState({formFilledBy:event.target.value})
  }

  fixBtnClicked = () => {
     const { vendorName, num, location } = this.state;
     if (!vendorName || !num || !location) {
      alert("Vendor Name, Vendor Number, Location must be filled before saving!");
      return;
    }

     if (num.length !== 10) {
      alert("Contact number must be 10 digits!");
      return;
    }
    this.setState({ isFixed:true,fixedArr:[vendorName, num, location]});
    alert("Vendor details saved successfully!");
  };

  sendBtnClicked = ()=>{
    
      const {vendorName,num,location,product,price,formFilledBy,isFixed,fixedArr}=this.state
      if (!vendorName || !num || !location || !product || !price || !formFilledBy) {
        alert("All fields must be filled!");
        return;
      }
      if (num.length !== 10) {
        alert("Contact number must be 10 digits!");
        return;
      }
      
      let newDetails;
      if(isFixed){
        newDetails ={
          nameVal:fixedArr[0],
          numVal:fixedArr[1],
          locationVal:fixedArr[2],
          timestampVal:new Date(),
          productVal:product,
          priceVal:price,
          formFilledByVal:formFilledBy
        }
      }else{
        newDetails ={
          nameVal:vendorName,
          numVal:num,
          locationVal:location,
          timestampVal:new Date(),
          productVal:product,
          priceVal:price,
          formFilledByVal:formFilledBy
        }
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

        if(isFixed){
          this.setState({
            product:"",
            price:"",
            formFilledBy:""
          })          
        }else{
          this.setState({
            vendorName:"",
            num:"",
            location:"",
            product:"",
            price:"",
            formFilledBy:""
          })
        }

      
      alert("Form submitted successfully!");
    
  }

  resetBtnClicked = () => {
    this.setState({
      vendorName: "",
      num: "",
      location: "",
      product: "",
      price: "",
      formFilledBy: "",
      isFixed:false,fixedArr:[]
    });
  };

  render(){
    const {vendorName,num,location,product,price,formFilledBy}=this.state
    
    return (
      <div className="form-container">
        <h2>Vendor Form</h2>
        <div>
          <label htmlFor="name">Vendor Name:</label>
          <input type="text" id="name"  placeholder="Enter Vendor Name" value={vendorName} onChange={this.typeName} required />
  
          <label htmlFor="tel">Vendor Contact Number:</label>
          <input type="tel" id="tel" placeholder="Enter Vendor Contact Number" value={num} onChange={this.typeNum} required />

          <label htmlFor="location">Vendor Location </label>
          <input type="text" id="location"  value={location} onChange={this.typeLocation} required />
       

          <label htmlFor="desc">Product 1:</label>
          <input type="text" id="desc"  value={product} onChange={this.typeProduct} required />

          <label htmlFor="desc2">Price 1:</label>
          <input type="text" id="desc2"  value={price} onChange={this.typePrice} required />

          <label htmlFor="desc3">Form Filled by</label>
          <input type="text" id="desc3"  value={formFilledBy} onChange={this.typeFormFilledBy} required />

          <div className='btnBg'>
            <button type="button" onClick={this.fixBtnClicked}>Fix</button>
            <button type="button" onClick={this.sendBtnClicked}>Send</button>
            <button type="button" onClick={this.resetBtnClicked}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
