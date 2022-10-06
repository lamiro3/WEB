import React, { Component } from 'react';
import update from 'react-addons-update';
import './scss/SetInfo.scss';

class SetInfo extends Component {
    constructor(props){
    super(props);
    this.state = {
        keyword: '',

        newdata: {
            name: "",
            phone:""
        },

        infodata: [
            {
                id:0,
                name:"Ash",
                phone:"010-0000-0000"
            },{
                id:1,
                name:"Bandit",
                phone:"010-0000-0001"
            },{
                id:2,
                name:"Jager",
                phone:"010-0000-0004"
            }
            ]
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({keyword: e.target.value});
    }

    render() {
        const CreateData = () => {
            this.setState({
                infodata: update(
                    this.state.infodata,
                    {
                        $push: [this.state.newdata.name, this.state.newdata.phone]
                    }
                )
            });
        };

        const Setdata = (data) => {
            data.sort((a,b) => {return a.name>b.name;}); //set alphabet sort 
            data = data.filter(
                (infodata) => {
                    return infodata.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
                }
            );
            return data.map((info, i) => {
                return <PrintInfo infodata={info} key={i}/>;
            });
        };

        return(
            <div className="Result-Profile">
                <h1>Search</h1>
                <input
                    size="20px"                   //FIXME  
                    name="keyword"
                    placeholder="SearchBox"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />

                <div>{Setdata(this.state.infodata)}</div>

                <h1>Add</h1>
                <input
                    size="20px"                   //FIXME  
                    name="keyword"
                    placeholder="Name"
                    value={this.state.newdata.name}
                />
                <input
                    size="20px"                   //FIXME  
                    name="keyword"
                    placeholder="Phone"
                    value={this.state.newdata.phone}
                />
                <button
                    placeholder="Add-button"
                    onClick={CreateData}
                >Add</button> 
            </div>
        );
    } 
}

class PrintInfo extends Component {
    render() {
        return(
            <div>
                <div className="Each-Profile">{this.props.infodata.name} {this.props.infodata.phone}</div>
                <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet"></link>
                <style>
                </style>
            </div>
        );
    }
}

export default SetInfo;