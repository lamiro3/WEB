import React, { Component } from 'react';

class PhoneInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            info: [
                {
                    name:"Guide",
                    phone:"010--6654-4076"
                },{
                    name:"Alice",
                    phone:"010-0000-0000"
                },{
                    name:"Jake",
                    phone:"010-0000-0004"
                }
            ],

            storage: ''
        };

        this.searchInfo = this.searchInfo.bind(this);
    }

    searchInfo(i) {
        this.setState({
            storage: i.target.value
        });
    }

    render() {
        const setInfo = (data) => {
            data.sort();
            data = data.filter();
        }

        return(
            <div>
                <h1>Your Friends</h1>
                <input 
                type="text" 
                placeholder="Search"
                value={this.state.storage}
                onChange={this.searchInfo}
                >

                </input>
            </div>
        );
    }
}

export default PhoneInfo;