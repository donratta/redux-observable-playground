import React from 'react';
import './App.css';
// import Users from './components/Users';
// import Stories from './components/Stories';
import {Search} from './components/Search';
import {Beers} from './components/Beers';
import { connect } from 'react-redux';
import { searchBeers, cancelSearch } from './actions'

// function App() {
//   return (
//     <div className="App">
//      {/* <Users /> */}
//      {/* <Stories/> */}
//      <Search
//         defaultValue={''}
//         onChange={this.handleBeerSearch}
//         messages={this.props.messages}
//         loading={this.props.loading}
//         cancel={this.props.cancelSearch}
//       />
//       <Beers beers={this.props.beers} loading={this.props.loading}/>
//     </div>
//   );
// }

// export default App;

class App extends React.Component {
  handleBeerSearch = (query) => {
    this.props.searchBeers(query);
  };
  render() {
    return (
      <div className="App">
        <Search
          defaultValue={''}
          onChange={this.handleBeerSearch}
          messages={this.props.messages}
          loading={this.props.loading}
          cancel={this.props.cancelSearch}
        />
        <Beers beers={this.props.beers} loading={this.props.loading}/>
      </div>
    );
  }
}

export default connect((state) => state, {searchBeers, cancelSearch})(App);