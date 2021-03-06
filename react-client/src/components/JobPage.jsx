import React from 'react';
import { Button, FormControl, Row, Col, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';

class JobPage extends React.Component {
  constructor(props) {
 	super(props);

	this.state={
		// job info
		jobId:'',
		jobTitle:'',
		category:'',
		jobDescription:'',

		from:'',
		to:'',
		dateFrom: '',
		dateTo: '',
		salary:0,

		// userinfo
		user:'',
		phoneNumber:0,
		loggedUser:'',
		intestUsers:[],
		selectedUser:''

  }

  this.handleInterests=this.handleInterests.bind(this);
  this.insertInterests=this.insertInterests.bind(this);
  this.handleChange=this.handleChange.bind(this);
  this.assignUser=this.assignUser.bind(this);

}

componentDidMount(){

	 axios.get(`/jobinfo/${this.props.match.params.jobid}`)
    .then(response => {
    const jobInfo = response.data[0];
    console.log(jobInfo);
    this.setState({
    	jobTitle:jobInfo.jobTitle,
    	category:jobInfo.category,
    	salary:jobInfo.salary,
		from:jobInfo.from,
		to:jobInfo.to,
		jobDescription:jobInfo.jobDescription,
		dateFrom:jobInfo.dateFrom,
		dateTo:jobInfo.dateTo,
		user:jobInfo.userInfo[0].userName,
		phoneNumber:jobInfo.userInfo[0].phoneNumber,
		jobId:this.props.match.params.jobid,
		
 
    })
        this.handleInterests();
        this.loadInterestusres();
        //this.handleChange();

    
  })
  .catch(function (error) {
    console.log(error);
  });

}

loadInterestusres(){
	//console.log(this.state.jobId);
	 axios.get(`/interest/${this.state.jobId}`)
    .then(response => {
    //const jobInfo = response.data[0];
    //console.log(response.data);

    this.setState({intestUsers:response.data})
    console.log(this.state.intestUsers);
    })
  .catch(function (error) {
    console.log(error);
  });

}



handleInterests(){
	//console.log(this.state.jobId);
	 axios.get('/job/interest')
    .then(response => {
    const loggedUser = response.data;
    console.log(loggedUser===this.state.user);

    this.setState({
    	loggedUser:loggedUser
    })
  
  })
  .catch(function (error) {
    console.log(error);
  });

}


handleChange(e){
	this.setState({selectedUser:e.target.value});

}


assignUser(){
	//console.log(this.state.selectedUser)

	axios.post('/assignjob', { jobId:this.state.jobId,user:this.state.selectedUser})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
	
  .catch(function (error) {
    console.log(error);
  });
}
insertInterests(){
	axios.get(`/job/interest/${this.state.jobId}`)

	.then(response => {
	    //const loggedUser = response.data;
	    //console.log(loggedUser===this.state.user);

	    console.log("success");
	  
	  })
	  .catch(function (error) {
	    console.log(error);
	  });


}

render() {
	return (
		<div id="details" className="container wrapper well">
			<div id="divv">
			<br />
			<h1>Job Info</h1>
			<br />
			<br />
			<Row>
			<Col md={1}>
			</Col>
			<Col md={2}>
			<span id="span4"> jobTitle : </span>
			</Col>
			<Col md={2} id="x">
			{this.state.jobTitle}
			</Col>
			<Col md={4}>
			<span id="span4"> jobCategory : </span>
			</Col>
			<Col md={1} id="x">
			{this.state.category}
			</Col>
			</Row><br />
			
			<Row>
			<Col md={4}>
			</Col>
			<Col md={2}>
			<span id="span4"> JobDescription: </span>
			</Col>
			<Col md={2} id="x">
			{this.state.jobDescription}
			</Col>
			</Row><br />

			<Row>
			<Col md={1}>
			</Col>
			<Col md={2} id="span3">
			Time:
			</Col>
			<Col md={1}>
			<span id="span3">From : </span>
			</Col>
			<Col md={1} id="y">
			{this.state.from}
			</Col>
			<Col md={1}>
			<span id="span3"> To : </span>
			</Col>
			<Col md={1} id="y">
			{this.state.to}
			</Col>

			<Col md={1} id="span3">
				Salary:{this.state.salary}
			</Col>

			</Row><br />

			<Row>
			<Col md={1}>
			</Col>
			<Col md={2} id="span3">
			Date:
			</Col>
			<Col md={1}>
			<span id="span3"> From : </span>
			</Col>
			<Col md={1} id="y">
			{this.state.dateFrom}
			</Col>
			<Col md={1}>
			<span id="span3"> To : </span>
			</Col>
			<Col md={2} id="y">
			{this.state.dateTo}
			</Col>
			</Row><br />
			</div>
			<hr/>

			<div id="divv">
			<br />
			<br />
			<h1> Job provider Info</h1>
			<br />
			<br />
			<Row>
			<Col md={2}>
			</Col>
			<Col md={3}>
			<span id="span4"> Job Provider:</span>
			</Col>
			<Col md={2} id="x">
			{this.state.user}
			</Col>
			<Col md={2}>
			<span id="span4">PhoneNumber:</span>
			</Col>
			<Col md={1} id="x">
			{this.state.phoneNumber}
			</Col>
			</Row><br />
			<br />
			</div>
			<br />

			<div id="div2">
			Interested Users:
			<select onChange={this.handleChange}>
			<option value='select user'>select user</option>
			{this.state.intestUsers.map(function(user,index){ return(
				<option key={index} value={user.username}>{user.username}</option>
			)
			})
			}
			</select>

			</div>		
			{this.state.loggedUser!==this.state.user?<div>
				<button id="but" onClick={this.insertInterests}>I'm Interested</button></div>:
				 <div><button id="but" onClick={this.assignUser} >Assign The User</button>
			 </div>}

		</div>

		

	)
  }
}
export default JobPage;