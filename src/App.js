import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// Note that Highcharts has to be required separately
var ReactHighcharts = require('react-highcharts');
var config = {
  yAxis: {
    title:{
		text:'Temperature'
	}
  },
   xAxis: {
    categories: [],
	title:{
		text:'Dates'
	}
  },
   title: {
        text: 'Weather report'
    },
  series: [{
    data: [],
	name:'Max Temperature'
	
  },{
    data: [],
	name:'Min Temperature'
  }]
};
 class App extends Component {
	
	 constructor(props) {		
        super(props);	
		this.state={'config':{},value: 'London,uk'};		
		this.performSearch = this.performSearch.bind(this);
		this.onKeyUp =this.onKeyUp.bind(this);
    }  
  /*componentDidMount() {
    let chart = this.refs.chart.getChart();
    chart.series[1].addPoint({x: 10, y: 12});
  }*/
  performSearch(){
	  var  query = this.state.value;	  
	   fetch('http://api.openweathermap.org/data/2.5/forecast?appid=3c8bd23cff0c45dc17d1df151dbc10e1&units=metric&q='+query).then(response =>  {			
			return response.json();
		}).then(resData => {
      // console.log(JSON.stringify(resData));
	  if(!resData.list){
		  alert(resData.message);
	  }else{
		   config.title.text= "Weather report for " +query;
		  resData.list.map((item) => {
			  config.xAxis.categories.push(item.dt_txt);
			  config.series[1].data.push(item.main.temp_min);
			  config.series[0].data.push(item.main.temp_max);
		  });
		 // console.log(config.xAxis.categories);
		   //do your logic here       
		   //let person = resData.results
		   this.setState({ 'config': config }); //this is an asynchronous function
	  }
	 
    });
  } 
 componentWillMount() {
	  this.performSearch();	
 }
 onKeyUp (event) {	 
    if(event.key ==="Enter"){
		this.state.value= event.target.value;
		this.performSearch();
	}
  }
  render() {
    return ( <div className="App">
				<header className="App-header">
				  <img src={logo} className="App-logo" alt="logo" />
				  <h1 className="App-title">Welcome to Weather Report Application</h1>
				</header>
				<p className="App-intro">
				  To get started, Please enter your City& Country and press enter.
				</p>
				<div className='row'>
					<input type="text" ref="city"  placeholder ='City,Country'  onKeyDown={this.onKeyUp}/>
				</div>
				<ReactHighcharts config={this.state.config} ref="chart"></ReactHighcharts>
		</div>
		);
  }
}
export default App;
