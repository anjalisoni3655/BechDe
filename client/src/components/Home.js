import React from 'react';
import { NavLink } from 'react-router-dom';
import '../static/css/app.css';
import Header from './Header';
import Footer from './footer';
import { category } from '../config/category';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            category: [],
            place: ''
        };
    }
    componentDidMount() {
        this.setState({ category: category })

        var input = document.getElementById('location');
        var options = {
            types: ['(cities)'],
            componentRestrictions: { country: "pak" }
        };
        let autoComplete = new window.google.maps.places.Autocomplete(input, options);
        autoComplete.addListener('place_changed', () => {
            var place = autoComplete.getPlace().name;
           
            const upper = this.capital(place);
            window.location = '/cities/' + upper;
            console.log(upper);

        });
    }
    _handleKeyPress = () => {
        alert("search");
    
    }
    capital = (str) => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }


    render() {
        return (
          <div>
            <div id="container" className="container">
              <Header />
              <div id="content">
                <div id="form-bg">
                  <div id="form-overlay">
                    <div className="row">
                      <div className=" col-md-8 col-lg-8" id="iconform">
                        <input
                          type="text"
                          className="form-control"
                          id="location"
                          onKeyPress={this._handleKeyPress}
                          placeholder="Search the item"
                        />
                        <i className="fa fa-map-marker-alt"></i>
                      </div>

                      <div className="col-md-2  col-lg-2">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          id="search-btn"
                        >
                          <i className="fa fa-search"></i>
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="main-content" className="row">
                  <div
                    id="catagory"
                    className="col-md-6 col-sm-6 col-xs-6 col-lg-6"
                  >
                    {this.state.category.map((item, i) => {
                      return (
                        <NavLink to={`/list/${item.cate}`} key={item.cate}>
                          {" "}
                          <div id="cate-item">
                            <img
                              src={item.ic}
                              alt={item.cate}
                              height="50"
                              width="50"
                            />
                            <p>{item.cate}</p>
                          </div>
                        </NavLink>
                      );
                    })}
                  </div>

                  <div
                    id="follow"
                    className="col-md-4 col-sm-4  col-xs-4 col-lg-4"
                  >
                    <img
                      src={
                        "https://media3.giphy.com/media/J67tc7pMoTrRlkUikG/200w.webp?cid=ecf05e47l171fg9ffgx3nhn0m9xght0hl9fiit2iwvc3quto&rid=200w.webp&ct=g"
                      }
                      height="300"
                      id="follow-us"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        );
    }
}

export default Home;