import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    // this.componentDidMount = this.componentDidMount.bind(this);
  }

  search (term) {
    console.log(`${term} was searched`);
    var jqxhr = $.post( "http://localhost:1128/repos", {'username': term}, function(data) {
      console.log(data);
    })
    .fail(function() {
      console.log( "error" );
    });
  }

  componentDidMount() {
    var jqxhr = $.get( "http://localhost:1128/repos", (data) => {
      this.setState({
        repos: data
      });
    })
    .fail(function() {
      console.log( "error" );
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));